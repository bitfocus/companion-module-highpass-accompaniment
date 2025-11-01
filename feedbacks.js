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
					tooltip: 'Maps to the current cue list.',
				},
			],
			callback: (feedback) => {
				let cueId = ''
				const num = parseInt(feedback.options.cueNumber, 10)
				if (!Number.isNaN(num) && num > 0 && self.cues && self.cues[num - 1]) {
					cueId = self.cues[num - 1].id
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
			],
			callback: (feedback) => {
				let cueId = ''
				const num = parseInt(feedback.options.cueNumber, 10)
				if (!Number.isNaN(num) && num > 0 && self.cues && self.cues[num - 1]) {
					cueId = self.cues[num - 1].id
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
			],
			callback: (feedback) => {
				let cueId = ''
				const num = parseInt(feedback.options.cueNumber, 10)
				if (!Number.isNaN(num) && num > 0 && self.cues && self.cues[num - 1]) {
					cueId = self.cues[num - 1].id
				}
				const status = self.cuePlayStates[cueId]
				return status === 'stopped' || status === 'error' || !status
			},
		},
		cue_is_fading: {
			type: 'boolean',
			name: 'Cue is Fading',
			description: 'If the specified cue is currently fading in or fading out.',
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 165, 0), // Orange/amber for fading
			},
			options: [
				{
					type: 'textinput',
					label: 'Cue Number (1-based)',
					id: 'cueNumber',
					default: '',
					tooltip: 'Maps to the current cue list.',
				},
			],
			callback: (feedback) => {
				let cueId = ''
				const num = parseInt(feedback.options.cueNumber, 10)
				if (!Number.isNaN(num) && num > 0 && self.cues && self.cues[num - 1]) {
					cueId = self.cues[num - 1].id
				}
				return self.cuePlayStates[cueId] === 'fading'
			},
		},
		cue_is_fading_in: {
			type: 'boolean',
			name: 'Cue is Fading In',
			description: 'If the specified cue is currently fading in.',
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 165, 0), // Orange/amber for fading in
			},
			options: [
				{
					type: 'textinput',
					label: 'Cue Number (1-based)',
					id: 'cueNumber',
					default: '',
					tooltip: 'Maps to the current cue list.',
				},
			],
			callback: (feedback) => {
				let cueId = ''
				const num = parseInt(feedback.options.cueNumber, 10)
				if (!Number.isNaN(num) && num > 0 && self.cues && self.cues[num - 1]) {
					cueId = self.cues[num - 1].id
				}
				const fadeState = self.cueFadeStates[cueId]
				return self.cuePlayStates[cueId] === 'fading' && fadeState && fadeState.isFadingIn
			},
		},
		cue_is_fading_out: {
			type: 'boolean',
			name: 'Cue is Fading Out',
			description: 'If the specified cue is currently fading out.',
			defaultStyle: {
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(255, 100, 0), // Darker orange/red for fading out
			},
			options: [
				{
					type: 'textinput',
					label: 'Cue Number (1-based)',
					id: 'cueNumber',
					default: '',
					tooltip: 'Maps to the current cue list.',
				},
			],
			callback: (feedback) => {
				let cueId = ''
				const num = parseInt(feedback.options.cueNumber, 10)
				if (!Number.isNaN(num) && num > 0 && self.cues && self.cues[num - 1]) {
					cueId = self.cues[num - 1].id
				}
				const fadeState = self.cueFadeStates[cueId]
				return self.cuePlayStates[cueId] === 'fading' && fadeState && fadeState.isFadingOut
			},
		},
	}
}

module.exports = { getFeedbackDefinitions }
