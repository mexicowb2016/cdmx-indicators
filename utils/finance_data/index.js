
var fs = require('fs');
var csv = require('fast-csv');
var file = __dirname;
var stream = fs.createReadStream(file+"/CDMXFinance.csv");

var csvStream = csv();

var resObj = {};
csvStream.on("data", function(data) {
  if (data[0].indexOf('AÑO') == 0) {
    resObj['DATA'] = [];
  } else {
    resObj['DATA'].push({
      'MANAGERCENTER_ID': data[1],
      'NAME': data[2],
      'DEPENDENCY': data[3]
    });
    var lastIndex = resObj['DATA'].length - 1;
    if (resObj['DATA'][lastIndex]['FINALITY'] == null) {
      resObj['DATA'][lastIndex]['FINALITY'] = {
        'FINALITY_ID': data[4],
        'NAME': data[5]
      }
    }
    if (resObj['DATA'][lastIndex]['DFUNCTION'] == null) {
      resObj['DATA'][lastIndex]['DFUNCTION'] = {
        'DFUNCTION_ID': data[6],
        'NAME': data[7]
      }
    }
    if (resObj['DATA'][lastIndex]['DSUBFUNCTION'] == null) {
      resObj['DATA'][lastIndex]['DSUBFUNCTION'] = {
        'DSUBFUNCTION_ID': data[8],
        'NAME': data[9]
      }
    }
    if (resObj['DATA'][lastIndex]['INSTITUTIONAL_ACTIVITY'] == null) {
      resObj['DATA'][lastIndex]['INSTITUTIONAL_ACTIVITY'] = {
        'INSTITUTIONAL_ACTIVITY_ID': data[10],
        'NAME': data[11],
        'YEAR': data[0],
        'BUDGETPROGRAM_ID': data[12],
        'BUDGETPROGRAM_NAME': data[13]
      }
    }
    if (resObj['DATA'][lastIndex]['SPENTS'] == null) {
      resObj['DATA'][lastIndex]['SPENTS'] = {
        'SPENTTYPE_ID': data[14],
        'SPENTTYPE_NAME': data[15],
        'INVESTMENTPROYECT': data[16],
        'ORIGINALSPENT': data[17],
        'MODIFIED_SPENTS': {
          'JANUARY': data[18],
          'FEBRUARY': data[19],
          'MARCH': data[20],
          'APRIL': data[21],
          'MAY': data[22],
          'JUNE': data[23],
          'JULY': data[24],
          'AUGUST': data[25],
          'SEPTEMBER': data[26],
          'OCTOBER': data[27],
          'NOVEMBER': data[28],
          'DECEMBER': data[29]
        },
        'EXECUTED_SPENTS': {
          'JANUARY': data[30],
          'FEBRUARY': data[31],
          'MARCH': data[32],
          'APRIL': data[33],
          'MAY': data[34],
          'JUNE': data[35],
          'JULY': data[36],
          'AUGUST': data[37],
          'SEPTEMBER': data[38],
          'OCTOBER': data[39],
          'NOVEMBER': data[40],
          'DECEMBER': data[41]
        }
      }
    }

  }
});



csvStream.on("end", function() {
  fs.writeFile(file+'/financeData.json', JSON.stringify(resObj), function (err){
    if (err) throw err;
    console.log('Successfully saved.');
  });
});

stream.pipe(csvStream);
