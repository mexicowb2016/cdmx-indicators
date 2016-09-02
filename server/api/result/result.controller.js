'use strict';

var _ = require('lodash');
var Result = require('./result.model');
var financeResults = require('../inspectors_data/financeResults');
var openDataResults = require('../inspectors_data/openDataResults');
var genreDataResults = require('../inspectors_data/genreResults');
var genreDataResults2 = require('../inspectors_data/genreDataResults2');
var businessDataResults = require('../inspectors_data/businessResults');

// Get list of results
exports.index = function(req, res) {
  Result.find(function (err, results) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(results);
  });
};

// Get a single result
exports.show = function(req, res) {
  Result.findById(req.params.id, function (err, result) {
    if(err) { return handleError(res, err); }
    if(!result) { return res.status(404).send('Not Found'); }
    return res.json(result);
  });
};

// Creates a new result in the DB.
exports.create = function(req, res) {
  Result.create(req.body, function(err, result) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(result);
  });
};

// Updates an existing result in the DB.
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

// Deletes a result from the DB.
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


//finance indicator endpoints
exports.financeTotalAllSpents = function (req, res) {
  return res.status(200).json(financeResults.firstSecondIndicatorData);
};

exports.financeTop3CapitalSpentsByDependency = function (req, res) {
  return res.status(200).json(financeResults.thirdIndicatorByDependencyData);
};

exports.financeTop3CapitalSpentsByInstitutionalActivity = function (req, res) {
  return res.status(200).json(financeResults.thirdIndicatorByActivityInstData);
};

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

//openData indicator endpoints
exports.openDataDemandOffer = function (req, res) {
  return res.status(200).json(openDataResults.firstIndicator);
};

//business indicator endpoints
exports.businessSubnationalRank = function (req, res) {
  return res.status(200).json(businessDataResults.firstIndicator);
};

exports.businessGoals = function (req, res) {
  var indicator = req.query.indicator;
  return res.status(200).json(businessDataResults.fourthIndicator(indicator));
};

//genre
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

exports.genreSalaryGap = function (req, res) {
  return res.status(200).json(genreDataResults.fifthIndicator);
};

exports.genreDemographic = function (req, res) {
  var dependency = req.query.dependency;
  var classification = req.query.classification;
  return res.status(200).json(genreDataResults2.genreData2FilterDemographic(dependency, classification));
};

exports.genreRemuneration = function (req, res) {
  var dependency = req.query.dependency;
  var classification = req.query.classification;
  return res.status(200).json(genreDataResults2.genreData2FilterRemuneration(dependency, classification));
};

exports.genreJobClassification = function (req, res) {
  return res.status(200).json(genreDataResults.firstToThirdIndicator);
};

function handleError(res, err) {
  return res.status(500).send(err);
}

function sortCurrent(a, b) {
  return a.currentSpent - b.currentSpent;
}

function sortCapital(a, b) {
  return a.capitalSpent - b.capitalSpent;
}

function sortTotal(a, b) {
  return a.totalSpent - b.totalSpent;
}

function sortNumber(a, b) {
  return a - b;
}
