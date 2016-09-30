
var fs = require('fs');
var csv = require('fast-csv');
var file = __dirname;
var stream = fs.createReadStream(file+"/Grafico4_DB-utf8.csv");

var csvStream = csv();

var resObj = {};
resObj['DATA'] = [];
csvStream.on("data", function(data) {
  if (data[0].indexOf('#') != 0) {
    resObj['DATA'].push({
      'NUMBER': data[0],
      'INDICATOR': data[1],
      'PROCESS': data[2],
      'ENTITY_IN_CHARGE': data[3],
      'ENTITY_GCDMX': data[4],
      'PROCEDURE': data[5],
      'TIME_SUBNATIONAL_2014': data[6],
      'COST_SUBNATIONAL_2014': data[7],
      'PROCEDURE_WORLD_2016': data[8],
      'TIME_WORLD_2016': data[9],
      'COST_WORLD_2016': data[10],
      'PROCEDURE_SUBNATIONAL_2016': data[11],
      'TIME_SUBNATIONAL_2016': data[12],
      'COST_SUBNATIONAL_2016': data[13],
      'PRIORITY_ACTION_PROCEDURE': data[14],
      'PRIORITY_ACTION_TIME': data[15],
      'PRIORITY_ACTION_COST': data[16],
      'META_PROCEDURE': data[17],
      'META_PROCEDURE_IN_CHARGE': data[18],
      'META_TIME': data[19],
      'META_TIME_IN_CHARGE': data[20],
      'META_COST': data[21],
      'META_COST_IN_CHARGE': data[22]
    });
  }
});

csvStream.on("end", function() {
  fs.writeFile(file+'/business4.json', JSON.stringify(resObj), function (err){
    if (err) throw err;
    console.log('Successfully saved.');
  });
});

stream.pipe(csvStream);
