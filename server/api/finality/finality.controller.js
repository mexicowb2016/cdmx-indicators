'use strict';

var _ = require('lodash');
var Finality = require('./finality.model');

// Get list of finalitys
exports.index = function(req, res) {
  Finality.find(function (err, finalitys) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(finalitys);
  });
};

// Get a single finality
exports.show = function(req, res) {
  Finality.findById(req.params.id, function (err, finality) {
    if(err) { return handleError(res, err); }
    if(!finality) { return res.status(404).send('Not Found'); }
    return res.json(finality);
  });
};

// Creates a new finality in the DB.
exports.create = function(req, res) {
  Finality.create(req.body, function(err, finality) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(finality);
  });
};

// Updates an existing finality in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Finality.findById(req.params.id, function (err, finality) {
    if (err) { return handleError(res, err); }
    if(!finality) { return res.status(404).send('Not Found'); }
    var updated = _.merge(finality, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(finality);
    });
  });
};

// Deletes a finality from the DB.
exports.destroy = function(req, res) {
  Finality.findById(req.params.id, function (err, finality) {
    if(err) { return handleError(res, err); }
    if(!finality) { return res.status(404).send('Not Found'); }
    finality.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}