
var fs = require('fs');
var csv = require('fast-csv');
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
  fs.writeFile(file+'/Genero_Indicador2.json', JSON.stringify(resObj), function (err){
    if (err) throw err;
    console.log('Successfully saved.');
  });
});

stream.pipe(csvStream);
