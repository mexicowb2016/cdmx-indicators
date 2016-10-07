
var fs = require('fs');
var csv = require('fast-csv');
var file = __dirname;
var stream = fs.createReadStream(file+"/DatosAbiertos_Indicador1.csv");

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
  fs.writeFile(file+'/DatosAbiertos_Indicador1.json', JSON.stringify(resObj), function (err){
    if (err) throw err;
    console.log('Successfully saved.');
  });
});

stream.pipe(csvStream);
