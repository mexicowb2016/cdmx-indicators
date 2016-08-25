'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var JobClassificationSchema = new Schema({
  name: String
});

module.exports = mongoose.model('JobClassification', JobClassificationSchema);
