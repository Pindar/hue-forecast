var config = require('../utils').config,
    hue = require("node-hue-api"),
    HueApi = hue.HueApi,
    lightState = hue.lightState;

var api = new HueApi(config.HUE_HOST, config.HUE_USER);

var displayResults = function(result) {
    console.log(JSON.stringify(result, null, 2));
};

var displayError = function(err) {
    console.error(err);
};

api.deleteSchedule(config.HUE_SCHEDULE_ID)
    .then(displayResults)
    .fail(displayError)
    .done();
