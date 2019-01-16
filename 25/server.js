var http = require('http');

// Так можно посмотреть что написано в командной строке
// console.log(process.argv);

// Используем для этого optimist, чтобы прям из командной строки задавать порт
// node server.js --port=3000
var opts = require('optimist').argv;
console.log(opts);

// Переменная окружения, чтобы ее задать - пишем set NODE_ENV=production только пишем это в cmd,а не в powershell
if (process.env.NODE_ENV == 'production') {
  console.log('prod');
  // оптимизации
} else if (process.env.NODE_ENV == 'development') {
  console.log('dev');

  // доп отладочный вывод
}

http
  .createServer(function(req, res) {
    res.end('The server is runnig');
  })
  // тут передаем переменную и усе :)
  .listen(opts.port);
