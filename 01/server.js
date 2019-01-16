var db = require('db');
db.connect();
var log = require('logger')(module);
// module.exports = exports = this
var User = require('./user');

function run() {
  var vasya = new User('Вася');
  var petya = new User('Петя');

  vasya.hello(petya);

  log(db.getPhrase('Run successful'));
}
if (module.parent) {
  // Если module.parent есть это означает что server.js кто-то подключил(require)
  exports.run = run;
} else {
  // Если module.parent нет, это значит что сервер запущен сам по себе через node server.js
  run();
}
