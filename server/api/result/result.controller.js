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
 * Total de gastos
 * @param  {Request} req - Objeto para el request
 * @param  {Response} res - Objeto para respuesta
 * @return {Response} - Respuesta del request
 */
exports.financeTotalAllSpents = function (req, res) {
  return res.status(200).json(financeResults.firstSecondIndicatorData);
};

/**
 * Tres primeros en Ejecucion de Gasto de Capital Dependencia
 * @param  {Request} req - Objeto para el request
 * @param  {Response} res - Objeto para respuesta
 * @return {Response} - Respuesta del request
 */
exports.financeTop3CapitalSpentsByDependency = function (req, res) {
  return res.status(200).json(financeResults.thirdIndicatorByDependencyData);
};

/**
 * Tres primeros en Ejecucion de Gasto de Capital Actividad Institucional
 * @param  {Request} req - Objeto para el request
 * @param  {Response} res - Objeto para respuesta
 * @return {Response} - Respuesta del request
 */
exports.financeTop3CapitalSpentsByInstitutionalActivity = function (req, res) {
  return res.status(200).json(financeResults.thirdIndicatorByActivityInstData);
};

/**
* Ejecucion del Gasto por Dependencia
* @param  {Request} req - Objeto para el request
* @param  {Response} res - Objeto para respuesta
* @return {Response} - Respuesta del request
*/
exports.financeExecutedSpentsByDependency = function (req, res) {
  var favorite = req.query.favorite;
  var dependency = req.query.dependency;
  var sort = req.query.sort;
  var results = [];
  for (var i = 0; i < financeResults.fourthIndicator.DATA.length; i++) {
    var data = financeResults.fourthIndicator.DATA[i];
    var matches = false;
    if (favorite == '1') {
      if (data.FAVORITE == favorite) {
        matches = true;
      }
    } else {
      if (data.DEPENDENCY == dependency) {
        matches = true;
      }
    }
    if (matches) {
      var currentSpent = parseInt(data.CURRENT_SPENT.split('%').join(''));
      var capitalSpent = parseInt(data.CAPITAL_SPENT.split('%').join(''));
      var totalSpent = parseInt(data.TOTAL_SPENT.split('%').join(''));
      results.push({
        center: data.CENTER,
        currentSpent: currentSpent,
        capitalSpent: capitalSpent,
        totalSpent: totalSpent
      });
    }
  }
  if (sort == 'current') {
    results.sort(sortCurrent);
  } else if (sort == 'capital') {
    results.sort(sortCapital);
  } else {
    results.sort(sortTotal);
  }
  return res.status(200).json(results);
};

/**
* Ejecucion del Gasto por Función
* @param  {Request} req - Objeto para el request
* @param  {Response} res - Objeto para respuesta
* @return {Response} - Respuesta del request
*/
exports.financeExecutedSpentsByDepartmentFunction = function (req, res) {
  var sort = req.query.sort;
  var results = [];
  if (sort == 'name') {
    var names = [];
    var data = {};
    for (var i = 0; i < financeResults.fifthIndicator.DATA.length; i++) {
      names.push(financeResults.fifthIndicator.DATA[i].DESCRIPTION);
      data[financeResults.fifthIndicator.DATA[i].DESCRIPTION] = financeResults.fifthIndicator.DATA[i].EXECUTED;
    }
    names.sort();
    for (var i = 0; i < names.length; i++) {
      var value = data[names[i]];
      var intValue = parseInt(value.split(',').join(''));
      results.push({
        description: names[i],
        executed: intValue
      })
    }
  } else if (sort == 'executed') {
    var executed = [];
    var data = {};
    for (var i = 0; i < financeResults.fifthIndicator.DATA.length; i++) {
      var value = financeResults.fifthIndicator.DATA[i].EXECUTED;
      var intValue = parseInt(value.split(',').join(''));
      executed.push(intValue);
      data[intValue] = financeResults.fifthIndicator.DATA[i].DESCRIPTION;
    }

    executed.sort(sortNumber);
    for (var i = 0; i < executed.length; i++) {
      results.push({
        description: data[executed[i]],
        executed: executed[i]
      })
    }
  } else {
    for (var i = 0; i < financeResults.fifthIndicator.DATA.length; i++) {
      results.push({
        description: financeResults.fifthIndicator.DATA[i].DESCRIPTION,
        executed: financeResults.fifthIndicator.DATA[i].EXECUTED
      })
    }
  }
  return res.status(200).json(results);
};

/**
 * Indicadores Datos Abiertos
 */
/**
 * Evolución oferta y demanda de datos abiertos
 * @param  {Request} req - Objeto para el request
 * @param  {Response} res - Objeto para respuesta
 * @return {Response} - Respuesta del request
 */
exports.openDataDemandOffer = function (req, res) {
  return res.status(200).json(openDataResults.firstIndicator);
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
 * Cumplimiento de metas
 * @param  {Request} req - Objeto para el request
 * @param  {Response} res - Objeto para respuesta
 * @return {Response} - Respuesta del request
 */
exports.businessGoals = function (req, res) {
  var indicator = req.query.indicator;
  return res.status(200).json(businessDataResults.fourthIndicator(indicator));
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
    className: key,
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
  return res.status(200).json({
    quintil1: [
      {
        label: "Hombre",
        value: 0.65
      }, {
        label: "Mujer",
        value: 0.35
      }
    ],
    quintil2: [
      {
        label: "Hombre",
        value: 0.6
      }, {
        label: "Mujer",
        value: 0.4
      }
    ],
    quintil3: [
      {
        label: "Hombre",
        value: 0.54
      }, {
        label: "Mujer",
        value: 0.46
      }
    ],
    quintil4: [
      {
        label: "Hombre",
        value: 0.45
      }, {
        label: "Mujer",
        value: 0.55
      }
    ],
    quintil5: [
      {
        label: "Hombre",
        value: 0.39
      }, {
        label: "Mujer",
        value: 0.61
      }
    ]
  });
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
