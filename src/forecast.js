'use strict';

var config = require('./utils').config;
var Forecast = require('forecast.io-bluebird');

var forecast = new Forecast({
    key: config.FORECAST_API_KEY,
    timeout: 2500
});


function isItRainingDuringTheDay() {
  return forecast.fetch(config.FORECAST_LATITUDE, config.FORECAST_LONGITUDE)
    .then(function(result) {

        var isItRainingDuringTheDay = result.hourly.data.
          slice(0, 24). // next 24 hours
          filter(item => {
            var seconds = item.time * 1000;
            var hour = new Date(seconds).getUTCHours();
            return hour > config.START_TIME && hour < config.END_TIME;
          }).filter(relevantHours => {
            return relevantHours.icon === 'rain'||
              relevantHours.icon === 'snow' ||
              relevantHours.icon === 'sleet';
          }).length > 0; // at least one rainy slot

        return Promise.resolve(isItRainingDuringTheDay);
    });
}

module.exports = {
  isItRainingToday: isItRainingDuringTheDay
};
