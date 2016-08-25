'use strict';

var _ = require('lodash');
var Sector = require('./sector.model');

// Get list of sectors
exports.index = function(req, res) {
  Sector.find(function (err, sectors) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(sectors);
  });
};

// Get a single sector
exports.show = function(req, res) {
  Sector.findById(req.params.id, function (err, sector) {
    if(err) { return handleError(res, err); }
    if(!sector) { return res.status(404).send('Not Found'); }
    return res.json(sector);
  });
};

// Creates a new sector in the DB.
exports.create = function(req, res) {
  Sector.create(req.body, function(err, sector) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(sector);
  });
};

// Updates an existing sector in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Sector.findById(req.params.id, function (err, sector) {
    if (err) { return handleError(res, err); }
    if(!sector) { return res.status(404).send('Not Found'); }
    var updated = _.merge(sector, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(sector);
    });
  });
};

// Deletes a sector from the DB.
exports.destroy = function(req, res) {
  Sector.findById(req.params.id, function (err, sector) {
    if(err) { return handleError(res, err); }
    if(!sector) { return res.status(404).send('Not Found'); }
    sector.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}