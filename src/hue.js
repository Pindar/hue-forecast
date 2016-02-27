var config = require('./utils').config,
    Promise = require("bluebird"),
    hue = require("node-hue-api"),
    HueApi = hue.HueApi,
    lightState = hue.lightState;

var displayResults = function(result) {
    console.log(JSON.stringify(result, null, 2));
};

var api = new HueApi(config.HUE_HOST, config.HUE_USER),
    disableSchedule = {
      "status": "disabled"
    },
    enableSchedule = {
      "status": "enabled"
    };


function enableRainSchedule() {
  api.updateSchedule(config.HUE_SCHEDULE_RAIN, enableSchedule)
      .then(displayResults)
      .done();
  api.updateSchedule(config.HUE_SCHEDULE_GOOD, disableSchedule)
      .then(displayResults)
      .done();
}

function enableGoodSchedule() {
  api.updateSchedule(config.HUE_SCHEDULE_RAIN, disableSchedule)
      .then(displayResults)
      .done();
  api.updateSchedule(config.HUE_SCHEDULE_GOOD, enableSchedule)
      .then(displayResults)
      .done();
}

module.exports = {
  enableRainSchedule: enableRainSchedule,
  enableGoodSchedule: enableGoodSchedule
};
