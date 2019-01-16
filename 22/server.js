var http = require('http');
var fs = require('fs');

new http.Server(function(req, res) {
  if (req.url == '/big.html') {
    var file = new fs.ReadStream('big.html');
    sendFile(file, res);
  }
}).listen(3000);

function sendFile(file, res) {
  // В итоге все это можно заменить одной штукой  - file.pipe()
  file.pipe(res);
  // Кроме того можно один и тот же поток pipe'ить в несколько выходных
  // Например, выведем ответ еще в стандартный вывод процесса
  file.pipe(process.stdout);

  // handle error
  file.on('error', function(err) {
    res.statusCode = 500;
    res.end('Server Error');
    console.error(err);
  });

  file
    .on('open', function() {
      console.log('open');
    })
    .on('close', function() {
      console.log('close');
    });

  // Если клиент открыл соединение, но закрыл его до того, как загрузка файла была совершена, то получается что файл
  // останется подвисшим. А если файл остался открытым, то 1) все асоциированные с ним структуры остались тоже в памяти
  // 2) Вместе с файлом навечно зависает в памяти соотв. объект потока.
  // Чтобы избежать этой проблемы, надо просто отловить момент когда соединение закрыто.
  res.on('close', function() {
    file.destroy();
  });
}
