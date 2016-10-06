/**
 * Created by joel on 02-09-16.
 */

var fs = require('fs');
var csv = require('fast-csv');
var file = __dirname;
var stream = fs.createReadStream(file+"/DoingBusiness_Indicador3.csv");

var csvStream = csv();

var resObj = {};
csvStream.on("data", function(data) {
  if (!(data[0].indexOf('Indicador') >= 0)) {
    // resObj['DATA'] = [];
  // } else {
    if (resObj[data[0]] == null) {
      resObj[data[0]] = {};
    }
    if (resObj[data[0]][data[2]] == null) {
      resObj[data[0]][data[2]] = {
        'Calificacion_CDMX': data[1] ? parseFloat(data[1]) : 0,
        'CDMX': data[3] ? parseFloat(data[3]) : 0,
        'Mejores_practicasMX2014': data[4] ? parseFloat(data[4]) : 0,
        'LAC': data[5] ? parseFloat(data[5]) : 0,
        'OECD': data[6] ? parseFloat(data[6]) : 0,
        'Porcentaje': data[7] ? parseFloat(data[7]) : 0,
        'Entidad_mayor_desempeno': data[8]
      }
    }
  }
});



csvStream.on("end", function() {
  fs.writeFile(file+'/DoingBusiness_Indicador3.json', JSON.stringify(resObj), function (err){
    if (err) throw err;
    console.log('Successfully saved.');
  });
});

stream.pipe(csvStream);
