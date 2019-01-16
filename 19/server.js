var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

var ROOT = __dirname + '/public';

http
  .createServer(function(req, res) {
    if (!checkAccess(req)) {
      res.statusCode = 403;
      res.end('Tell me the secret to access!');
      return;
    }

    sendFileSafe(url.parse(req.url).pathname, res);
  })
  .listen(3000);

function checkAccess(req) {
  return url.parse(req.url, true).query.secret == 'o_O';
}

function sendFileSafe(filePath, res) {
  try {
    filePath = decodeURIComponent(filePath);
  } catch (error) {
    res.statusCode = 400;
    res.end('Bad request');
    return;
  }

  // Есть такое специальный нулевой байт, который в троке url присутствовать не должен. Если он есть, то это значит, что
  // кто-то его злонамеренно передал, так как некоторые встроенные ф-ии node.js будут работать с таким байтом чуть чуть
  // не корректно. Следовательно, если такой байт есть, то мы возвращаем : 'Запрос некорректен'
  if (~filePath.indexOf('\0')) {
    res.statusCode = 400;
    res.end('Bad request');
    return;
  }

  // Тут мы получаем полный путь к файлу на диске
  // join - объеденяет пути
  // normalize - удаляет из пути всякие странные вещи типо : точки, две точки, два слеша итд. Делает путь корректным.
  // /deep/nodejs.jpg ----------> /Users/learn/node/path/public/deep/nodejs.jpg
  filePath = path.normalize(path.join(ROOT, filePath));

  // Чтобы убедиться, что путь находится внутри директории public
  // Тут просто проверяем, что вначале находится вот такой префикс /Users/learn/node/path/public/
  // if (filePath.indexOf(ROOT) != 0) {
  //   res.statusCode = 404;
  //   res.end('File not found');
  //   return;
  // }

  // Проверяем что лежит по этому пути
  fs.stat(filePath, function(err, stats) {
    // Проверяем есть ли ошибка и является ли он файлом вообще
    if (err || !stats.isFile()) {
      res.statusCode = 404;
      res.end('File not found');
      return;
    }
    //Если все ок - отправляем
    sendFile(filePath, res);
  });
}

function sendFile(filePath, res) {
  fs.readFile(filePath, function(err, content) {
    if (err) throw err;
    console.log(filePath);
    // Тип файла определяется по расширению с использованием модуля mime
    var mime = require('mime-types').lookup(filePath);
    res.setHeader('Content-Type', mime + '; charset=utf-8');
    res.end(content);
  });
}
