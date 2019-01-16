var EventEmitter = require('events').EventEmitter;

var server = new EventEmitter();

server.on('request', function(request) {
  request.approved = true;
});

server.on('request', function(request) {
  console.log(request);
});

server.emit('request', { from: 'Клиент' });
server.emit('request', { from: 'Еще Клиент' });

// server.on('error', function(err) {
//   console.log(err);
// });
// server.emit('error', new Error('серверная ошибка'));
