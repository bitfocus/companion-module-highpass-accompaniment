const { InstanceBase, InstanceStatus, runEntrypoint } = require('@companion-module/base')
const WebSocket = require('ws')
const { getConfigFields } = require('./config.js') // Import from config.js
const { getActionDefinitions } = require('./actions.js') // Import from actions.js
const { getVariableDefinitions, getVariableDefinitionsDynamic, updateVariablesForCue } = require('./variables.js') // Import from variables.js

const MAX_CUES_FOR_VARIABLES = 20 // Legacy default for initial grid; dynamic defs will supersede on cue list

class SoundboardInstance extends InstanceBase {
	constructor(internal) {
		super(internal)
		this.ws = null
		this.cues = [] // Store the cues received from the soundboard app
		this.reconnectInterval = null
		this.currentlyPlayingCueId = null // Track which cue is considered "currently playing"
		this.cuePlayStates = {} // cueId: 'playing' | 'paused' | 'stopped'
		this.cueStartTimestamps = {} // cueId: number (ms since epoch)
	}

	async init(config) {
		this.config = config
		this.updateStatus(InstanceStatus.Connecting)
		this.connectToSoundboard()
		this.initActions()
		this.initFeedbacks() // Keep feedbacks if they are still relevant
		this.initPresets()
		this.initVariables() // New method to define variables
	}

	async destroy() {
		if (this.ws) {
			this.ws.close()
			this.ws = null
		}
		if (this.reconnectInterval) {
			clearInterval(this.reconnectInterval)
			this.reconnectInterval = null
		}
		this.log('debug', 'destroy')
	}

	async configUpdated(config) {
		this.config = config
		this.updateStatus(InstanceStatus.Connecting)
		if (this.ws) {
			this.ws.close() // Close existing connection before reconnecting
		}
		this.connectToSoundboard()
		// Actions, feedbacks, presets might need to be re-evaluated if config affects them
		// For now, assuming host/port change is handled by reconnect.
	}

	getConfigFields() {
		return getConfigFields() // Call the imported function
	}

