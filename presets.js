const { combineRgb } = require("@companion-module/base");

function getPresetDefinitions(self) {
  const presets = [];
  if (self.cues && self.cues.length > 0) {
    self.cues.forEach((cue) => {
      presets.push({
        type: "button",
        category: "Sound Cues",
        name: `Play ${cue.name || cue.id}`,
        style: {
          text: `TOGGLE\n${cue.name || cue.id}`,
          size: "auto",
          color: combineRgb(255, 255, 255),
          bgcolor: combineRgb(0, 0, 0),
        },
        steps: [
          {
            down: [
              {
                actionId: `toggle_cue_${cue.id}`,
                options: {},
              },
            ],
            up: [],
          },
        ],
        feedbacks: [
          {
            feedbackId: "cue_is_playing",
            options: { cueId: cue.id },
            style: {
              bgcolor: combineRgb(0, 160, 0),
            },
          },
          {
            feedbackId: "cue_is_paused",
            options: { cueId: cue.id },
            style: {
              bgcolor: combineRgb(255, 165, 0),
            },
          },
        ],
      });
    });
  }

  presets.push({
    type: "button",
    category: "Controls",
    name: "Stop All Audio",
    style: {
      text: "STOP ALL",
      size: "auto",
      color: combineRgb(255, 255, 255),
      bgcolor: combineRgb(200, 0, 0),
    },
    steps: [
      {
        down: [
          {
            actionId: "stop_all",
            options: {},
          },
        ],
        up: [],
      },
    ],
    feedbacks: [],
  });

  return presets;
}

module.exports = { getPresetDefinitions };
