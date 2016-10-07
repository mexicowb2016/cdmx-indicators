'use strict';

var _ = require('lodash');
var Result = require('./result.model');
var financeResults = require('../inspectors_data/financeResults');
var openDataResults = require('../inspectors_data/openDataResults');
var genreDataResults = require('../inspectors_data/genreResults');
var genreDataResults2 = require('../inspectors_data/genreDataResults2');
var businessDataResults = require('../inspectors_data/businessResults');

/**
 * Lista resultados
 * @param  {Request} req - Objeto para el request
 * @param  {Response} res - Objeto para respuesta
 * @return {Response} - Respuesta del request
 */
exports.index = function(req, res) {
  Result.find(function (err, results) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(results);
  });
};

/**
 * Obtiene un resultado
 * @param  {Request} req - Objeto para el request
 * @param  {Response} res - Objeto para respuesta
 * @return {Response} - Respuesta del request
 */
exports.show = function(req, res) {
  Result.findById(req.params.id, function (err, result) {
    if(err) { return handleError(res, err); }
    if(!result) { return res.status(404).send('Not Found'); }
    return res.json(result);
  });
};

/**
 * Crea un resultado
 * @param  {Request} req - Objeto para el request
 * @param  {Response} res - Objeto para respuesta
 * @return {Response} - Respuesta del request
 */
exports.create = function(req, res) {
  Result.create(req.body, function(err, result) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(result);
  });
};

/**
 * Modifica un resultado
 * @param  {Request} req - Objeto para el request
 * @param  {Response} res - Objeto para respuesta
 * @return {Response} - Respuesta del request
 */
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Result.findById(req.params.id, function (err, result) {
    if (err) { return handleError(res, err); }
    if(!result) { return res.status(404).send('Not Found'); }
    var updated = _.merge(result, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(result);
    });
  });
};

/**
 * Elimina un resultado
 * @param  {Request} req - Objeto para el request
 * @param  {Response} res - Objeto para respuesta
 * @return {Response} - Respuesta del request
 */
