var url = require('url');
// log.info - сообщение средней важности
// log.debug - сообщение маленькой важности, он обычно вообще не выводится
// log.error - это ошибка
var log = require('./log')(module);

module.exports = function(req, res) {
  var urlParsed = url.parse(req.url, true);

  log.info('Got request' + req.method + req.url);

  if (req.method == 'GET' && urlParsed.pathname == '/echo' && urlParsed.query.message) {
    var message = urlParsed.query.message;
    log.debug('Echo: ' + message);
    res.end(message);
    return;
  }

  log.error('Unknown URL');

  res.statusCode = 404;
  res.end('Not found');
};
