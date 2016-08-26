'use strict';

var _ = require('lodash');
var Result = require('./result.model');
var financeResults = require('../inspectors_data/financeResults');
var openDataResults = require('../inspectors_data/openDataResults');

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
  return res.status(200).json(financeResults.fourthIndicator);
};

exports.financeExecutedSpentsByDepartmentFunction = function (req, res) {
  return res.status(200).json(financeResults.fifthIndicator);
};

//openData indicator endpoints
exports.openDataDemandOffer = function (req, res) {
  return res.status(200).json(openDataResults.firstIndicator);
};

function handleError(res, err) {
  return res.status(500).send(err);
}

