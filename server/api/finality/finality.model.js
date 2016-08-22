'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FinalitySchema = new Schema({
  finalityId: {type: Number, unique: true, index: true },
  name: String
});

module.exports = mongoose.model('Finality', FinalitySchema);
