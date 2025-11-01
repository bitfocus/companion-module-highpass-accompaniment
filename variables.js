const MAX_CUES_FOR_VARIABLES = 20 // Deprecated: kept for backward compatibility during transition

function getVariableDefinitions() {
	const variableDefinitions = []
	const initialValues = {}

	// Currently Playing Cue Variables
	const currentlyPlayingPrefix = 'current_cue'
	variableDefinitions.push({
		variableId: `${currentlyPlayingPrefix}_name`,
		name: 'Currently Playing Cue Name',
	})
	variableDefinitions.push({
		variableId: `${currentlyPlayingPrefix}_status`,
		name: 'Currently Playing Cue Status',
	})
	variableDefinitions.push({
		variableId: `${currentlyPlayingPrefix}_playlist_item_name`,
		name: 'Currently Playing Cue Item Name',
	})
	variableDefinitions.push({
		variableId: `${currentlyPlayingPrefix}_time_formatted`,
		name: 'Currently Playing Time Formatted',
	})
	variableDefinitions.push({
		variableId: `${currentlyPlayingPrefix}_duration_formatted`,
		name: 'Currently Playing Duration Formatted',
	})
	variableDefinitions.push({
		variableId: `${currentlyPlayingPrefix}_remaining_formatted`,
		name: 'Currently Playing Remaining Formatted',
	})
	variableDefinitions.push({
		variableId: `${currentlyPlayingPrefix}_time_sec`,
		name: 'Currently Playing Time (s)',
	})
	variableDefinitions.push({
		variableId: `${currentlyPlayingPrefix}_duration_sec`,
		name: 'Currently Playing Duration (s)',
	})
	variableDefinitions.push({
		variableId: `${currentlyPlayingPrefix}_remaining_sec`,
		name: 'Currently Playing Remaining (s)',
	})
	variableDefinitions.push({
		variableId: `${currentlyPlayingPrefix}_is_fading_in`,
		name: 'Currently Playing Is Fading In',
	})
	variableDefinitions.push({
		variableId: `${currentlyPlayingPrefix}_is_fading_out`,
		name: 'Currently Playing Is Fading Out',
	})
	variableDefinitions.push({
		variableId: `${currentlyPlayingPrefix}_fade_remaining_ms`,
		name: 'Currently Playing Fade Remaining (ms)',
	})
	variableDefinitions.push({
		variableId: `${currentlyPlayingPrefix}_fade_total_ms`,
		name: 'Currently Playing Fade Total (ms)',
	})

	initialValues[`${currentlyPlayingPrefix}_name`] = 'N/A'
	initialValues[`${currentlyPlayingPrefix}_status`] = 'stopped'
	initialValues[`${currentlyPlayingPrefix}_playlist_item_name`] = ''
	initialValues[`${currentlyPlayingPrefix}_time_formatted`] = '00:00'
	initialValues[`${currentlyPlayingPrefix}_duration_formatted`] = '00:00'
	initialValues[`${currentlyPlayingPrefix}_remaining_formatted`] = '00:00'
	initialValues[`${currentlyPlayingPrefix}_time_sec`] = 0
	initialValues[`${currentlyPlayingPrefix}_duration_sec`] = 0
	initialValues[`${currentlyPlayingPrefix}_remaining_sec`] = 0
	initialValues[`${currentlyPlayingPrefix}_is_fading_in`] = false
	initialValues[`${currentlyPlayingPrefix}_is_fading_out`] = false
	initialValues[`${currentlyPlayingPrefix}_fade_remaining_ms`] = 0
	initialValues[`${currentlyPlayingPrefix}_fade_total_ms`] = 0

	// Individual Cue Variables (legacy fixed count)
	for (let i = 1; i <= MAX_CUES_FOR_VARIABLES; i++) {
		const prefix = `cue_${i}`
		variableDefinitions.push({
			variableId: `${prefix}_name`,
			name: `Cue ${i} Name`,
		})
		variableDefinitions.push({
			variableId: `${prefix}_status`,
			name: `Cue ${i} Status`,
		})
		variableDefinitions.push({
			variableId: `${prefix}_playlist_item_name`,
			name: `Cue ${i} Playlist Item Name`,
		})
		variableDefinitions.push({
			variableId: `${prefix}_time_formatted`,
			name: `Cue ${i} Time Formatted`,
		})
		variableDefinitions.push({
			variableId: `${prefix}_duration_formatted`,
			name: `Cue ${i} Duration Formatted`,
		})
		variableDefinitions.push({
			variableId: `${prefix}_remaining_formatted`,
			name: `Cue ${i} Remaining Formatted`,
		})
		variableDefinitions.push({
			variableId: `${prefix}_time_sec`,
			name: `Cue ${i} Time (s)`,
		})
		variableDefinitions.push({
			variableId: `${prefix}_duration_sec`,
			name: `Cue ${i} Duration (s)`,
		})
		variableDefinitions.push({
			variableId: `${prefix}_remaining_sec`,
			name: `Cue ${i} Remaining (s)`,
		})
		variableDefinitions.push({
			variableId: `${prefix}_is_fading_in`,
			name: `Cue ${i} Is Fading In`,
		})
		variableDefinitions.push({
			variableId: `${prefix}_is_fading_out`,
			name: `Cue ${i} Is Fading Out`,
		})
		variableDefinitions.push({
			variableId: `${prefix}_fade_remaining_ms`,
			name: `Cue ${i} Fade Remaining (ms)`,
		})
		variableDefinitions.push({
			variableId: `${prefix}_fade_total_ms`,
			name: `Cue ${i} Fade Total (ms)`,
		})

		initialValues[`${prefix}_name`] = 'N/A'
		initialValues[`${prefix}_status`] = 'stopped'
		initialValues[`${prefix}_playlist_item_name`] = ''
		initialValues[`${prefix}_time_formatted`] = '00:00'
		initialValues[`${prefix}_duration_formatted`] = '00:00'
		initialValues[`${prefix}_remaining_formatted`] = '00:00'
		initialValues[`${prefix}_time_sec`] = 0
		initialValues[`${prefix}_duration_sec`] = 0
		initialValues[`${prefix}_remaining_sec`] = 0
		initialValues[`${prefix}_is_fading_in`] = false
		initialValues[`${prefix}_is_fading_out`] = false
		initialValues[`${prefix}_fade_remaining_ms`] = 0
		initialValues[`${prefix}_fade_total_ms`] = 0
	}
	return { definitions: variableDefinitions, initialValues: initialValues }
}

