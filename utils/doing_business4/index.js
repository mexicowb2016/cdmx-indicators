
var fs = require('fs');
var csv = require('fast-csv');
var file = __dirname;
var stream = fs.createReadStream(file+"/Grafico4_DoingBusiness.csv");

var csvStream = csv();

var resObj = {};
resObj['DATA'] = [];
csvStream.on("data", function(data) {
  if (data[0].indexOf('Indicador') != 0) {
    resObj['DATA'].push({
      'INDICATOR': data[0],
      'WORLD_RANKING': data[1],
      'SUBNATIONAL_RANKING': data[2],
      'CURRENT_QUALIFICATION': data[3],
      'PROCESS': data[4],
      'ENTITY_IN_CHARGE': data[5],
      'ENTITY_GCDMX': data[6],
      'NUMBER_CURRENT_PROCESS': data[7],
      'CURRENT_TIME': data[8],
      'CURRENT_COST': data[9],
      'GOAL_REDUCTION_REMOVE_PROCESS': data[10],
      'GOAL_TIME': data[11],
      'GOAL_COST': data[12],
      'DEADLINE_GOAL_ACCOMPLISHMENT': data[13],
      'CURRENT_STATUS': data[14]
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
