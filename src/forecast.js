var config = require('./utils').config;
var Promise = require("bluebird");
var Forecast = require('forecast.io-bluebird');

var forecast = new Forecast({
    key: config.FORECAST_API_KEY,
    timeout: 2500
});


function isItRainingToday() {
  return forecast.fetch(config.FORECAST_LATITUDE, config.FORECAST_LONGITUDE)
    .then(function(result) {

        return Promise.resolve(result.hourly.icon === 'rain'||
          result.hourly.icon === 'snow' ||
          result.hourly.icon === 'sleet'
        );
    });
}

module.exports = {
  isItRainingToday: isItRainingToday
};
