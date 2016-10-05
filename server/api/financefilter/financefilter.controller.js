'use strict';

var _ = require('lodash');
var Financefilter = require('./financefilter.model');

// Get list of financefilters
exports.index = function(req, res) {
  Financefilter.find(function (err, financefilters) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(financefilters);
  });
};

// Get a single financefilter
exports.show = function(req, res) {
  Financefilter.findById(req.params.id, function (err, financefilter) {
    if(err) { return handleError(res, err); }
    if(!financefilter) { return res.status(404).send('Not Found'); }
    return res.json(financefilter);
  });
};

// Creates a new financefilter in the DB.
exports.create = function(req, res) {
  Financefilter.create(req.body, function(err, financefilter) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(financefilter);
  });
};

// Updates an existing financefilter in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Financefilter.findById(req.params.id, function (err, financefilter) {
    if (err) { return handleError(res, err); }
    if(!financefilter) { return res.status(404).send('Not Found'); }
    var updated = _.merge(financefilter, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(financefilter);
    });
  });
};

// Deletes a financefilter from the DB.
exports.destroy = function(req, res) {
  Financefilter.findById(req.params.id, function (err, financefilter) {
    if(err) { return handleError(res, err); }
    if(!financefilter) { return res.status(404).send('Not Found'); }
    financefilter.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

var getExecutedField = function(month) {
  if (month == null) {
    month = '8';
  }
  if (month == '1') {
    return "$executed1";
  } else {
    return "$executedTo" + month;
  }
};

var getModifiedField = function(month) {
  if (month == null) {
    month = '8';
  }
  if (month == '1') {
    return "$modified1";
  } else {
    return "$modifiedTo" + month;
  }
};

// Get finance indicator 1 and 2 results
exports.indicator1 = function(req, res) {
  var executedField = getExecutedField(req.params.month);
  var modifiedField = getModifiedField(req.params.month);
  Financefilter.aggregate([
    {'$match': {'spent': 'GASTO DE CAPITAL'}},
    {'$group': {
      _id: '$spent',
      executed: {'$sum': executedField},
      modified: {'$sum': modifiedField},
      original: {'$sum': '$original'}
    }}
  ]).exec(function (err, indicator1Results) {
    if(err) { return handleError(res, err); }
    Financefilter.aggregate([
      {'$match': {'spent': 'GASTO CORRIENTE'}},
      {'$group': {
        _id: '$spent',
        executed: {'$sum': executedField},
        modified: {'$sum': modifiedField},
        original: {'$sum': '$original'}
      }}
    ]).exec(function (err, indicator2Results) {
      if(err) { return handleError(res, err); }
      var indicator1percent = 0;
      if (indicator1Results[0].modified != 0) {
        indicator1percent = Math.round(indicator1Results[0].executed / indicator1Results[0].modified * 100);
      }
      var indicator2percent = 0;
      if (indicator2Results[0].modified != 0) {
        indicator2percent = Math.round(indicator2Results[0].executed / indicator2Results[0].modified * 100);
      }
      var results = {
        originalCapitalSpentSum: indicator1Results[0].original,
        executedCapitalSpentSum: indicator1Results[0].executed,
        modifiedCapitalSpentSum: indicator1Results[0].modified,
        executedCapitalTotalSpentPercentage: indicator1percent,
        originalNormalSpentSum: indicator2Results[0].original,
        modifiedNormalSpentSum: indicator2Results[0].modified,
        executedNormalSpentSum: indicator2Results[0].executed,
        executedNormalTotalSpentPercentage: indicator2percent
      };
      return res.status(200).json(results);
    });
  });
};

// Get finance indicator 3 dependencies
exports.indicator3Dependencies = function(req, res) {
  var executedField = getExecutedField(req.params.month);
  Financefilter.aggregate([
    {
      '$match': {
        'spent': 'GASTO DE CAPITAL',
        'urg': 'DEPENDENCIAS'
      }
    }, {
      '$group': {
        _id: '$centerShort',
        executed: {'$sum': executedField}
      }
    }, {
      '$sort': {'executed': -1}
    }
  ]).exec(function (err, indicator3Results) {
    if(err) { return handleError(res, err); }
    var results = {
      "first": {
        "name": indicator3Results[0]._id,
        "totalSpent": indicator3Results[0].executed
      },
      "second": {
        "name": indicator3Results[1]._id,
        "totalSpent": indicator3Results[1].executed
      },
      "third": {
        "name": indicator3Results[2]._id,
        "totalSpent": indicator3Results[2].executed
      }
    };
    return res.status(200).json(results);
  });
};

// Get finance indicator 3 activities
exports.indicator3Activities = function(req, res) {
  var executedField = getExecutedField(req.params.month);
  Financefilter.aggregate([
    {
      '$match': {
        'spent': 'GASTO DE CAPITAL'
      }
    }, {
      '$group': {
        _id: '$activity',
        executed: {'$sum': executedField}
      }
    }, {
      '$sort': {'executed': -1}
    }
  ]).exec(function (err, indicator3Results) {
    if(err) { return handleError(res, err); }
    var results = {
      "first": {
        "name": indicator3Results[0]._id,
        "totalSpent": indicator3Results[0].executed
      },
      "second": {
        "name": indicator3Results[1]._id,
        "totalSpent": indicator3Results[1].executed
      },
      "third": {
        "name": indicator3Results[2]._id,
        "totalSpent": indicator3Results[2].executed
      }
    };
    return res.status(200).json(results);
  });
};

var favoritesIndicator4 = [
  'Procuraduría General de Justicia',
  'Secretaría de Desarrollo Social',
  'Secretaría de Obras y Servicios',
  'Secretaría de Salud',
  'Secretaría de Seguridad Pública'
];

// Get finance indicator 4 distinct types
exports.indicator4type = function(req, res) {
  Financefilter.find().distinct('urg', function (err, results) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(results);
  });
};

// Get finance indicator 4
exports.indicator4 = function(req, res) {
  var executedField = getExecutedField(req.params.month);
  var modifiedField = getModifiedField(req.params.month);
  var favorite = req.query.favorite;
  var dependencies = req.query.dependencies;
  if (typeof dependencies == 'string') {
    dependencies = [dependencies];
  }
  var matchOptionsCapital = {
    'spent': 'GASTO DE CAPITAL'
  };
  var matchOptionsCurrent = {
    'spent': 'GASTO CORRIENTE'
  };
  if (favorite == '1') {
    matchOptionsCapital.centerShort = {'$in': favoritesIndicator4};
    matchOptionsCurrent.centerShort = {'$in': favoritesIndicator4};
  } else {
    if (dependencies != null) {
      if (dependencies.length != 0) {
        matchOptionsCapital.urg = {'$in': dependencies};
        matchOptionsCurrent.urg = {'$in': dependencies};
      }
    }
  }
  var sort = req.query.sort;
  Financefilter.aggregate([
    {
      '$match': matchOptionsCapital
    }, {
      '$group': {
        _id: '$centerShort',
        executed: {'$sum': executedField},
        modified: {'$sum': modifiedField}
      }
    }
  ]).exec(function (err, indicator4CapitalResults) {
    if(err) { return handleError(res, err); }
    Financefilter.aggregate([
      {
        '$match': matchOptionsCurrent
      }, {
        '$group': {
          _id: '$centerShort',
          executed: {'$sum': executedField},
          modified: {'$sum': modifiedField}
        }
      }
    ]).exec(function (err, indicator4CurrentResults) {
      if(err) { return handleError(res, err); }
      var tmpResults = {};
      for (var i = 0; i < indicator4CapitalResults.length; i++) {
        var data = indicator4CapitalResults[i];
        if (tmpResults[data._id] == null) {
          tmpResults[data._id] = {
            center: data._id,
            currentSpent: 0,
            capitalSpent: 0,
            totalSpent: 0
          };
        }
        if (data.modified != 0) {
          tmpResults[data._id].capitalSpent = data.executed / data.modified * 100;
        }
      }
      for (var i = 0; i < indicator4CurrentResults.length; i++) {
        var data = indicator4CurrentResults[i];
        if (tmpResults[data._id] == null) {
          tmpResults[data._id] = {
            center: data._id,
            currentSpent: 0,
            capitalSpent: 0,
            totalSpent: 0
          };
        }
        if (data.modified != 0) {
          tmpResults[data._id].currentSpent = data.executed / data.modified * 100;
        }
      }
      var results = [];
      for (var key in tmpResults) {
        if (!(tmpResults[key].currentSpent == 0 && tmpResults[key].capitalSpent == 0)) {
          results.push(tmpResults[key]);
        }
      }
      if (sort == 'current') {
        results.sort(sortCurrent);
      } else if (sort == 'capital') {
        results.sort(sortCapital);
      }
      return res.status(200).json(results);
    });
  });
};

// Get finance indicator 5
exports.indicator5 = function(req, res) {
  var executedField = getExecutedField(req.params.month);
  var sort = req.query.sort;
  var sortField = {'executed': 1};
  if (sort == 'name') {
    sortField = {'_id': 1};
  }
  Financefilter.aggregate([
    {
      '$group': {
        _id: '$functionName',
        executed: {'$sum': executedField}
      }
    }, {
      '$sort': sortField
    }
  ]).exec(function (err, indicator5Results) {
    if(err) { return handleError(res, err); }
    var results = [];
    for (var i = 0; i < indicator5Results.length; i++) {
      results.push({
        description: indicator5Results[i]._id,
        executed: indicator5Results[i].executed
      })
    }
    return res.status(200).json(results);
  });
};

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
