
var fs = require('fs');
var csv = require('fast-csv');
var file = __dirname;
var stream = fs.createReadStream(file+"/DatosAbiertos_Indicador5_6.csv");

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
  fs.writeFile(file+'/DatosAbiertos_Indicador5_6.json', JSON.stringify(resObj), function (err){
    if (err) throw err;
    console.log('Successfully saved.');
  });
});

stream.pipe(csvStream);
