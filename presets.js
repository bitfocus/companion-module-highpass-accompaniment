const { combineRgb } = require('@companion-module/base')

function getPresetDefinitions(self) {
	const presets = []

	// Emit a number of presets that reference variables and cue numbers
	const presetCount = Math.max(1, (self.cues && self.cues.length) || 20)
	for (let i = 1; i <= presetCount; i++) {
		presets.push({
			type: 'button',
			category: 'Sound Cues',
			name: `Toggle Cue ${i}`,
			style: {
				text: `TOGGLE\n$(instance:cue_${i}_name)`,
				size: 'auto',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			steps: [
				{
					down: [
						{
							actionId: `toggle_cue`,
							options: { cueNumber: `${i}` },
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'cue_is_playing',
					options: { cueNumber: `${i}` },
					style: {
						bgcolor: combineRgb(0, 160, 0),
					},
				},
				{
					feedbackId: 'cue_is_paused',
					options: { cueNumber: `${i}` },
					style: {
						bgcolor: combineRgb(255, 165, 0),
					},
				},
			],
		})
	}

	presets.push({
		type: 'button',
		category: 'Controls',
		name: 'Stop All Audio',
		style: {
			text: 'STOP ALL',
			size: 'auto',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(200, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: 'stop_all',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	})

	return presets
}

module.exports = { getPresetDefinitions }
