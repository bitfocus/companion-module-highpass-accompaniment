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
					label: 'Cue ID',
					id: 'cueId',
					default: '',
					tooltip: 'Enter the ID of the cue to monitor.',
				},
			],
			callback: (feedback) => {
				const cueId = feedback.options.cueId
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
					label: 'Cue ID',
					id: 'cueId',
					default: '',
				},
			],
			callback: (feedback) => {
				const cueId = feedback.options.cueId
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
					label: 'Cue ID',
					id: 'cueId',
					default: '',
				},
			],
			callback: (feedback) => {
				const cueId = feedback.options.cueId
				const status = self.cuePlayStates[cueId]
				return status === 'stopped' || status === 'error' || !status
			},
		},
	}
}

module.exports = { getFeedbackDefinitions }
