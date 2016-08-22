'use strict';

var _ = require('lodash');
var DepartmentSubFunction = require('./departmentSubFunction.model');

// Get list of departmentSubFunctions
exports.index = function(req, res) {
  DepartmentSubFunction.find(function (err, departmentSubFunctions) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(departmentSubFunctions);
  });
};

// Get a single departmentSubFunction
exports.show = function(req, res) {
  DepartmentSubFunction.findById(req.params.id, function (err, departmentSubFunction) {
    if(err) { return handleError(res, err); }
    if(!departmentSubFunction) { return res.status(404).send('Not Found'); }
    return res.json(departmentSubFunction);
  });
};

// Creates a new departmentSubFunction in the DB.
exports.create = function(req, res) {
  DepartmentSubFunction.create(req.body, function(err, departmentSubFunction) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(departmentSubFunction);
  });
};

// Updates an existing departmentSubFunction in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  DepartmentSubFunction.findById(req.params.id, function (err, departmentSubFunction) {
    if (err) { return handleError(res, err); }
    if(!departmentSubFunction) { return res.status(404).send('Not Found'); }
    var updated = _.merge(departmentSubFunction, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(departmentSubFunction);
    });
  });
};

// Deletes a departmentSubFunction from the DB.
exports.destroy = function(req, res) {
  DepartmentSubFunction.findById(req.params.id, function (err, departmentSubFunction) {
    if(err) { return handleError(res, err); }
    if(!departmentSubFunction) { return res.status(404).send('Not Found'); }
    departmentSubFunction.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}