function getVariableDefinitionsDynamic(cuesLength) {
	const variableDefinitions = []
	const initialValues = {}

	const currentlyPlayingPrefix = 'current_cue'
	variableDefinitions.push({ variableId: `${currentlyPlayingPrefix}_name`, name: 'Currently Playing Cue Name' })
	variableDefinitions.push({ variableId: `${currentlyPlayingPrefix}_status`, name: 'Currently Playing Cue Status' })
	variableDefinitions.push({ variableId: `${currentlyPlayingPrefix}_playlist_item_name`, name: 'Currently Playing Cue Item Name' })
	variableDefinitions.push({ variableId: `${currentlyPlayingPrefix}_time_formatted`, name: 'Currently Playing Time Formatted' })
	variableDefinitions.push({ variableId: `${currentlyPlayingPrefix}_duration_formatted`, name: 'Currently Playing Duration Formatted' })
	variableDefinitions.push({ variableId: `${currentlyPlayingPrefix}_remaining_formatted`, name: 'Currently Playing Remaining Formatted' })
	variableDefinitions.push({ variableId: `${currentlyPlayingPrefix}_time_sec`, name: 'Currently Playing Time (s)' })
	variableDefinitions.push({ variableId: `${currentlyPlayingPrefix}_duration_sec`, name: 'Currently Playing Duration (s)' })
	variableDefinitions.push({ variableId: `${currentlyPlayingPrefix}_remaining_sec`, name: 'Currently Playing Remaining (s)' })
	variableDefinitions.push({ variableId: `${currentlyPlayingPrefix}_is_fading_in`, name: 'Currently Playing Is Fading In' })
	variableDefinitions.push({ variableId: `${currentlyPlayingPrefix}_is_fading_out`, name: 'Currently Playing Is Fading Out' })
	variableDefinitions.push({ variableId: `${currentlyPlayingPrefix}_fade_remaining_ms`, name: 'Currently Playing Fade Remaining (ms)' })
	variableDefinitions.push({ variableId: `${currentlyPlayingPrefix}_fade_total_ms`, name: 'Currently Playing Fade Total (ms)' })

	initialValues[`${currentlyPlayingPrefix}_name`] = 'N/A'
	initialValues[`${currentlyPlayingPrefix}_status`] = 'stopped'
	initialValues[`${currentlyPlayingPrefix}_playlist_item_name`] = ''
	initialValues[`${currentlyPlayingPrefix}_time_formatted`] = '00:00'
	initialValues[`${currentlyPlayingPrefix}_duration_formatted`] = '00:00'
	initialValues[`${currentlyPlayingPrefix}_remaining_formatted`] = '00:00'
	initialValues[`${currentlyPlayingPrefix}_time_sec`] = 0
	initialValues[`${currentlyPlayingPrefix}_duration_sec`] = 0
	initialValues[`${currentlyPlayingPrefix}_remaining_sec`] = 0
	initialValues[`${currentlyPlayingPrefix}_is_fading_in`] = false
	initialValues[`${currentlyPlayingPrefix}_is_fading_out`] = false
	initialValues[`${currentlyPlayingPrefix}_fade_remaining_ms`] = 0
	initialValues[`${currentlyPlayingPrefix}_fade_total_ms`] = 0

	const count = Math.max(0, cuesLength || 0)
	for (let i = 1; i <= count; i++) {
		const prefix = `cue_${i}`
		variableDefinitions.push({ variableId: `${prefix}_name`, name: `Cue ${i} Name` })
		variableDefinitions.push({ variableId: `${prefix}_status`, name: `Cue ${i} Status` })
		variableDefinitions.push({ variableId: `${prefix}_playlist_item_name`, name: `Cue ${i} Playlist Item Name` })
		variableDefinitions.push({ variableId: `${prefix}_time_formatted`, name: `Cue ${i} Time Formatted` })
		variableDefinitions.push({ variableId: `${prefix}_duration_formatted`, name: `Cue ${i} Duration Formatted` })
		variableDefinitions.push({ variableId: `${prefix}_remaining_formatted`, name: `Cue ${i} Remaining Formatted` })
		variableDefinitions.push({ variableId: `${prefix}_time_sec`, name: `Cue ${i} Time (s)` })
		variableDefinitions.push({ variableId: `${prefix}_duration_sec`, name: `Cue ${i} Duration (s)` })
		variableDefinitions.push({ variableId: `${prefix}_remaining_sec`, name: `Cue ${i} Remaining (s)` })
		variableDefinitions.push({ variableId: `${prefix}_is_fading_in`, name: `Cue ${i} Is Fading In` })
		variableDefinitions.push({ variableId: `${prefix}_is_fading_out`, name: `Cue ${i} Is Fading Out` })
		variableDefinitions.push({ variableId: `${prefix}_fade_remaining_ms`, name: `Cue ${i} Fade Remaining (ms)` })
		variableDefinitions.push({ variableId: `${prefix}_fade_total_ms`, name: `Cue ${i} Fade Total (ms)` })

		initialValues[`${prefix}_name`] = 'N/A'
		initialValues[`${prefix}_status`] = 'stopped'
		initialValues[`${prefix}_playlist_item_name`] = ''
		initialValues[`${prefix}_time_formatted`] = '00:00'
		initialValues[`${prefix}_duration_formatted`] = '00:00'
		initialValues[`${prefix}_remaining_formatted`] = '00:00'
		initialValues[`${prefix}_time_sec`] = 0
		initialValues[`${prefix}_duration_sec`] = 0
		initialValues[`${prefix}_remaining_sec`] = 0
		initialValues[`${prefix}_is_fading_in`] = false
		initialValues[`${prefix}_is_fading_out`] = false
		initialValues[`${prefix}_fade_remaining_ms`] = 0
		initialValues[`${prefix}_fade_total_ms`] = 0
	}

	return { definitions: variableDefinitions, initialValues }
}

