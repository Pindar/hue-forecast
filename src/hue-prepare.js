var config = require('./utils').config,
    Promise = require("bluebird"),
    hue = require("node-hue-api"),
    HueApi = hue.HueApi,
    lightState = hue.lightState;

// Please adapt these values to whatever you prefer
const LIGHT_NUMBER = 5,
      WAKE_UP_TIME = "W124/T05:45:00",
      TRANSITIONTIME = 9000; // 15 Minutes

var displayResults = function(result) {
    console.log(JSON.stringify(result, null, 2));
};

var api = new HueApi(config.HUE_HOST, config.HUE_USER),
    scheduledEventGreat = {
      "name": "Wake up on a Sunny day",
      "description": "Wake up light on a day without rain",
      "localtime": WAKE_UP_TIME,
      "command": {
          "address": "/api/" + config.HUE_USER + "/lights/" + LIGHT_NUMBER + "/state",
          "method" : "PUT",
          "body"   : {
              "on": true,
              "bri": 255,
              "ct": 500,
              "transitiontime": TRANSITIONTIME
          }
      }
    },
    scheduledEventBad = {
      "name": "Wake up on a rainy Day",
      "description": "Wake up light on a day with rain",
      "localtime": WAKE_UP_TIME,
      "command": {
          "address": "/api/" + config.HUE_USER + "/lights/" + LIGHT_NUMBER + "/state",
          "method" : "PUT",
          "body"   : {
              "on": true,
              "bri": 255,
              "hue": 46000,
              "transitiontime": TRANSITIONTIME
          }
      }
    };

api.scheduleEvent(scheduledEventGreat)
    .then(displayResults)
    .done();

api.scheduleEvent(scheduledEventBad)
    .then(displayResults)
    .done();
