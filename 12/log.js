var winston = require('winston');

module.exports = function(module) {
  return makeLogger(module.filename);
};

function makeLogger(path) {
  if (path.match(/request.js$/)) {
    var transports = [
      new winston.transports.Console({
        timestamp: true,
        colorize: true,
        level: 'info'
      }),

      new winston.transports.File({ filename: 'debug.log', level: 'debug' })
    ];

    return winston.createLogger({ transports: transports });
  } else {
    return winston.createLogger({
      transports: []
    });
  }
}
