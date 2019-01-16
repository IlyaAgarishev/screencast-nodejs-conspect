var http = require('http');
// 'server' в данном контексте - идентификатор
// Чтобы это все дело работало, вводим в windows cmd -  set DEBUG=server node server.js
// У нас теперь будут выводиться только логи с индетификатором сервер, чтобы выводилсь логи из request.js, нужно
// поменять идентификатор set DEBUG=server:request node server.js
// Чтобы указать вывод нескольких веток, то их мона перечислисть через запятую:
// set DEBUG=server,server:request node server.js
var debug = require('debug')('server');

var server = http.createServer();

server.on('request', require('./request'));

server.listen(1337);

debug('Server is running');
