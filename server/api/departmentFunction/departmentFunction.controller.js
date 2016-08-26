'use strict';

var _ = require('lodash');
var DepartmentFunction = require('./departmentFunction.model');

// Get list of departmentFunctions
exports.index = function(req, res) {
  console.log(JSON.stringify(managerRef));
  DepartmentFunction.find(function (err, docs){
    if (err) console.log(err);
    return res.status(200).json(docs);
  });
};

// Get a single departmentFunction
exports.show = function(req, res) {
  DepartmentFunction.findById(req.params.id, function (err, departmentFunction) {
    if(err) { return handleError(res, err); }
    if(!departmentFunction) { return res.status(404).send('Not Found'); }
    return res.json(departmentFunction);
  });
};

// Creates a new departmentFunction in the DB.
exports.create = function(req, res) {
  DepartmentFunction.create(req.body, function(err, departmentFunction) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(departmentFunction);
  });
};

// Updates an existing departmentFunction in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  DepartmentFunction.findById(req.params.id, function (err, departmentFunction) {
    if (err) { return handleError(res, err); }
    if(!departmentFunction) { return res.status(404).send('Not Found'); }
    var updated = _.merge(departmentFunction, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(departmentFunction);
    });
  });
};

// Deletes a departmentFunction from the DB.
exports.destroy = function(req, res) {
  DepartmentFunction.findById(req.params.id, function (err, departmentFunction) {
    if(err) { return handleError(res, err); }
    if(!departmentFunction) { return res.status(404).send('Not Found'); }
    departmentFunction.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
