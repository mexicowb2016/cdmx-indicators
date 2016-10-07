
var fs = require('fs');
var csv = require('fast-csv');

var csvToJson = function() {
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
    var fileName = '/Genero_Indicador1.json';
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
