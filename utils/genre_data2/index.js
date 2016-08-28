
var fs = require('fs');
var csv = require('fast-csv');
var file = __dirname;
var stream = fs.createReadStream(file+"/Genero_Indicador_5.csv");

var csvStream = csv();

var resObj = {};
resObj['DATA'] = [];
csvStream.on("data", function(data) {
  if (data[0].indexOf('Dependencia') != 0) {
    resObj['DATA'].push({
      'DEPENDENCY': data[0],
      'SECTOR': data[1],
      'CLASSIFICATION': data[2],
      'SALARY_GAP': data[3],
      'PROPORTION_WOMEN': data[4],
      'QUANTITY_WOMEN': data[5],
      'QUANTITY_MEN': data[6]
    });
  }
});

csvStream.on("end", function() {
  fs.writeFile(file+'/genreData2.json', JSON.stringify(resObj), function (err){
    if (err) throw err;
    console.log('Successfully saved.');
  });
});

stream.pipe(csvStream);