exports.destroy = function(req, res) {
  Result.findById(req.params.id, function (err, result) {
    if(err) { return handleError(res, err); }
    if(!result) { return res.status(404).send('Not Found'); }
    result.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

/**
 * Indicadores Financieros
 */
/**
* Ejecucion del Gasto por Dependencia
* @param  {Request} req - Objeto para el request
* @param  {Response} res - Objeto para respuesta
* @return {Response} - Respuesta del request
*/
exports.financeExecutedSpentsBubble = function (req, res) {
  var month = req.query.month;
  var monthField = 'EJERCIDO';
  if (month != null) {
    if (month != '0') {
      monthField = 'MES' + month;
    }
  }
  var level0 = req.query.level0;
  var level1 = req.query.level1;
  var tmpResults = {};
  for (var i = 0; i < financeResults.sixthIndicator.DATA.length; i++) {
    var data = financeResults.sixthIndicator.DATA[i];
    var add = false;
    var resultsKey = null;
    var resultsValue = 0;
    if (level0 == null) {
      add = true;
      resultsKey = data['FUNCION'];
      resultsValue = parseInt(data[monthField].split(',').join(''));
    } else {
      if (data['FUNCION'] == level0) {
        if (level1 == null) {
          add = true;
          resultsKey = data['TIPO'];
          resultsValue = parseInt(data[monthField].split(',').join(''));
        } else {
          if (data['TIPO'] == level1) {
            add = true;
            resultsKey = data['CENTRO'];
            resultsValue = parseInt(data[monthField].split(',').join(''));
          }
        }
      }
    }
    if (resultsValue == 0) {
      add = false;
    }
    if (add) {
      if (tmpResults[resultsKey] == null) {
        tmpResults[resultsKey] = {
          name: resultsKey,
          value: resultsValue
        };
      } else {
        tmpResults[resultsKey].value = tmpResults[resultsKey].value + resultsValue;
      }
    }
  }
  var results = [];
  for (var key in tmpResults) {
    results.push(tmpResults[key]);
  }
  return res.status(200).json(results);
};

/**
 * Indicadores Datos Abiertos
 */
/**
 * Comparativas con iniciativas de datos abiertos
 * @param  {Request} req - Objeto para el request
 * @param  {Response} res - Objeto para respuesta
 * @return {Response} - Respuesta del request
 */
exports.openDataIndicator1 = function (req, res) {
  return res.status(200).json(openDataResults.indicator1);
};

/**
 * Visitas y usuarios de datos abiertos
 * @param  {Request} req - Objeto para el request
 * @param  {Response} res - Objeto para respuesta
 * @return {Response} - Respuesta del request
 */
exports.openDataIndicator2 = function (req, res) {
  return res.status(200).json(openDataResults.indicator2);
};

/**
 * Evolución oferta y demanda de datos abiertos
 * @param  {Request} req - Objeto para el request
 * @param  {Response} res - Objeto para respuesta
 * @return {Response} - Respuesta del request
 */
exports.openDataDemandOffer = function (req, res) {
  return res.status(200).json(openDataResults.indicator4);
};

/**
 * Ranking de oferta y demanda de datos abiertos
 * @param  {Request} req - Objeto para el request
 * @param  {Response} res - Objeto para respuesta
 * @return {Response} - Respuesta del request
 */
exports.openDataRankingDemandOffer = function (req, res) {
  return res.status(200).json(openDataResults.indicator5);
};

/**
 * Indicadores negocios
 */
/**
 * Ranking Subnacional
 * @param  {Request} req - Objeto para el request
 * @param  {Response} res - Objeto para respuesta
 * @return {Response} - Respuesta del request
 */
exports.businessSubnationalRank = function (req, res) {
  return res.status(200).json(businessDataResults.firstIndicator);
};

/**
 * Ranking Mundial
 * @param  {Request} req - Objeto para el request
 * @param  {Response} res - Objeto para respuesta
 * @return {Response} - Respuesta del request
 */
exports.businessWorldRank = function (req, res) {
  return res.status(200).json(businessDataResults.secondIndicator);
};

/**
 * Cumplimiento de metas
 * @param  {Request} req - Objeto para el request
 * @param  {Response} res - Objeto para respuesta
 * @return {Response} - Respuesta del request
 */
exports.businessGoals = function (req, res) {
  var indicator = req.query.indicator;
  var entityInCharge = req.query.entityInCharge;
  var entityGcdmx = req.query.entityGcdmx;
  return res.status(200).json(businessDataResults.fourthIndicator(indicator, entityInCharge, entityGcdmx));
};

/**
 * Cumplimiento de metas - listas
 * @param  {Request} req - Objeto para el request
 * @param  {Response} res - Objeto para respuesta
 * @return {Response} - Respuesta del request
 */
exports.businessGoalsLists = function (req, res) {
  return res.status(200).json(businessDataResults.fourthIndicatorLists());
};

/**
 * Calificacion actual
 * @param  {Request} req - Objeto para el request
 * @param  {Response} res - Objeto para respuesta
 * @return {Response} - Respuesta del request
 */
exports.businessCurrentQualification = function (req, res) {
  var rankDetail = parseInt(req.params.rankDetail);
  var data = businessDataResults.thirdIndicator;
  var result;
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      if (rankDetail == 1 && key == 'Apertura de una empresa') {
        result = getSetBusiness3IndicatorResultObj(data, key);
        break;
      }
      if (rankDetail == 2 && key == 'Registro de propiedades') {
        result = getSetBusiness3IndicatorResultObj(data, key);
        break;
      }
      if (rankDetail == 3 && key == 'Manejo de permisos de construcción') {
        result = getSetBusiness3IndicatorResultObj(data, key);
        break;
      }
      if (rankDetail == 4 && key == 'Cumplimiento de contratos') {
        result = getSetBusiness3IndicatorResultObj(data, key);
        break;
      }
    }
  }
  return res.status(200).json(result);
};

/**
 * Crea un objeto con los datos de los resultados en el formato necesario
 * @param  {Request} req - Objeto para el request
 * @param  {Response} res - Objeto para respuesta
 * @return {Response} - Respuesta del request
 */
function getSetBusiness3IndicatorResultObj (data, key) {
  var result = {};
  // var className  = key.toLowerCase();
  // className = 'radarg-' + (className.split(' ').join('-'));
  var resultObj = {
    // className: key,
    className: "",
    axes: []
  };
  var axisObj;
  for (var inner in data[key]) {
    if (data[key].hasOwnProperty(inner)) {
      if (result['qualification'] == null) {
        result['qualification'] = data[key][inner]['Calificacion_CDMX'];
      }
      if (inner == 'Procedimientos (Numero)') {
        axisObj = {axis: inner, value: data[key][inner]['Porcentaje'], yOffset: -10}
      } else if (inner == 'Tiempo (Dias)') {
        axisObj = {axis: inner, value: data[key][inner]['Porcentaje'], xOffset: -40, yOffset: 10}
      } else if (inner == 'Calidad (%)') {
        axisObj = {axis: inner, value: data[key][inner]['Porcentaje'], xOffset: 40, yOffset: -14}
      } else {
        axisObj = {axis: inner, value: data[key][inner]['Porcentaje']}
      }
      resultObj.axes.push(axisObj);
    }
  }
  result['radarData'] = [resultObj];
  return result;
}

/**
 * Indicadores genero
 */
/**
 * Proporcion de genero
 * @param  {Request} req - Objeto para el request
 * @param  {Response} res - Objeto para respuesta
 * @return {Response} - Respuesta del request
 */
exports.genreProportion = function (req, res) {
  return res.status(200).json(genreDataResults.secondIndicator);
};

/**
 * Brecha salarial
 * @param  {Request} req - Objeto para el request
 * @param  {Response} res - Objeto para respuesta
 * @return {Response} - Respuesta del request
 */
exports.genreSalaryGap = function (req, res) {
  return res.status(200).json(genreDataResults.fifthIndicator);
};

/**
 * Demografico
 * @param  {Request} req - Objeto para el request
 * @param  {Response} res - Objeto para respuesta
 * @return {Response} - Respuesta del request
 */
exports.genreDemographic = function (req, res) {
  var dependency = req.query.dependency;
  var classification = req.query.classification;
  return res.status(200).json(genreDataResults2.genreData2FilterDemographic(dependency, classification));
};

/**
 * Remuneracion
 * @param  {Request} req - Objeto para el request
 * @param  {Response} res - Objeto para respuesta
 * @return {Response} - Respuesta del request
 */
exports.genreRemuneration = function (req, res) {
  var dependency = req.query.dependency;
  var classification = req.query.classification;
  return res.status(200).json(genreDataResults2.genreData2FilterRemuneration(dependency, classification));
};

/**
 * Clasificacion de trabajo
 * @param  {Request} req - Objeto para el request
 * @param  {Response} res - Objeto para respuesta
 * @return {Response} - Respuesta del request
 */
exports.genreJobClassification = function (req, res) {
  return res.status(200).json(genreDataResults.firstToThirdIndicator);
};

/**
 * Maneja errores
 * @param  {Request} req - Objeto para el request
 * @param  {Object} err - Objeto de error
 * @return {Response} - Respuesta del request
 */
function handleError(res, err) {
  return res.status(500).send(err);
}

/**
 * Ordena por corriente
 * @param  {Object} a Primer objeto a comparar
 * @param  {Object} b Segundo objeto a comparar
 * @return {Integer} comparacion
 */
function sortCurrent(a, b) {
  return a.currentSpent - b.currentSpent;
}

/**
 * Ordena por capital
 * @param  {Object} a Primer objeto a comparar
 * @param  {Object} b Segundo objeto a comparar
 * @return {Integer} comparacion
 */
function sortCapital(a, b) {
  return a.capitalSpent - b.capitalSpent;
}

/**
 * Ordena por total
 * @param  {Object} a Primer objeto a comparar
 * @param  {Object} b Segundo objeto a comparar
 * @return {Integer} comparacion
 */
function sortTotal(a, b) {
  return a.totalSpent - b.totalSpent;
}

/**
 * Ordena números
 * @param  {Integer} a Primer objeto a comparar
 * @param  {Integer} b Segundo objeto a comparar
 * @return {Integer} comparacion
 */
function sortNumber(a, b) {
  return a - b;
}
