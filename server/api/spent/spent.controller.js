'use strict';

var _ = require('lodash');
var Spent = require('./spent.model');

// Get list of spents
exports.index = function(req, res) {
  Spent.find(function (err, spents) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(spents);
  });
};

// Get a single spent
exports.show = function(req, res) {
  Spent.findById(req.params.id, function (err, spent) {
    if(err) { return handleError(res, err); }
    if(!spent) { return res.status(404).send('Not Found'); }
    return res.json(spent);
  });
};

// Creates a new spent in the DB.
exports.create = function(req, res) {
  Spent.create(req.body, function(err, spent) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(spent);
  });
};

// Updates an existing spent in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Spent.findById(req.params.id, function (err, spent) {
    if (err) { return handleError(res, err); }
    if(!spent) { return res.status(404).send('Not Found'); }
    var updated = _.merge(spent, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(spent);
    });
  });
};

// Deletes a spent from the DB.
exports.destroy = function(req, res) {
  Spent.findById(req.params.id, function (err, spent) {
    if(err) { return handleError(res, err); }
    if(!spent) { return res.status(404).send('Not Found'); }
    spent.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

//Get normal or capital total spents
exports.getTotalSpents = function(req, res) {
  var spentType = req.params.spentTypeId;
  // console.log(req.params);
  Spent.find().populate('spentType').exec(function (err, spents){
    if (err) console.log(err);
    var i;
    var originalSpentSum = 0;
    var modifiedSpentSum = 0;
    var executedSpentSum = 0;
    var spentExecutedByPercentage = 0;

    for (i = 0; i < spents.length; i++) {
      if (spents[i].spentType.spentTypeId == spentType) {
        originalSpentSum += spents[i].originalSpent;
        modifiedSpentSum += spents[i].modifiedSpents.december;
        executedSpentSum += spents[i].executedSpents.december;
      }
    }
    if (modifiedSpentSum != 0 && executedSpentSum != 0) {
      var dividedResult = (executedSpentSum / modifiedSpentSum).toFixed(2);
      dividedResult = parseFloat(dividedResult);
      spentExecutedByPercentage = Math.round(dividedResult) * 100;
    }
    var result = {
      executedTotalSpentPercentage: spentExecutedByPercentage,
      originalTotalSpent: parseFloat(originalSpentSum.toFixed(2)),
      modifiedTotalSpent: parseFloat(modifiedSpentSum.toFixed(2)),
      executedTotalSpent: parseFloat(executedSpentSum.toFixed(2))
    };
    return res.status(200).json(result);
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
