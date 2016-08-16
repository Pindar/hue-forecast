'use strict';

var forecast = require('./src/forecast');
var hue = require('./src/hue');
var utils = require ('./src/utils');


forecast.isItRainingToday().
  then(function (itIsRainingToday) {

    if (itIsRainingToday) {
      hue.enableRainSchedule();
    } else {
      hue.enableGoodSchedule();
    }
  });
