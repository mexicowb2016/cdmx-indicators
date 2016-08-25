'use strict';

var _ = require('lodash');
var JobClassification = require('./jobClassification.model');

// Get list of jobClassifications
exports.index = function(req, res) {
  JobClassification.find(function (err, jobClassifications) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(jobClassifications);
  });
};

// Get a single jobClassification
exports.show = function(req, res) {
  JobClassification.findById(req.params.id, function (err, jobClassification) {
    if(err) { return handleError(res, err); }
    if(!jobClassification) { return res.status(404).send('Not Found'); }
    return res.json(jobClassification);
  });
};

// Creates a new jobClassification in the DB.
exports.create = function(req, res) {
  JobClassification.create(req.body, function(err, jobClassification) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(jobClassification);
  });
};

// Updates an existing jobClassification in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  JobClassification.findById(req.params.id, function (err, jobClassification) {
    if (err) { return handleError(res, err); }
    if(!jobClassification) { return res.status(404).send('Not Found'); }
    var updated = _.merge(jobClassification, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(jobClassification);
    });
  });
};

// Deletes a jobClassification from the DB.
exports.destroy = function(req, res) {
  JobClassification.findById(req.params.id, function (err, jobClassification) {
    if(err) { return handleError(res, err); }
    if(!jobClassification) { return res.status(404).send('Not Found'); }
    jobClassification.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}