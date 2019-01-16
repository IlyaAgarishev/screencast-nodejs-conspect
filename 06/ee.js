var EventEmitter = require('events').EventEmitter;

var db = new EventEmitter();

function Request() {
  var self = this;

  this.bigData = new Array(1e6).join('*');
  this.send = function(data) {
    console.log(data);
  };

  this.onError = function() {
    self.send('извините у нас проблема');
  };

  function onData(info) {
    self.send(info);
  }

  this.end = function() {
    db.removeListener('data', onData);
  };

  // 1)Память буит постоянно расти.
  // Когда мы вызываем db.on('data')... информацию от том, что мы поставили обработчик нужно где-то запомнить - она
  // запоминается в специальном св-ве объекта db. В этом св-ве находятся все обработчики события, которые назначены и
  // когда происходит вызов db.emit, то они из него берутся и вызываются.
  // И так request то нам вроде как уже и не нужен, но есть ф-ия, которая находится в св-ах объекта db и получается так,
  // что каждый request, который создается сохраняет там внутри эту самую ф-ию onData
  // а эта ф-ия ссылается через замыкания на вообще весь объект. И тем самым этот обработчик привязывает request к db.
  // Пока живет db, живет и request.
  db.on('data', onData);
}

setInterval(function() {
  var request = new Request();
  // 2)Чтобы избежать утечку надо добавить вызов метода end
  request.end();
  console.log(process.memoryUsage().heapUsed);
  console.log(db);
}, 200);
