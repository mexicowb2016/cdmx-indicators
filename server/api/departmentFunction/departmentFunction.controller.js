'use strict';

var _ = require('lodash');
var DepartmentFunction = require('./departmentFunction.model');
var ManagerCenter = require('../managerCenter/managerCenter.model');
var Finality = require('../finality/finality.model');
var managerCenterData = require('../inspectors_data/financeData.json');
// var managerCenterArray = managerCenterData.MANAGERCENTERS;
// var managerCenterArrayLength = managerCenterArray.length;
var seed = require('../../config/seed');
var managerRef = seed.managerRef;

// Get list of departmentFunctions
exports.index = function(req, res) {
  console.log(JSON.stringify(managerRef));
  DepartmentFunction.find().populate('managerCenter finality').exec(function (err, docs){
    if (err) console.log(err);
    console.log(JSON.stringify(docs));
  });
  //   ManagerCenter.find().exec(function (err, managers) {
  //     // if (err) console.log(err);
  //
  //     for (var i = 0; i < managers.length; i++) {
  //       var singleManager = managers[i];
  //       (function (singleManager) {
  //         DepartmentFunction.find().exec(function (err, departments) {
  //           if (err) console.log(err);
  //           for (var j = 0; j < departments.length; j++) {
  //             for (var k = 0; k < managerCenterArrayLength; k++) {
  //               if (singleManager.managerId == managerCenterArray[k].MANAGERCENTER_ID && departments[j].departmentId == managerCenterArray[k].DFUNCTION.DFUNCTION_ID) {
  //                 departments[j].managerCenter = singleManager._id;
  //                 departments[j].save().then(function (product) {
  //                   console.log('Saved Succesfully');
  //                 }, function (err) {
  //                   console.log(err);
  //
  //                 });
  //               }
  //             }
  //           }
  //         });
  //       })(singleManager)
  //     }
  //
  //   })
  // DepartmentFunction.find(function (err, departmentFunctions) {
  //   if(err) { return handleError(res, err); }
  //   return res.status(200).json(departmentFunctions);
  // });
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
