/**
 * Created by joel on 01-09-16.
 */
var businessData4 = require('./business4.json');

var firstIndicator = {
  "Apertura de una empresa": 11,
  "Cumplimiento de contratos": 26,
  "Manejo de permisos de construccion": 26,
  "Registro de propiedades": 32
};

var thirdIndicator = require('./businessData.json');

var fourthIndicator = function(indicator) {
  var indicatorStarts = ' ';
  if (indicator == 'all') {
    indicatorStarts = '*';
  } else if (indicator == 'opening') {
    indicatorStarts = 'A';
  } else if (indicator == 'permissions') {
    indicatorStarts = 'M';
  } else if (indicator == 'registry') {
    indicatorStarts = 'R';
  } else if (indicator == 'contracts') {
    indicatorStarts = 'C';
  }
  var results = [];
  for (var i = 0; i < businessData4.DATA.length; i++) {
    var data = businessData4.DATA[i];
    if ((indicatorStarts == '*' || data['INDICATOR'].charAt(0) == indicatorStarts) && data['ENTITY_GCDMX'] == 'SI') {
      results.push({
        entity: data['ENTITY_IN_CHARGE'],
        procedures: data['NUMBER_CURRENT_PROCESS'],
        time: data['CURRENT_TIME'],
        cost: data['CURRENT_COST'],
        quality: data['CURRENT_QUALIFICATION']
      });
    }
  }
  return results;
};

module.exports = {
  businessData4: businessData4,
  firstIndicator: firstIndicator,
  thirdIndicator: thirdIndicator,
  fourthIndicator: fourthIndicator
};
