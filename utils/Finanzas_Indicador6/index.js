
var fs = require('fs');
var csv = require('fast-csv');

var csvToJson = function() {
  var file = __dirname;
  var stream = fs.createReadStream(file+"/Finanzas_Indicador6.csv");

  var csvStream = csv();

  var resObj = {};
  resObj['DATA'] = [];
  csvStream.on("data", function(data) {
    if (data[0].indexOf('FUNC') != 0) {
      resObj['DATA'].push({
        'FUNCION': data[0],
        'TIPO': data[1],
        'CENTRO': data[2],
        'MES1': data[3],
        'MES2': data[4],
        'MES3': data[5],
        'MES4': data[6],
        'MES5': data[7],
        'MES6': data[8],
        'MES7': data[9],
        'MES8': data[10],
        'MES9': data[11],
        'MES10': data[12],
        'MES11': data[13],
        'MES12': data[14],
        'EJERCIDO': data[15]
      });
    }
  });

  csvStream.on("end", function() {
    var fileName = '/Finanzas_Indicador6.json';
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
