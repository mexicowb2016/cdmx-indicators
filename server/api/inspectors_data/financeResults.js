var firstSecondIndicator = {
  "executedNormalTotalSpentPercentage":89,
  "originalNormalSpentSum":116459923152,
  "modifiedNormalSpentSum":137876492316,
  "executedNormalSpentSum":122368182679,
  "executedCapitalTotalSpentPercentage":63,
  "originalCapitalSpentSum":34387451713,
  "modifiedCapitalSpentSum":45683429985,
  "executedCapitalSpentSum":28669536469
};

var thirdIndicatorByDependency = {
  "first": {
    "name":"Secretaría de Obras y Servicios del Distrito Federal",
    "totalSpent":6550282672
  },
  "second": {
    "name":"Secretaría de Seguridad Pública del Distrito Federal",
    "totalSpent":872240756
  },
  "third": {
    "name":"Secretaría de Gobierno del Distrito Federal",
    "totalSpent":452753219
  }
};

var thirdIndicatorByActivityInstData = {
  "first": {
    "name":"ALUMBRADO PÚBLICO",
    "totalSpent":2026169165
  },
  "second": {
    "name":"MANEJO INTEGRAL DE RESIDUOS SÓLIDOS URBANOS",
    "totalSpent":1897400201
  },
  "third": {
    "name":"APOYO ADMINISTRATIVO",
    "totalSpent":1797742046
  }
};

var fourthIndicator = require('./financeFourthIndicator.json');

var fifthIndicator = require('./financeFifthIndicator.json');

module.exports = {
  firstSecondIndicatorData: firstSecondIndicator,
  thirdIndicatorByDependencyData: thirdIndicatorByDependency,
  thirdIndicatorByActivityInstData: thirdIndicatorByActivityInstData,
  fourthIndicator: fourthIndicator,
  fifthIndicator: fifthIndicator
};


