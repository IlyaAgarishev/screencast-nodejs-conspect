var http = require('http');
var fs = require('fs');

http
  .createServer(function(req, res) {
    if (req.url == '/') {
      // Асинхронный вариант
      fs.readFile('index.html', function(err, info) {
        if (err) {
          console.error(err);
          res.statusCode = 500;
          res.end('We got an error on the server, sir.');
          return;
        }
        res.end(info);
      });

      // Синхронный вариант
      // var idnfo;
      // try {
      //   info = fs.readFileSync('index.html');
      // } catch (err) {
      //   console.error(err);
      //   res.statusCode = 500;
      //   res.end('На сервере произошла ошибка!');
      //   return;
      // }

      // res.end(info);
    }
  })
  .listen(3000);
