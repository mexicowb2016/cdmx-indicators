
var fs = require('fs');
var csv = require('fast-csv');
var file = __dirname;
var stream = fs.createReadStream(file + "/Finanzas_General.csv");

var csvStream = csv();

var resObj = {};
resObj['DATA'] = [];
csvStream.on("data", function(data) {
  if (data[0].indexOf('AÑO') != 0) {
    resObj['DATA'].push({
      center: data[53],
      centerShort: data[54],
      functionName: data[59],
      activity: data[62],
      spent: data[72],
      urg: data[74],
      original: parseFloat(data[6].split(',').join('')),
      modified1: parseFloat(data[7].split(',').join('')),
      modified2: parseFloat(data[8].split(',').join('')),
      modified3: parseFloat(data[9].split(',').join('')),
      modified4: parseFloat(data[10].split(',').join('')),
      modified5: parseFloat(data[11].split(',').join('')),
      modified6: parseFloat(data[12].split(',').join('')),
      modified7: parseFloat(data[13].split(',').join('')),
      modified8: parseFloat(data[14].split(',').join('')),
      modified9: parseFloat(data[15].split(',').join('')),
      modified10: parseFloat(data[16].split(',').join('')),
      modified11: parseFloat(data[17].split(',').join('')),
      modified12: parseFloat(data[18].split(',').join('')),
      modifiedTo2: parseFloat(data[19].split(',').join('')),
      modifiedTo3: parseFloat(data[20].split(',').join('')),
      modifiedTo4: parseFloat(data[21].split(',').join('')),
      modifiedTo5: parseFloat(data[22].split(',').join('')),
      modifiedTo6: parseFloat(data[23].split(',').join('')),
      modifiedTo7: parseFloat(data[24].split(',').join('')),
      modifiedTo8: parseFloat(data[25].split(',').join('')),
      modifiedTo9: parseFloat(data[26].split(',').join('')),
      modifiedTo10: parseFloat(data[27].split(',').join('')),
      modifiedTo11: parseFloat(data[28].split(',').join('')),
      modifiedTo12: parseFloat(data[29].split(',').join('')),
      executed1: parseFloat(data[30].split(',').join('')),
      executed2: parseFloat(data[31].split(',').join('')),
      executed3: parseFloat(data[32].split(',').join('')),
      executed4: parseFloat(data[33].split(',').join('')),
      executed5: parseFloat(data[34].split(',').join('')),
      executed6: parseFloat(data[35].split(',').join('')),
      executed7: parseFloat(data[36].split(',').join('')),
      executed8: parseFloat(data[37].split(',').join('')),
      executed9: parseFloat(data[38].split(',').join('')),
      executed10: parseFloat(data[39].split(',').join('')),
      executed11: parseFloat(data[40].split(',').join('')),
      executed12: parseFloat(data[41].split(',').join('')),
      executedTo2: parseFloat(data[42].split(',').join('')),
      executedTo3: parseFloat(data[43].split(',').join('')),
      executedTo4: parseFloat(data[44].split(',').join('')),
      executedTo5: parseFloat(data[45].split(',').join('')),
      executedTo6: parseFloat(data[46].split(',').join('')),
      executedTo7: parseFloat(data[47].split(',').join('')),
      executedTo8: parseFloat(data[48].split(',').join('')),
      executedTo9: parseFloat(data[49].split(',').join('')),
      executedTo10: parseFloat(data[50].split(',').join('')),
      executedTo11: parseFloat(data[51].split(',').join('')),
      executedTo12: parseFloat(data[52].split(',').join(''))
    });
  }
});

csvStream.on("end", function() {
  fs.writeFile(file+'/Finanzas_General.json', JSON.stringify(resObj), function (err){
    if (err) throw err;
    console.log('Successfully saved.');
  });
});

stream.pipe(csvStream);
