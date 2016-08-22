'use strict';

var _ = require('lodash');
var SpentType = require('./spentType.model');

// Get list of spentTypes
exports.index = function(req, res) {
  SpentType.find(function (err, spentTypes) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(spentTypes);
  });
};

// Get a single spentType
exports.show = function(req, res) {
  SpentType.findById(req.params.id, function (err, spentType) {
    if(err) { return handleError(res, err); }
    if(!spentType) { return res.status(404).send('Not Found'); }
    return res.json(spentType);
  });
};

// Creates a new spentType in the DB.
exports.create = function(req, res) {
  SpentType.create(req.body, function(err, spentType) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(spentType);
  });
};

// Updates an existing spentType in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  SpentType.findById(req.params.id, function (err, spentType) {
    if (err) { return handleError(res, err); }
    if(!spentType) { return res.status(404).send('Not Found'); }
    var updated = _.merge(spentType, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(spentType);
    });
  });
};

// Deletes a spentType from the DB.
exports.destroy = function(req, res) {
  SpentType.findById(req.params.id, function (err, spentType) {
    if(err) { return handleError(res, err); }
    if(!spentType) { return res.status(404).send('Not Found'); }
    spentType.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}