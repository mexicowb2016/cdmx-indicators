
var fs = require('fs');
var csv = require('fast-csv');
var file = __dirname;
var stream = fs.createReadStream(file+"/Genero_Indicador1.csv");

var csvStream = csv();

var resObj = {};
csvStream.on("data", function(data) {
  if (data[0].indexOf('Puesto') < 0) {
    resObj[data[0]] = {
      womenQuantityPercentage: parseInt(data[1]),
      womenRecruitmentPercentage: parseInt(data[2]),
      womenPromotionPercentage: parseInt(data[3]),
      menQuantityPercentage: parseInt(data[4]),
      menRecruitmentPercentage: parseInt(data[5]),
      menPromotionPercentage: parseInt(data[6])
    };
  }
});

csvStream.on("end", function() {
  fs.writeFile(file+'/Genero_Indicador1.json', JSON.stringify(resObj), function (err){
    if (err) throw err;
    console.log('Successfully saved.');
  });
});

stream.pipe(csvStream);
