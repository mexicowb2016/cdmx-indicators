'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Esquema para Tipo de Gasto
 * @type {Schema}
 */
var SpentTypeSchema = new Schema({
  spentTypeId: {type: Number, unique: true, index: true },
  name: String
});

module.exports = mongoose.model('SpentType', SpentTypeSchema);
