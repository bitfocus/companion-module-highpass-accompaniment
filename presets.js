const { combineRgb } = require('@companion-module/base')

function getPresetDefinitions(self) {
	const presets = []

	// Emit a number of presets that reference variables and cue numbers
	const presetCount = Math.max(1, (self.cues && self.cues.length) || 20)
	for (let i = 1; i <= presetCount; i++) {
		presets.push({
			type: 'button',
			category: 'Sound Cues',
			name: `Cue ${i}`,
			style: {
				text: `$(instance:cue_${i}_name)`,
				size: 'auto',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			steps: [
				{
					down: [
						{
							actionId: `trigger_cue`,
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
				{
					feedbackId: 'cue_is_fading_in',
					options: { cueNumber: `${i}` },
					style: {
						bgcolor: combineRgb(255, 165, 0), // Orange/amber for fading in
					},
				},
				{
					feedbackId: 'cue_is_fading_out',
					options: { cueNumber: `${i}` },
					style: {
						bgcolor: combineRgb(255, 100, 0), // Darker orange/red for fading out
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

	presets.push({
		type: 'button',
		category: 'Controls',
		name: 'Playlist Next',
		style: {
			text: 'NEXT',
			size: 'auto',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 100, 150),
		},
		steps: [
			{
				down: [
					{
						actionId: 'playlist_navigate_next',
						options: { cueNumber: '1' },
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	})

	presets.push({
		type: 'button',
		category: 'Controls',
		name: 'Playlist Previous',
		style: {
			text: 'PREV',
			size: 'auto',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 100, 150),
		},
		steps: [
			{
				down: [
					{
						actionId: 'playlist_navigate_previous',
						options: { cueNumber: '1' },
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	})

	presets.push({
		type: 'button',
		category: 'Controls',
		name: 'Current Time',
		style: {
			text: 'TIME\\n$(instance:current_cue_time_formatted)',
			size: 'auto',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(50, 50, 50),
		},
		steps: [
			{
				down: [],
				up: [],
			},
		],
		feedbacks: [],
	})

	presets.push({
		type: 'button',
		category: 'Controls',
		name: 'Duration',
		style: {
			text: 'DURATION\\n$(instance:current_cue_duration_formatted)',
			size: 'auto',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(50, 50, 50),
		},
		steps: [
			{
				down: [],
				up: [],
			},
		],
		feedbacks: [],
	})

	presets.push({
		type: 'button',
		category: 'Controls',
		name: 'Remaining Time',
		style: {
			text: 'REMAINING\\n$(instance:current_cue_remaining_formatted)',
			size: 'auto',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(50, 50, 50),
		},
		steps: [
			{
				down: [],
				up: [],
			},
		],
		feedbacks: [],
	})

	return presets
}

module.exports = { getPresetDefinitions }
