'use strict';

var config = require('./utils').config,
    hue = require("node-hue-api"),
    HueApi = hue.HueApi,
    lightState = hue.lightState;

var displayResults = function(result) {
    console.log(JSON.stringify(result, null, 2));
};

var api = new HueApi(config.HUE_HOST, config.HUE_USER),
    schedule = {
      rainy: {
        "localtime": config.WAKE_UP_TIME,
        "command": {
            "address": "/api/" + config.HUE_USER + "/lights/" + config.LIGHT_NUMBER + "/state",
            "method" : "PUT",
            "body"   : {
                "on": true,
                "bri": 255,
                "hue": 46000,
                "transitiontime": config.TRANSITIONTIME
            }
        }
      },
      sunny: {
        "localtime": config.WAKE_UP_TIME,
        "command": {
            "address": "/api/" + config.HUE_USER + "/lights/" + config.LIGHT_NUMBER + "/state",
            "method" : "PUT",
            "body"   : {
                "on": true,
                "bri": 255,
                "hue": 14500,
                "transitiontime": config.TRANSITIONTIME
            }
        }
      }

    };


function updateSchedule(type) {
  console.log('updateSchedule: ' + type);
  api.updateSchedule(config.HUE_SCHEDULE_ID, schedule[type])
  .then(displayResults)
  .done();
}

function enableRainSchedule() {
  updateSchedule('rainy');
}

function enableGoodSchedule() {
  updateSchedule('sunny');
}

module.exports = {
  enableRainSchedule: enableRainSchedule,
  enableGoodSchedule: enableGoodSchedule
};
