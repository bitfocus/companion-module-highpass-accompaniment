function getActionDefinitions(self) {
	const actions = {}

	actions['stop_all'] = {
		name: 'Stop All Audio',
		options: [],
		callback: (action) => {
			if (self.ws && self.ws.readyState === 1) {
				self.ws.send(
					JSON.stringify({
						action: 'stopAllCues',
						payload: {
							behavior: 'fade_out_and_stop',
						},
					}),
				)
			}
		},
	}

	const cueNumberOption = {
		type: 'dropdown',
		id: 'cueNumber',
		label: 'Cue',
		default: '1',
		choices:
			self.cues && self.cues.length > 0
				? self.cues.map((cue, idx) => ({ id: String(idx + 1), label: `${idx + 1}: ${cue.name || cue.id}` }))
				: [{ id: '1', label: '1: (no cues)' }],
		tooltip: 'Select cue by name (mapped by index).',
	}

	async function resolveCueIdFromOptions(options) {
		try {
			const raw = options && options.cueNumber != null ? String(options.cueNumber) : '1'
			const parsed = self.parseVariablesInString ? await self.parseVariablesInString(raw) : raw
			const index = parseInt(parsed, 10) - 1
			if (!Number.isNaN(index) && index >= 0 && self.cues && self.cues[index]) {
				return self.cues[index].id
			}
			return null
		} catch (e) {
			self.log('debug', `Failed to resolve cue number: ${e}`)
			return null
		}
	}

	actions['play_cue'] = {
		name: 'Play Cue',
		options: [cueNumberOption],
		callback: async (action) => {
			const cueId = await resolveCueIdFromOptions(action.options)
			if (!cueId) {
				self.log('warn', 'Play Cue: Cue number out of range or invalid')
				return
			}
			if (self.ws && self.ws.readyState === 1) {
				self.ws.send(JSON.stringify({ action: 'playCue', payload: { cueId } }))
			}
		},
	}

	actions['stop_cue'] = {
		name: 'Stop Cue',
		options: [cueNumberOption],
		callback: async (action) => {
			const cueId = await resolveCueIdFromOptions(action.options)
			if (!cueId) {
				self.log('warn', 'Stop Cue: Cue number out of range or invalid')
				return
			}
			if (self.ws && self.ws.readyState === 1) {
				self.ws.send(JSON.stringify({ action: 'stopCue', payload: { cueId } }))
			}
		},
	}

	actions['toggle_cue'] = {
		name: 'Trigger Cue',
		options: [cueNumberOption],
		callback: async (action) => {
			const cueId = await resolveCueIdFromOptions(action.options)
			if (!cueId) {
				self.log('warn', 'Trigger Cue: Cue number out of range or invalid')
				return
			}
			if (self.ws && self.ws.readyState === 1) {
				self.ws.send(
					JSON.stringify({
						action: 'toggleCue',
						payload: { cueId },
					}),
				)
			}
		},
	}

	actions['playlist_navigate_next'] = {
		name: 'Playlist Navigate Next',
		options: [cueNumberOption],
		callback: async (action) => {
			const cueId = await resolveCueIdFromOptions(action.options)
			if (!cueId) {
				self.log('warn', 'Playlist Navigate Next: Cue number out of range or invalid')
				return
			}
			if (self.ws && self.ws.readyState === 1) {
				self.ws.send(
					JSON.stringify({
						action: 'playlistNavigateNext',
						payload: { cueId },
					}),
				)
			}
		},
	}

	actions['playlist_navigate_previous'] = {
		name: 'Playlist Navigate Previous',
		options: [cueNumberOption],
		callback: async (action) => {
			const cueId = await resolveCueIdFromOptions(action.options)
			if (!cueId) {
				self.log('warn', 'Playlist Navigate Previous: Cue number out of range or invalid')
				return
			}
			if (self.ws && self.ws.readyState === 1) {
				self.ws.send(
					JSON.stringify({
						action: 'playlistNavigatePrevious',
						payload: { cueId },
					}),
				)
			}
		},
	}

	actions['playlist_jump_to_item'] = {
		name: 'Playlist Jump to Item',
		options: [
			cueNumberOption,
			{
				type: 'textinput',
				id: 'targetIndex',
				label: 'Item Index (0-based)',
				default: '0',
				tooltip: 'Zero-based index of the playlist item to jump to (first item is 0).',
			},
		],
		callback: async (action) => {
			const cueId = await resolveCueIdFromOptions(action.options)
			if (!cueId) {
				self.log('warn', 'Playlist Jump to Item: Cue number out of range or invalid')
				return
			}
			const targetIndexRaw = action.options.targetIndex != null ? String(action.options.targetIndex) : '0'
			const targetIndexParsed = self.parseVariablesInString ? await self.parseVariablesInString(targetIndexRaw) : targetIndexRaw
			const targetIndex = parseInt(targetIndexParsed, 10)
			if (Number.isNaN(targetIndex) || targetIndex < 0) {
				self.log('warn', 'Playlist Jump to Item: Invalid target index')
				return
			}
			if (self.ws && self.ws.readyState === 1) {
				self.ws.send(
					JSON.stringify({
						action: 'playlistJumpToItem',
						payload: {
							cueId,
							targetIndex,
						},
					}),
				)
			}
		},
	}

	return actions
}

module.exports = { getActionDefinitions }
