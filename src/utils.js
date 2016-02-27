var nconf = require('nconf');
var pkg = require('../package.json');
var config = nconf
  .env()
  .argv()
  .defaults(pkg.appConfig)
  .get();

module.exports = {
  config: config
};