function updateVariablesForCue(self, cueData, options = {}) {
	const valuesToSet = {}
	let cueIndex = -1

	if (self.cues && self.cues.length > 0) {
		cueIndex = self.cues.findIndex((c) => c.id === cueData.cueId)
	}

	if (cueIndex !== -1) {
		const prefix = `cue_${cueIndex + 1}`
		valuesToSet[`${prefix}_name`] = cueData.cueName || 'N/A'
		valuesToSet[`${prefix}_status`] = cueData.status
		valuesToSet[`${prefix}_playlist_item_name`] = cueData.playlistItemName || ''
		valuesToSet[`${prefix}_time_formatted`] = cueData.currentTimeFormatted
		valuesToSet[`${prefix}_duration_formatted`] = cueData.totalDurationFormatted
		valuesToSet[`${prefix}_remaining_formatted`] = cueData.remainingTimeFormatted
		valuesToSet[`${prefix}_time_sec`] = cueData.currentTimeSec
		valuesToSet[`${prefix}_duration_sec`] = cueData.totalDurationSec
		valuesToSet[`${prefix}_remaining_sec`] = cueData.remainingTimeSec
		// Fade-related fields
		valuesToSet[`${prefix}_is_fading_in`] = cueData.isFadingIn || false
		valuesToSet[`${prefix}_is_fading_out`] = cueData.isFadingOut || false
		valuesToSet[`${prefix}_fade_remaining_ms`] = cueData.fadeTimeRemainingMs || 0
		valuesToSet[`${prefix}_fade_total_ms`] = cueData.fadeTotalDurationMs || 0
	}


	// Update current_cue_* based on rules:
	// - If explicitly instructed (transition to playing), switch current to this cue now
	// - Else, only update current if this cue is already the current one
	if (options.setAsCurrentNow === true && (cueData.status === 'playing' || cueData.status === 'fading')) {
		self.currentlyPlayingCueId = cueData.cueId
		const currentlyPlayingPrefix = 'current_cue'
		valuesToSet[`${currentlyPlayingPrefix}_name`] = cueData.cueName
		valuesToSet[`${currentlyPlayingPrefix}_status`] = cueData.status
		valuesToSet[`${currentlyPlayingPrefix}_playlist_item_name`] = cueData.playlistItemName || ''
		valuesToSet[`${currentlyPlayingPrefix}_time_formatted`] = cueData.currentTimeFormatted
		valuesToSet[`${currentlyPlayingPrefix}_duration_formatted`] = cueData.totalDurationFormatted
		valuesToSet[`${currentlyPlayingPrefix}_remaining_formatted`] = cueData.remainingTimeFormatted
		valuesToSet[`${currentlyPlayingPrefix}_time_sec`] = cueData.currentTimeSec
		valuesToSet[`${currentlyPlayingPrefix}_duration_sec`] = cueData.totalDurationSec
		valuesToSet[`${currentlyPlayingPrefix}_remaining_sec`] = cueData.remainingTimeSec
		valuesToSet[`${currentlyPlayingPrefix}_is_fading_in`] = cueData.isFadingIn || false
		valuesToSet[`${currentlyPlayingPrefix}_is_fading_out`] = cueData.isFadingOut || false
		valuesToSet[`${currentlyPlayingPrefix}_fade_remaining_ms`] = cueData.fadeTimeRemainingMs || 0
		valuesToSet[`${currentlyPlayingPrefix}_fade_total_ms`] = cueData.fadeTotalDurationMs || 0
	} else if (self.currentlyPlayingCueId === cueData.cueId) {
		if (cueData.status === 'playing' || cueData.status === 'paused' || cueData.status === 'fading') {
			const currentlyPlayingPrefix = 'current_cue'
			valuesToSet[`${currentlyPlayingPrefix}_name`] = cueData.cueName
			valuesToSet[`${currentlyPlayingPrefix}_status`] = cueData.status
			valuesToSet[`${currentlyPlayingPrefix}_playlist_item_name`] = cueData.playlistItemName || ''
			valuesToSet[`${currentlyPlayingPrefix}_time_formatted`] = cueData.currentTimeFormatted
			valuesToSet[`${currentlyPlayingPrefix}_duration_formatted`] = cueData.totalDurationFormatted
			valuesToSet[`${currentlyPlayingPrefix}_remaining_formatted`] = cueData.remainingTimeFormatted
			valuesToSet[`${currentlyPlayingPrefix}_time_sec`] = cueData.currentTimeSec
			valuesToSet[`${currentlyPlayingPrefix}_duration_sec`] = cueData.totalDurationSec
			valuesToSet[`${currentlyPlayingPrefix}_remaining_sec`] = cueData.remainingTimeSec
			valuesToSet[`${currentlyPlayingPrefix}_is_fading_in`] = cueData.isFadingIn || false
			valuesToSet[`${currentlyPlayingPrefix}_is_fading_out`] = cueData.isFadingOut || false
			valuesToSet[`${currentlyPlayingPrefix}_fade_remaining_ms`] = cueData.fadeTimeRemainingMs || 0
			valuesToSet[`${currentlyPlayingPrefix}_fade_total_ms`] = cueData.fadeTotalDurationMs || 0
		} else if (cueData.status === 'stopped') {
			self.currentlyPlayingCueId = null
			const currentlyPlayingPrefix = 'current_cue'
			valuesToSet[`${currentlyPlayingPrefix}_name`] = 'N/A'
			valuesToSet[`${currentlyPlayingPrefix}_status`] = 'stopped'
			valuesToSet[`${currentlyPlayingPrefix}_playlist_item_name`] = ''
			valuesToSet[`${currentlyPlayingPrefix}_time_formatted`] = '00:00'
			valuesToSet[`${currentlyPlayingPrefix}_duration_formatted`] = '00:00'
			valuesToSet[`${currentlyPlayingPrefix}_remaining_formatted`] = '00:00'
			valuesToSet[`${currentlyPlayingPrefix}_time_sec`] = 0
			valuesToSet[`${currentlyPlayingPrefix}_duration_sec`] = 0
			valuesToSet[`${currentlyPlayingPrefix}_remaining_sec`] = 0
			valuesToSet[`${currentlyPlayingPrefix}_is_fading_in`] = false
			valuesToSet[`${currentlyPlayingPrefix}_is_fading_out`] = false
			valuesToSet[`${currentlyPlayingPrefix}_fade_remaining_ms`] = 0
			valuesToSet[`${currentlyPlayingPrefix}_fade_total_ms`] = 0
		}
	} else if (cueData.status === 'stopped' && self.currentlyPlayingCueId === cueData.cueId) {
		self.currentlyPlayingCueId = null
		const currentlyPlayingPrefix = 'current_cue'
		valuesToSet[`${currentlyPlayingPrefix}_name`] = 'N/A'
		valuesToSet[`${currentlyPlayingPrefix}_status`] = 'stopped'
		valuesToSet[`${currentlyPlayingPrefix}_playlist_item_name`] = ''
		valuesToSet[`${currentlyPlayingPrefix}_time_formatted`] = '00:00'
		valuesToSet[`${currentlyPlayingPrefix}_duration_formatted`] = '00:00'
		valuesToSet[`${currentlyPlayingPrefix}_remaining_formatted`] = '00:00'
		valuesToSet[`${currentlyPlayingPrefix}_time_sec`] = 0
		valuesToSet[`${currentlyPlayingPrefix}_duration_sec`] = 0
		valuesToSet[`${currentlyPlayingPrefix}_remaining_sec`] = 0
		valuesToSet[`${currentlyPlayingPrefix}_is_fading_in`] = false
		valuesToSet[`${currentlyPlayingPrefix}_is_fading_out`] = false
		valuesToSet[`${currentlyPlayingPrefix}_fade_remaining_ms`] = 0
		valuesToSet[`${currentlyPlayingPrefix}_fade_total_ms`] = 0
	}

	if (Object.keys(valuesToSet).length > 0) {
		self.setVariableValues(valuesToSet)
	}
}

module.exports = { getVariableDefinitions, getVariableDefinitionsDynamic, updateVariablesForCue }
