
var fs = require('fs');
var csv = require('fast-csv');

var csvToJson = function() {
  var file = __dirname;
  var stream = fs.createReadStream(file + "/DatosAbiertos_Indicador5_6.csv");

  var csvStream = csv();

  var resObj = {
    offer: [],
    demand: []
  };
  csvStream.on("data", function(data) {
    if (data[0].indexOf('Ranking') < 0) {
      resObj.offer.push({
        dependency: data[1],
        datasets: parseInt(data[2])
      });
      resObj.demand.push({
        dependency: data[3],
        datasets: parseInt(data[4])
      });
    }
  });

  csvStream.on("end", function() {
    var fileName = '/DatosAbiertos_Indicador5_6.json';
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
