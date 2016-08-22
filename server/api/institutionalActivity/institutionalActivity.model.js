'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var InstitutionalActivitySchema = new Schema({
  institutionalId: {type: Number, unique: true, index: true },
  name: String,
  year: Number,
  budgetProgramId: String,
  budgetProgramName: String
});

module.exports = mongoose.model('InstitutionalActivity', InstitutionalActivitySchema);
