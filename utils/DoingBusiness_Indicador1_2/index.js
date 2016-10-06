/**
 * Created by joel on 02-09-16.
 */

var fs = require('fs');
var csv = require('fast-csv');
var file = __dirname;
var stream = fs.createReadStream(file+"/DoingBusiness_Indicador1_2.csv");

var csvStream = csv();

var resObj = {};
csvStream.on("data", function(data) {
  if (data[0].indexOf('Indicador') < 0) {
    resObj[data[0]] = data[1];
  }
});

csvStream.on("end", function() {
  fs.writeFile(file+'/DoingBusiness_Indicador1_2.json', JSON.stringify(resObj), function (err){
    if (err) throw err;
    console.log('Successfully saved.');
  });
});

stream.pipe(csvStream);
