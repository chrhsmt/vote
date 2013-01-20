var log4js = require('log4js');
log4js.configure('./log4js.json', { reloadSec: 300 });

var logger = log4js.getLogger('default');

module.exports = logger;
module.exports.log4js = log4js;
