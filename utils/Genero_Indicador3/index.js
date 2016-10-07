
var fs = require('fs');
var csv = require('fast-csv');

var csvToJson = function() {
  var file = __dirname;
  var stream = fs.createReadStream(file+"/Genero_Indicador3.csv");

  var csvStream = csv();

  var resObj = {};
  csvStream.on("data", function(data) {
    if (data[0].indexOf('Indicador') < 0) {
      resObj[data[0]] = {
        bruteSalaryGapPercentage: parseInt(data[1]),
        baseSalaryGapPercentage: parseInt(data[2]),
        extraordinaryTimeGapPercentage: parseInt(data[3]),
        otherTimeGapPercentage: parseInt(data[4])
      }
    }
  });

  csvStream.on("end", function() {
    var fileName = '/Genero_Indicador3.json';
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
