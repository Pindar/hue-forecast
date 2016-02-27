var config = require('./utils').config;
var Promise = require("bluebird");
var Forecast = require('forecast.io-bluebird');

var forecast = new Forecast({
    key: config.FORECAST_API_KEY,
    timeout: 2500
});


function getAvgRainProbability() {
  return forecast.fetch(config.FORECAST_LATITUDE, config.FORECAST_LONGITUDE)
    .then(function(result) {

        var avgRainProb = calculateAvgRainProbability(result.hourly);

        console.log('avg rain probability: ', avgRainProb);

        return Promise.resolve(avgRainProb);
    });
}

function calculateAvgRainProbability(hourly) {
  var sum = hourly.data.reduce(function(previousValue, currentValue) {
    return previousValue + currentValue.precipProbability;
  }, 0);

  return sum / hourly.data.length;
}

module.exports = {
  getAvgRainProbability: getAvgRainProbability
};
