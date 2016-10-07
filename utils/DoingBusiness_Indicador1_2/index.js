/**
 * Created by joel on 02-09-16.
 */

var fs = require('fs');
var csv = require('fast-csv');

var csvToJson = function() {
  var file = __dirname;
  var stream = fs.createReadStream(file + "/DoingBusiness_Indicador1_2.csv");

  var csvStream = csv();

  var resObj = {};
  csvStream.on("data", function(data) {
    if (data[0].indexOf('Indicador') < 0) {
      resObj[data[0]] = data[1];
    }
  });

  csvStream.on("end", function() {
    var fileName = '/DoingBusiness_Indicador1_2.json';
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
