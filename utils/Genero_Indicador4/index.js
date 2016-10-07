
var fs = require('fs');
var csv = require('fast-csv');

var csvToJson = function() {
  var file = __dirname;
  var stream = fs.createReadStream(file+"/Genero_Indicador4.csv");

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
    var fileName = '/Genero_Indicador4.json';
    var filePath = file + fileName;
    fs.writeFile(filePath, JSON.stringify(resObj), function (err){
      if (err) throw err;
      console.log('Successfully saved ' + fileName + '.');
      fs.rename(filePath, file + '/../../server/api/inspectors_data/' + fileName);
    });
  });

  stream.pipe(csvStream);
}

module.exports = {
  csvToJson: csvToJson
};
