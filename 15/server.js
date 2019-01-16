var http = require('http');
var fs = require('fs');

var server = new http.Server();

server.on('request', function(req, res) {
  if (req.url == '/') {
    fs.readFile('index.html', function(err, info) {
      if (err) {
        console.error(err);
        res.statusCode = 500;
        res.end('Error on server!');
        return;
      }
      res.end(info);
    });
  }
});

server.listen(3000);

setTimeout(() => {
  server.close();
}, 2500);

// За таймеры, за события ввода-вывода отвечает библиотека LibUV и пока есть активный таймер - LibUV не может завершить
// процесс
var timer = setInterval(() => {
  console.log(process.memoryUsage());
}, 1000);

// В отличии от бруезерного js, timer - это объект.
// Метод unref указывает LibUV, что этот таймер является второстепенным. То есть его не следует учитывать при проверке
// внутренних watcher'ов на завершение процесса.
timer.unref();

// Метод ref - протвоположность unref
// timer.ref();
