var http = require('http');
var fs = require('fs');

//конретный пример как это все рабоает !

// открытие файла тут просто как вариант операции ввода-вывода
fs.open(__filename, 'r', function(err, file) {
  console.log('IO!');
});

setImmediate(function() {
  console.log('Immediate');
});

process.nextTick(function() {
  console.log('Next tick');
});
