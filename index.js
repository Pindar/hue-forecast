var forecast = require('./src/forecast');
var hue = require('./src/hue');
var utils = require ('./src/utils');


forecast.getAvgRainProbability().
  then(function (rainProbabilityNextHours) {

    if (rainProbabilityNextHours > 0.5) {
      hue.enableRainSchedule();
    } else {
      hue.enableGoodSchedule();
    }
  });
