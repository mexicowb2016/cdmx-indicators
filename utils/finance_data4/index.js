
var fs = require('fs');
var csv = require('fast-csv');
var file = __dirname;
var stream = fs.createReadStream(file+"/Bubble_Chart_Finanzas_v2_utf8.csv");

var csvStream = csv();

var resObj = {};
resObj['DATA'] = [];
csvStream.on("data", function(data) {
  if (data[0].indexOf('FUNC') != 0) {
    resObj['DATA'].push({
      'FUNCION': data[0],
      'TIPO': data[1],
      'CENTRO': data[2],
      'MES1': data[3],
      'MES2': data[4],
      'MES3': data[5],
      'MES4': data[6],
      'MES5': data[7],
      'MES6': data[8],
      'MES7': data[9],
      'MES8': data[10],
      'MES9': data[11],
      'MES10': data[12],
      'MES11': data[13],
      'MES12': data[14],
      'EJERCIDO': data[15]
    });
  }
});

csvStream.on("end", function() {
  fs.writeFile(file+'/financeData4.json', JSON.stringify(resObj), function (err){
    if (err) throw err;
    console.log('Successfully saved.');
  });
});

stream.pipe(csvStream);
