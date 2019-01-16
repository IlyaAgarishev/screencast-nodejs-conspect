// Есть 2 основных типов потоков:
// 1) stream.Readable - это встроенный класс, который реализует потоки для чтения.
// Как правило используются его наследники:
//  a) fs.ReadStream - используется для чтения из фала
//  b) server.on('request',req) - для чтения запроса посетителя при его обработке используется спец объект req
// 2) stream.Writable
//  a) fs.WriteStream
//  b) server.on('request',res)

var fs = require('fs');

// fs.ReadStream наследует от stream.Readable
// И так мы создаем readStream и он тут же хочет открыть файл. Но это не означает, что он откроет его на этой же строке.
// Потому что все операции связанные с вводом-выводом - реализуются через LibUV, а LibUV устроена так, что все
// асинхронные обработчики ввода-вывода сработают на следующей итерации событийного цикла. То есть заведомо после того,
// как весь текущий js закончит работу. Это означает, что мы можем без проблем навесить все обработчики (readble и end)
// и мы твердо знаем, что они будут установлены до того как будет считан первый фрагмент данных.
var stream = new fs.ReadStream(__filename, { encoding: 'utf-8' });

stream.on('readable', function() {
  var data = stream.read();
  console.log(data);
});

stream.on('end', function() {
  console.log('THE END');
});

stream.on('error', function(err) {
  if (err.code == 'ENOENT') {
    console.log('File not found');
  } else {
    console.error(err);
  }
});
