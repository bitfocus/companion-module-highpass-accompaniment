const { combineRgb } = require('@companion-module/base')

function getFeedbackDefinitions(self) {
	return {
		cue_is_playing: {
			type: 'boolean',
			name: 'Cue is Playing',
			description: 'If the specified cue is currently playing.',
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(0, 255, 0),
			},
			options: [
				{
					type: 'textinput',
					label: 'Cue Number (1-based)',
					id: 'cueNumber',
					default: '',
					tooltip: 'Preferred. Maps to the current cue list.',
				},
				{
					type: 'textinput',
					label: 'Cue ID (legacy)',
					id: 'cueId',
					default: '',
				},
			],
			callback: (feedback) => {
				let cueId = ''
				const num = parseInt(feedback.options.cueNumber, 10)
				if (!Number.isNaN(num) && num > 0 && self.cues && self.cues[num - 1]) {
					cueId = self.cues[num - 1].id
				} else if (feedback.options.cueId) {
					cueId = feedback.options.cueId
				}
				return self.cuePlayStates[cueId] === 'playing'
			},
		},
		cue_is_paused: {
			type: 'boolean',
			name: 'Cue is Paused',
			description: 'If the specified cue is currently paused.',
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 165, 0),
			},
			options: [
				{
					type: 'textinput',
					label: 'Cue Number (1-based)',
					id: 'cueNumber',
					default: '',
				},
				{
					type: 'textinput',
					label: 'Cue ID (legacy)',
					id: 'cueId',
					default: '',
				},
			],
			callback: (feedback) => {
				let cueId = ''
				const num = parseInt(feedback.options.cueNumber, 10)
				if (!Number.isNaN(num) && num > 0 && self.cues && self.cues[num - 1]) {
					cueId = self.cues[num - 1].id
				} else if (feedback.options.cueId) {
					cueId = feedback.options.cueId
				}
				return self.cuePlayStates[cueId] === 'paused'
			},
		},
		cue_is_stopped: {
			type: 'boolean',
			name: 'Cue is Stopped / Inactive',
			description: 'If the specified cue is currently stopped or not active.',
			defaultStyle: {
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			options: [
				{
					type: 'textinput',
					label: 'Cue Number (1-based)',
					id: 'cueNumber',
					default: '',
				},
				{
					type: 'textinput',
					label: 'Cue ID (legacy)',
					id: 'cueId',
					default: '',
				},
			],
			callback: (feedback) => {
				let cueId = ''
				const num = parseInt(feedback.options.cueNumber, 10)
				if (!Number.isNaN(num) && num > 0 && self.cues && self.cues[num - 1]) {
					cueId = self.cues[num - 1].id
				} else if (feedback.options.cueId) {
					cueId = feedback.options.cueId
				}
				const status = self.cuePlayStates[cueId]
				return status === 'stopped' || status === 'error' || !status
			},
		},
	}
}

module.exports = { getFeedbackDefinitions }
