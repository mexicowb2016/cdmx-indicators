
var fs = require('fs');
var csv = require('fast-csv');

var csvToJson = function() {
  var file = __dirname;
  var stream = fs.createReadStream(file+"/Genero_Indicador2.csv");

  var csvStream = csv();

  var resObj = {};
  csvStream.on("data", function(data) {
    if (data[0].indexOf('Quintil') < 0) {
      resObj[data[0]] = [{
        label: "Hombre",
        value: parseFloat(data[1])
      }, {
        label: "Mujer",
        value: parseFloat(data[2])
      }];
    }
  });

  csvStream.on("end", function() {
    var fileName = '/Genero_Indicador2.json';
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
