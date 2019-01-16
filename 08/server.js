var http = require('http');
var url = require('url');

var server = new http.Server(function(req, res) {
  console.log(req.headers);
  var urlParsed = url.parse(req.url, true);

  if (urlParsed.pathname == '/echo' && urlParsed.query.message) {
    // res.writeHead(200, 'OK', { 'Cache-control': 'no-cache' });
    res.setHeader('Cache-control', 'no-cache'); //Чтобы ответы сервера не кешировались
    res.statusCode = 200; //мы также отвечаем статусом
    res.end(urlParsed.query.message);
  } else {
    res.statusCode = 404; //NOT FOUND
    res.end('Page not found');
  }
});

server.listen(1337, '127.0.0.1');
