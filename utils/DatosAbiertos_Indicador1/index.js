
var fs = require('fs');
var csv = require('fast-csv');

var csvToJson = function() {
  var file = __dirname;
  var stream = fs.createReadStream(file + "/DatosAbiertos_Indicador1.csv");

  var csvStream = csv();

  var resObj = [];
  csvStream.on("data", function(data) {
    if (data[0].indexOf('Ciudad') < 0) {
      resObj.push({
        city: data[0],
        value: parseInt(data[1])
      });
    }
  });

  csvStream.on("end", function() {
    var fileName = '/DatosAbiertos_Indicador1.json';
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
