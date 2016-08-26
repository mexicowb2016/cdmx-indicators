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
  var offerOpenData = [];
  var demandOpenData = [];

  offerOpenData = saveOpenDataArray(offerOpenData, offerOpenDataGathering);
  demandOpenData = saveOpenDataArray(demandOpenData, demandOpenDataGathering);

  return [
    {
      values: offerOpenData,
      key: 'EVOLUCION OFERTA DE DATOS ABIERTOS',
      color: "#ff7f0e"
    },
    {
      values: demandOpenData,
      key: 'EVOLUCION DEMANDA DE DATOS ABIERTOS',
      color: "#2ca02c"
    }
  ];
}

function saveOpenDataArray(saveArray, dataArr) {
  var i, j;
  var c = 0;
  var month;
  for (i = 2014; i <= 2016; i++) {
    for(j = 1; j <= 12; j++) {
      if (j > 9) {
        month = j;
      } else {
        month = '0' + j;
      }
      if (i == 2016 && j == '08') {
        break;
      }
      saveArray.push({
        x: new Date(month + '-01-' + i),
        y: dataArr[c++]
      });
    }
  }
  return saveArray;
}

module.exports.firstIndicator = createOfferDemandOpenDataResult();
