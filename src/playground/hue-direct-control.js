var config = require('../utils').config,
    hue = require("node-hue-api"),
    HueApi = hue.HueApi,
    lightState = hue.lightState;

var displayResults = function(result) {
    console.log(JSON.stringify(result, null, 2));
};

var displayError = function(err) {
    console.error(err);
};

var api = new HueApi(config.HUE_HOST, config.HUE_USER),
    commandBody =  {
      "on": true,
      "bri": 255,
      "hue": 46000,
      "transitiontime": 0
    };

api.setLightState(config.LIGHT_NUMBER, commandBody)
    .then(displayResults)
    .fail(displayError)
    .done();
