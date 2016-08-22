'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DepartmentSubFunctionSchema = new Schema({
  departmentSubId: {type: Number, unique: true, index: true },
  name: String
});

module.exports = mongoose.model('DepartmentSubFunction', DepartmentSubFunctionSchema);
