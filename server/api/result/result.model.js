'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ResultSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Result', ResultSchema);