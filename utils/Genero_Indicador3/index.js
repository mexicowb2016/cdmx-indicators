
var fs = require('fs');
var csv = require('fast-csv');
var file = __dirname;
var stream = fs.createReadStream(file+"/Genero_Indicador3.csv");

var csvStream = csv();

var resObj = {};
csvStream.on("data", function(data) {
  if (data[0].indexOf('Indicador') < 0) {
    resObj[data[0]] = {
      bruteSalaryGapPercentage: parseInt(data[1]),
      baseSalaryGapPercentage: parseInt(data[2]),
      extraordinaryTimeGapPercentage: parseInt(data[3]),
      otherTimeGapPercentage: parseInt(data[4])
    }
  }
});

csvStream.on("end", function() {
  fs.writeFile(file+'/Genero_Indicador3.json', JSON.stringify(resObj), function (err){
    if (err) throw err;
    console.log('Successfully saved.');
  });
});

stream.pipe(csvStream);
