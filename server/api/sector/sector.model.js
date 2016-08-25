'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SectorSchema = new Schema({
  name: String,
  staffNo: Number,
  avgBruteSalary: Number,
  avgBaseSalary: Number,
  avgExtraordinaryTime: Number,
  avgOtherBenefits: Number,
  sumBruteSalary: Number,
  sumBaseSalary: Number,
  sumExtraordinaryTime: Number,
  sumOtherBenefits: Number,
  recruitments: Number,
  promotions: Number,
  genre: {type: Schema.Types.ObjectId, ref: 'Genre', default: null},
  jobClassification: {type: Schema.Types.ObjectId, ref: 'JobClassification', default: null}
});

module.exports = mongoose.model('Sector', SectorSchema);
