
var fs = require('fs');
var csv = require('fast-csv');
var file = __dirname;
var stream = fs.createReadStream(file+"/Finanzas_Indicador_4_v4.csv");

var csvStream = csv();

var resObj = {};
resObj['DATA'] = [];
csvStream.on("data", function(data) {
  if (data[0].indexOf('Centro_Gestor') != 0) {
    resObj['DATA'].push({
      'CENTER': data[0],
      'FAVORITE': data[1],
      'DEPENDENCY': data[2],
      'CURRENT_SPENT': data[3],
      'CAPITAL_SPENT': data[4],
      'TOTAL_SPENT': data[5]
    });
  }
});

csvStream.on("end", function() {
  fs.writeFile(file+'/financeData2.json', JSON.stringify(resObj), function (err){
    if (err) throw err;
    console.log('Successfully saved.');
  });
});

stream.pipe(csvStream);
