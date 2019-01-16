var clients = [];

exports.subscribe = function(req, res) {
  console.log('subscribe');
  clients.push(res);

  // res.on(close) срабатывает в том случае, если соединение закрыто до его окончания с сервером. То есть либо мы
  // вызываем res.end(), либо если мы этого не делаем соединение просто обрывается или destroy(), то рабратет событие
  // close. И тогда мы удаляем соединение из массива.
  res.on('close', function() {
    clients.splice(clients.indexOf(res), 1);
  });
};

exports.publish = function(message) {
  console.log("publish '%s'", message);
  clients.forEach(function(res) {
    res.end(message);
  });

  clients = [];
};

setInterval(function() {
  console.log(clients.length);
}, 2000);
