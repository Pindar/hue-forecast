var nconf = require('nconf');
var pkg = require('./package.json');
var config = nconf
  .env()
  .argv()
  .defaults(pkg.appConfig)
  .get();

var Forecast = require('forecast.io-bluebird');

var forecast = new Forecast({
    key: config.FORECAST_API_KEY,
    timeout: 2500
});

forecast.fetch(config.FORECAST_LATITUDE, config.FORECAST_LONGITUDE)
.then(function(result) {
    console.dir(result);

    // TODO: extract weather condition, calculate color value and make hue update
})
.catch(function(error) {
    console.error(error);
});
