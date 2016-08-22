'use strict';

var _ = require('lodash');
var InstitutionalActivity = require('./institutionalActivity.model');

// Get list of institutionalActivitys
exports.index = function(req, res) {
  InstitutionalActivity.find(function (err, institutionalActivitys) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(institutionalActivitys);
  });
};

// Get a single institutionalActivity
exports.show = function(req, res) {
  InstitutionalActivity.findById(req.params.id, function (err, institutionalActivity) {
    if(err) { return handleError(res, err); }
    if(!institutionalActivity) { return res.status(404).send('Not Found'); }
    return res.json(institutionalActivity);
  });
};

// Creates a new institutionalActivity in the DB.
exports.create = function(req, res) {
  InstitutionalActivity.create(req.body, function(err, institutionalActivity) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(institutionalActivity);
  });
};

// Updates an existing institutionalActivity in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  InstitutionalActivity.findById(req.params.id, function (err, institutionalActivity) {
    if (err) { return handleError(res, err); }
    if(!institutionalActivity) { return res.status(404).send('Not Found'); }
    var updated = _.merge(institutionalActivity, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(institutionalActivity);
    });
  });
};

// Deletes a institutionalActivity from the DB.
exports.destroy = function(req, res) {
  InstitutionalActivity.findById(req.params.id, function (err, institutionalActivity) {
    if(err) { return handleError(res, err); }
    if(!institutionalActivity) { return res.status(404).send('Not Found'); }
    institutionalActivity.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}