'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ManagerCenterSchema = new Schema({
  managerId: {type: String, unique: true, index: true},
  name: String,
  dependency: {type: Number}
});

module.exports = mongoose.model('ManagerCenter', ManagerCenterSchema);
