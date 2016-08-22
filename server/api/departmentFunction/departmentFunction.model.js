'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DepartmentFunctionSchema = new Schema({
  departmentId: {type: Number, unique: true, index: true },
  name: String
});

module.exports = mongoose.model('DepartmentFunction', DepartmentFunctionSchema);
