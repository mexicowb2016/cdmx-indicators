/**
 * Created by joel on 26-08-16.
 */
function createOfferDemandOpenDataResult() {
  var offerOpenDataGathering = [
    60,
    122,
    166,
    188,
    207,
    217,
    225,
    239,
    240,
    247,
    247,
    254,
    254,
    254,
    254,
    263,
    265,
    277,
    277,
    281,
    281,
    282,
    282,
    283,
    283,
    283,
    283,
    283,
    283,
    283,
    283
  ];
  var demandOpenDataGathering = [
    33,
    264,
    528,
    908,
    1304,
    1614,
    1965,
    2361,
    2853,
    3443,
    4113,
    5014,
    6033,
    7122,
    8352,
    9674,
    11324,
    13010,
    14189,
    15179,
    15971,
    16661,
    17255,
    17744,
    18087,
    18225,
    18264,
    18285,
    18288,
    18300,
    18310
  ];
  var result = [];
  // result.push(['Periodo', 'Acumulacion Oferta', 'Acumulacion Demanda']);

  result = saveOpenDataFormatArray(result, offerOpenDataGathering, demandOpenDataGathering);

  return result;
}

function saveOpenDataFormatArray(saveArray, offerDataArr, demandDataArr) {
  var i, j;
  var offerCounter = 0;
  var demandCounter = 0;
  var monthNameArr = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  for (i = 2014; i <= 2016; i++) {
    for(j = 0; j < 12; j++) {
      if (i == 2016 && j == 7) {
        break;
      }
      saveArray.push([
        // new Date(i, j),
        (monthNameArr[j] + '-' + i),
        offerDataArr[offerCounter++],
        demandDataArr[demandCounter++]
      ]);
    }
  }
  return saveArray;
}

module.exports.firstIndicator = createOfferDemandOpenDataResult();