	connectToSoundboard() {
		if (this.reconnectInterval) {
			clearInterval(this.reconnectInterval)
			this.reconnectInterval = null
		}

		if (!this.config.host || !this.config.port) {
			this.updateStatus(InstanceStatus.BadConfig, 'Host or Port not configured')
			return
		}

		const url = `ws://${this.config.host}:${this.config.port}`
		this.log('info', `Connecting to acCompaniment at ${url}`)

		if (this.ws) {
			this.ws.close() // Ensure old connection is closed
		}
		this.ws = new WebSocket(url)

		this.ws.on('open', () => {
			this.log('info', 'Connected to acCompaniment')
			this.updateStatus(InstanceStatus.Ok)
			if (this.reconnectInterval) {
				clearInterval(this.reconnectInterval)
				this.reconnectInterval = null
			}
		})

		this.ws.on('message', (data) => {
			try {
				const message = JSON.parse(data)
				this.log('debug', `Received message: ${JSON.stringify(message)}`)

				if (message.event === 'cuesListUpdate' && message.payload && Array.isArray(message.payload.cues)) {
					this.cues = message.payload.cues
					this.log('info', `Received ${this.cues.length} cues from acCompaniment.`)
					this.initActions()
					this.initPresets()
					// Rebuild variable definitions to match the live cue list
					const { definitions, initialValues } = getVariableDefinitionsDynamic(this.cues.length)
					this.setVariableDefinitions(definitions)
					// Initialize names from the list
					for (let i = 0; i < this.cues.length; i++) {
						const prefix = `cue_${i + 1}`
						initialValues[`${prefix}_name`] = this.cues[i].name || `Cue ${i + 1}`
					}
					this.setVariableValues(initialValues)
					// It's possible the currentlyPlayingCueId is no longer valid, clear it if so
					if (this.currentlyPlayingCueId && !this.cues.find((c) => c.id === this.currentlyPlayingCueId)) {
						this.currentlyPlayingCueId = null
						const currentlyPlayingPrefix = 'current_cue'
						this.setVariableValues({
							[`${currentlyPlayingPrefix}_name`]: 'N/A',
							[`${currentlyPlayingPrefix}_status`]: 'stopped',
							[`${currentlyPlayingPrefix}_playlist_item_name`]: '',
							[`${currentlyPlayingPrefix}_time_formatted`]: '00:00',
							[`${currentlyPlayingPrefix}_duration_formatted`]: '00:00',
							[`${currentlyPlayingPrefix}_remaining_formatted`]: '00:00',
							[`${currentlyPlayingPrefix}_time_sec`]: 0,
							[`${currentlyPlayingPrefix}_duration_sec`]: 0,
							[`${currentlyPlayingPrefix}_remaining_sec`]: 0,
						})
					}
				} else if (message.event === 'cueStatus') {
					// This is somewhat deprecated by playbackTimeUpdate, but feedbacks might still use it.
					// For variable purposes, playbackTimeUpdate is more comprehensive.
					// const cueId = message.payload.cueId;
					// const status = message.payload.status;
					// this.cuePlayStates[cueId] = status; // Old way
					// this.checkFeedbacks(...); // Old way based on cue_playing_status_cueId
				} else if (message.type === 'playbackTimeUpdate' && message.data) {
					// Determine transitions and update current-cue semantics
					const { cueId, status } = message.data
					let oldStatus
					if (cueId && status) {
						oldStatus = this.cuePlayStates[cueId]
						const setAsCurrentNow = status === 'playing' && oldStatus !== 'playing'
						if (setAsCurrentNow) {
							this.cueStartTimestamps[cueId] = Date.now()
						}
						if (status === 'stopped') {
							delete this.cueStartTimestamps[cueId]
						}
						updateVariablesForCue(this, message.data, { setAsCurrentNow })
						this.cuePlayStates[cueId] = status
						if (oldStatus !== status) {
							this.checkFeedbacks('cue_is_playing', 'cue_is_paused', 'cue_is_stopped')
						}

						// If the current cue stopped, switch to the most recently started remaining playing cue
						if (status === 'stopped' && this.currentlyPlayingCueId === cueId) {
							const playingIds = Object.keys(this.cuePlayStates).filter((id) => this.cuePlayStates[id] === 'playing')
							let fallbackId = null
							let latestTs = -1
							for (const id of playingIds) {
								const ts = this.cueStartTimestamps[id] || 0
								if (ts > latestTs) {
									latestTs = ts
									fallbackId = id
								}
							}
							if (fallbackId) {
								this.currentlyPlayingCueId = fallbackId
								const cue = this.cues.find((c) => c.id === fallbackId)
								const currentlyPlayingPrefix = 'current_cue'
								this.setVariableValues({
									[`${currentlyPlayingPrefix}_name`]: (cue && cue.name) || fallbackId,
									[`${currentlyPlayingPrefix}_status`]: 'playing',
								})
							}
						}
					} else {
						updateVariablesForCue(this, message.data)
					}
				}
			} catch (e) {
				this.log('error', 'Failed to parse message from acCompaniment: ' + e.toString())
			}
		})

		this.ws.on('close', (code, reason) => {
			this.log('info', `Connection closed. Code: ${code}, Reason: ${reason}`)
			this.updateStatus(InstanceStatus.Disconnected, 'Connection closed')
			this.ws = null
			if (this.config.reconnect && !this.reconnectInterval) {
				this.reconnectInterval = setInterval(() => {
					this.log('info', 'Attempting to reconnect...')
					this.connectToSoundboard()
				}, 5000)
			}
		})

		this.ws.on('error', (err) => {
			this.log('error', 'WebSocket error: ' + err.message)
			this.updateStatus(InstanceStatus.ConnectionFailure, 'Connection error')
			if (this.ws && this.ws.readyState !== WebSocket.OPEN && this.ws.readyState !== WebSocket.CONNECTING) {
				if (this.config.reconnect && !this.reconnectInterval) {
					this.reconnectInterval = setInterval(() => {
						this.log('info', 'Attempting to reconnect after error...')
						this.connectToSoundboard()
					}, 5000)
				}
			}
		})
	}

	initActions() {
		this.setActionDefinitions(getActionDefinitions(this)) // Pass 'this' (self) to the function
	}

	initFeedbacks() {
		const { getFeedbackDefinitions } = require('./feedbacks.js')
		this.setFeedbackDefinitions(getFeedbackDefinitions(this))
	}

	initPresets() {
		const { getPresetDefinitions } = require('./presets.js')
		this.setPresetDefinitions(getPresetDefinitions(this))
	}

	initVariables() {
		const { definitions, initialValues } = getVariableDefinitions() // Legacy initial set, ensures variables exist before first cue list
		this.setVariableDefinitions(definitions)
		this.setVariableValues(initialValues)
	}
}

runEntrypoint(SoundboardInstance, [])
