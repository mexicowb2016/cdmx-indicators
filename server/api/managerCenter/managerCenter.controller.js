'use strict';

var _ = require('lodash');
var ManagerCenter = require('./managerCenter.model');

// Get list of managerCenters
exports.index = function(req, res) {
  ManagerCenter.find(function (err, managerCenters) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(managerCenters);
  });
};

// Get a single managerCenter
exports.show = function(req, res) {
  ManagerCenter.findById(req.params.id, function (err, managerCenter) {
    if(err) { return handleError(res, err); }
    if(!managerCenter) { return res.status(404).send('Not Found'); }
    return res.json(managerCenter);
  });
};

// Creates a new managerCenter in the DB.
exports.create = function(req, res) {
  ManagerCenter.create(req.body, function(err, managerCenter) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(managerCenter);
  });
};

// Updates an existing managerCenter in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  ManagerCenter.findById(req.params.id, function (err, managerCenter) {
    if (err) { return handleError(res, err); }
    if(!managerCenter) { return res.status(404).send('Not Found'); }
    var updated = _.merge(managerCenter, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(managerCenter);
    });
  });
};

// Deletes a managerCenter from the DB.
exports.destroy = function(req, res) {
  ManagerCenter.findById(req.params.id, function (err, managerCenter) {
    if(err) { return handleError(res, err); }
    if(!managerCenter) { return res.status(404).send('Not Found'); }
    managerCenter.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}