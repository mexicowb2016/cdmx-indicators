'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SpentTypeSchema = new Schema({
  spentTypeId: {type: Number, unique: true, index: true },
  name: String
});

module.exports = mongoose.model('SpentType', SpentTypeSchema);
