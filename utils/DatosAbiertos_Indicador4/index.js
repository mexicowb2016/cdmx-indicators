
var fs = require('fs');
var csv = require('fast-csv');

var csvToJson = function() {
  var file = __dirname;
  var stream = fs.createReadStream(file + "/DatosAbiertos_Indicador4.csv");

  var csvStream = csv();

  var resObj = [];
  csvStream.on("data", function(data) {
    if (data[0].indexOf('A') < 0) {
      resObj.push([
        data[0] + "-" + data[1],
        parseInt(data[2]),
        parseInt(data[3])
      ]);
    }
  });

  csvStream.on("end", function() {
    var fileName = '/DatosAbiertos_Indicador4.json';
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
