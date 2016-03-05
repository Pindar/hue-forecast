var config = require('../utils').config,
    Promise = require("bluebird"),
    hue = require("node-hue-api"),
    HueApi = hue.HueApi,
    lightState = hue.lightState;

var displayResults = function(result) {
    console.log(JSON.stringify(result, null, 2));
};

var api = new HueApi(config.HUE_HOST, config.HUE_USER),
    scheduledEvent = {
      "name": "Alarm",
      "description": "Wake up light",
      "localtime": config.WAKE_UP_TIME,
      "command": {
          "address": "/api/" + config.HUE_USER + "/lights/" + config.LIGHT_NUMBER + "/state",
          "method" : "PUT",
          "body"   : {
              "on": true,
              "bri": 255,
              "transitiontime": config.TRANSITIONTIME
          }
      }
    };

api.scheduleEvent(scheduledEvent)
    .then(displayResults)
    .done();
