
var fs = require('fs');
var csv = require('fast-csv');
var file = __dirname;
var stream = fs.createReadStream(file+"/DatosAbiertos_Indicador2_3.csv");

var csvStream = csv();

var resObj = {};
csvStream.on("data", function(data) {
  if (data[0].indexOf('Visitas') < 0) {
    resObj = {
      visits: parseInt(data[0]),
      users: parseInt(data[1])
    };
  }
});

csvStream.on("end", function() {
  fs.writeFile(file+'/DatosAbiertos_Indicador2_3.json', JSON.stringify(resObj), function (err){
    if (err) throw err;
    console.log('Successfully saved.');
  });
});

stream.pipe(csvStream);
