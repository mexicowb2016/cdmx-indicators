
var fs = require('fs');
var csv = require('fast-csv');
var file = __dirname;
var stream = fs.createReadStream(file+"/Indicador_5_Finanzas.csv");

var csvStream = csv();

var resObj = {};
resObj['DATA'] = [];
csvStream.on("data", function(data) {
  if (data[0].indexOf('FUNCION DESCRIPCION') != 0) {
    resObj['DATA'].push({
      'DESCRIPTION': data[0],
      'EXECUTED': data[1]
    });
  }
});

csvStream.on("end", function() {
  fs.writeFile(file+'/financeData3.json', JSON.stringify(resObj), function (err){
    if (err) throw err;
    console.log('Successfully saved.');
  });
});

stream.pipe(csvStream);
