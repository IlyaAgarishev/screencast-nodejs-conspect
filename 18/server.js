var fs = require('fs');

fs.readFile(__filename, function(err, data) {
  if (err) {
    console.log(err);
  } else {
    // В toString кодировка по умолч это utf-8
    console.log(data.toString());
  }
});

// Или мона указать кодировку так :
fs.readFile(__filename, { encoding: 'utf-8' }, function(err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});

// обработка ошибки
fs.readFile('blablabla', { encoding: 'utf-8' }, function(err, data) {
  if (err) {
    if (err.code == 'ENOENT') {
      console.log(err.message);
    }
  } else {
    console.log(data);
  }
});

// stat показывает что за файл и всю инфу по немк
fs.stat(__filename, function(err, stats) {
  // проверяем есть ли такой файл вообще
  console.log(stats.isFile());
  //выводим инфу
  console.log(stats);
});

// Пример создания и удаления файла
fs.writeFile('file.tmp', 'data', function(err) {
  if (err) throw err;
  fs.rename('file.tmp', 'new.tmp', function(err) {
    if (err) throw err;
    // unlink удаляет файл
    fs.unlink('new.tmp', function(err) {
      if (err) throw err;
    });
  });
});
