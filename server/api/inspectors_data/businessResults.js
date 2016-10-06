/**
 * Created by joel on 01-09-16.
 */
var businessData4 = require('./DoingBusiness_Indicador4.json');

var businessData1 = require('./DoingBusiness_Indicador1_2.json');

var firstIndicator = {};
var secondIndicator = {};
for (var key in businessData1) {
  if (key.indexOf("Ranking") < 0) {
    firstIndicator[key] = businessData1[key];
  } else {
    secondIndicator[key] = businessData1[key];
  }
}

var thirdIndicator = require('./DoingBusiness_Indicador3.json');

var fourthIndicator = function(indicator, entityInCharge, entityGcdmx) {
  var results = [];
  // console.log("indicator == null");
  // console.log(indicator);
  // console.log(indicator == null);
  for (var i = 0; i < businessData4.DATA.length; i++) {
    var data = businessData4.DATA[i];
    if (indicator == data['INDICATOR'] && (data['ENTITY_IN_CHARGE'] == entityInCharge || entityInCharge == 'Todos') && data['ENTITY_GCDMX'] == entityGcdmx) {
      results.push({
        process: data['PROCESS'],
        entityInCharge: data['ENTITY_IN_CHARGE'],
        procedure: data['PROCEDURE'],
        timeSubnational2014: data['TIME_SUBNATIONAL_2014'],
        costSubnational2014: data['COST_SUBNATIONAL_2014'],
        procedureWorld2016: data['PROCEDURE_WORLD_2016'],
        timeWorld2016: data['TIME_WORLD_2016'],
        metaProcedure: data['META_PROCEDURE'],
        metaProcedureInCharge: data['META_PROCEDURE_IN_CHARGE'],
        metaTime: data['META_TIME'],
        metaTimeInCharge: data['META_TIME_IN_CHARGE'],
        metaCost: data['META_COST'],
        metaCostInCharge: data['META_COST_IN_CHARGE'],
      });
    }
  }
  return results;
};

var fourthIndicatorLists = function() {
  var results = {
    indicators: [],
    inCharge: []
  };
  var indicators = {};
  var inCharge = {};
  for (var i = 0; i < businessData4.DATA.length; i++) {
    indicators[businessData4.DATA[i]['INDICATOR']] = true;
    inCharge[businessData4.DATA[i]['ENTITY_IN_CHARGE']] = true;
  }
  for (var key in indicators) {
    results.indicators.push(key);
  }
  for (var key in inCharge) {
    results.inCharge.push(key);
  }
  return results;
};

module.exports = {
  businessData4: businessData4,
  firstIndicator: firstIndicator,
  secondIndicator: secondIndicator,
  thirdIndicator: thirdIndicator,
  fourthIndicator: fourthIndicator,
  fourthIndicatorLists: fourthIndicatorLists
};
