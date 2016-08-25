
var fs = require('fs');
var csv = require('fast-csv');
var file = __dirname;
var stream = fs.createReadStream(file+"/CDMXGenre.csv");

var csvStream = csv();

var resObj = {};
csvStream.on("data", function(data) {
  if (data[0].indexOf('Sector') == 0) {
    resObj['DATA'] = [];
  } else {
    resObj['DATA'].push({
      'SECTOR': data[0],
      'JOB_CLASSIFICATION': data[1],
      'GENRE': data[2],
      'STAFF_NO': data[3],
      'AVG_BRUTE_SALARY': data[4],
      'AVG_BASE_SALARY': data[5],
      'AVG_EXTRAORDINARY_TIME': data[6],
      'AVG_OTHER_BENEFITS': data[7],
      'SUM_BRUTE_SALARY': data[8],
      'SUM_BASE_SALARY': data[9],
      'SUM_EXTRAORDINARY_TIME': data[10],
      'SUM_OTHER_BENEFITS': data[11],
      'RECRUITMENTS': data[12],
      'PROMOTIONS': data[13]
    });
  }
});



csvStream.on("end", function() {
  fs.writeFile(file+'/genreData.json', JSON.stringify(resObj), function (err){
    if (err) throw err;
    console.log('Successfully saved.');
  });
});

stream.pipe(csvStream);
