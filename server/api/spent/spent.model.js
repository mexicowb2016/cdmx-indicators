'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SpentSchema = new Schema({
  managerCenter: {type:Schema.Types.ObjectId, ref: 'ManagerCenter', default: null},
  finality: {type:Schema.Types.ObjectId, ref: 'Finality', default: null},
  departmentFunction: {type:Schema.Types.ObjectId, ref: 'DepartmentFunction', default: null},
  departmentSubFunction: {type:Schema.Types.ObjectId, ref: 'DepartmentSubFunction', default: null},
  priorityOrder: Number,
  investmentProject: String,
  originalSpent: Number,
  modifiedSpents: {
    'january': {type: Number, default: 0},
    'february': {type: Number, default: 0},
    'march': {type: Number, default: 0},
    'april': {type: Number, default: 0},
    'may': {type: Number, default: 0},
    'june': {type: Number, default: 0},
    'july': {type: Number, default: 0},
    'august': {type: Number, default: 0},
    'september': {type: Number, default: 0},
    'october': {type: Number, default: 0},
    'november': {type: Number, default: 0},
    'december': {type: Number, default: 0}
  },
  executedSpents: {
    'january': {type: Number, default: 0},
    'february': {type: Number, default: 0},
    'march': {type: Number, default: 0},
    'april': {type: Number, default: 0},
    'may': {type: Number, default: 0},
    'june': {type: Number, default: 0},
    'july': {type: Number, default: 0},
    'august': {type: Number, default: 0},
    'september': {type: Number, default: 0},
    'october': {type: Number, default: 0},
    'november': {type: Number, default: 0},
    'december': {type: Number, default: 0}
  },
  institutionalActivity: {type: Schema.Types.ObjectId, ref: 'InstitutionalActivity', default: null},
  spentType: {type: Schema.Types.ObjectId, ref: 'SpentType', default: null}
});

module.exports = mongoose.model('Spent', SpentSchema);
