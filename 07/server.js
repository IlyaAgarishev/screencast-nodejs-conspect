var http = require('http');

// Сервер является EventEmitter'ом.
// http.Server -> net.Server -> events.EventEmitter

// Сервер умеет слушать ip и порт и отвечать на входящие запросы
var server = new http.Server(); // EventEmitter

// Чтобы дать серверу ip и порт - используется команда listen
// Чтобы отвечать на запросы - используются события. Сервер является EventEmitter'ом.
// Это значит, что все события генерируются вызовом server.emit
server.listen(1337, '127.0.0.1');

var counter = 0;

var emit = server.emit;
server.emit = function(event) {
  console.log(event);
  emit.apply(server, arguments);
};

server.on('request', function(req, res) {
  res.end('Hello, world ' + ++counter);
});
