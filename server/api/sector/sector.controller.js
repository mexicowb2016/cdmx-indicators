'use strict';

var _ = require('lodash');
var Sector = require('./sector.model');

// Get list of sectors
exports.index = function(req, res) {
  Sector.find(function (err, sectors) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(sectors);
  });
};

// Get a single sector
exports.show = function(req, res) {
  Sector.findById(req.params.id, function (err, sector) {
    if(err) { return handleError(res, err); }
    if(!sector) { return res.status(404).send('Not Found'); }
    return res.json(sector);
  });
};

// Creates a new sector in the DB.
exports.create = function(req, res) {
  Sector.create(req.body, function(err, sector) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(sector);
  });
};

// Updates an existing sector in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Sector.findById(req.params.id, function (err, sector) {
    if (err) { return handleError(res, err); }
    if(!sector) { return res.status(404).send('Not Found'); }
    var updated = _.merge(sector, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(sector);
    });
  });
};

// Deletes a sector from the DB.
exports.destroy = function(req, res) {
  Sector.findById(req.params.id, function (err, sector) {
    if(err) { return handleError(res, err); }
    if(!sector) { return res.status(404).send('Not Found'); }
    sector.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};


exports.getWomenQuantityByJobClassification = function (req, res) {
  Sector.find().populate('jobClassification genre').exec(function (err, sectors) {
    if (err) {console.log(err);}
    var result = filterWomenRepresentationByJobClassification(sectors, 'staffNo');
    return res.status(200).json(result);
  })
};

exports.getWomenRecruitmentRepresentationByJobClassification = function (req, res) {
  Sector.find().populate('jobClassification genre').exec(function (err, sectors) {
    if (err) {console.log(err);}
    var result = filterWomenRepresentationByJobClassification(sectors, 'recruitments');
    return res.status(200).json(result);
  })
};

exports.getWomenPromotionRepresentationByJobClassification = function (req, res) {
  Sector.find().populate('jobClassification genre').exec(function (err, sectors) {
    if (err) {console.log(err);}
    var result = filterWomenRepresentationByJobClassification(sectors, 'promotions');
    return res.status(200).json(result);
  })
};

exports.getWomenSalaryGapByJobClassification = function (req, res) {
  Sector.find().populate('jobClassification genre').exec(function (err, sectors) {
    if (err) {console.log(err);}
    var result = filterWomenSalaryGapByJobClassification(sectors);
    return res.status(200).json(result);
  });
};

function filterWomenRepresentationByJobClassification (sectors, requiredField) {
  var i;
  var jobClassificationObj = {};
  for (i = 0; i < sectors.length; i++) {
    if (jobClassificationObj[sectors[i].jobClassification.name] == null) {
      jobClassificationObj[sectors[i].jobClassification.name] = {
        women: 0,
        men: 0
      };
    }
    if (sectors[i].genre.name == 'Femenino') {
      jobClassificationObj[sectors[i].jobClassification.name].women += sectors[i][requiredField];
    }
    if (sectors[i].genre.name == 'Masculino') {
      jobClassificationObj[sectors[i].jobClassification.name].men += sectors[i][requiredField];
    }
  }
  var key;
  for (key in jobClassificationObj) {
    if (jobClassificationObj.hasOwnProperty(key)) {
      jobClassificationObj[key].total = jobClassificationObj[key].women + jobClassificationObj[key].men;
      jobClassificationObj[key].womenPercentage = jobClassificationObj[key].women / jobClassificationObj[key].total;
      jobClassificationObj[key].womenPercentage = Math.round(parseFloat((jobClassificationObj[key].womenPercentage).toFixed(2)) * 100);
    }
  }
  return jobClassificationObj;
}

function filterWomenSalaryGapByJobClassification (sectors) {
  var i;
  var jobClassificationObj = {};
  for (i = 0; i < sectors.length; i++) {
    if (jobClassificationObj[sectors[i].jobClassification.name] == null) {
      jobClassificationObj[sectors[i].jobClassification.name] = {
        women: 0,
        men: 0,
        sumBruteSalaryWomen: 0,
        sumBaseSalaryWomen: 0,
        sumExtraordinaryTimeWomen: 0,
        sumOtherBenefitsWomen: 0,
        sumBruteSalaryMen: 0,
        sumBaseSalaryMen: 0,
        sumExtraordinaryTimeMen: 0,
        sumOtherBenefitsMen: 0
      };
    }
    if (sectors[i].genre.name == 'Femenino') {
      jobClassificationObj[sectors[i].jobClassification.name].women += sectors[i]['staffNo'];
      jobClassificationObj[sectors[i].jobClassification.name].sumBruteSalaryWomen += sectors[i]['sumBruteSalary'];
      jobClassificationObj[sectors[i].jobClassification.name].sumBaseSalaryWomen += sectors[i]['sumBaseSalary'];
      jobClassificationObj[sectors[i].jobClassification.name].sumExtraordinaryTimeWomen += sectors[i]['sumExtraordinaryTime'];
      jobClassificationObj[sectors[i].jobClassification.name].sumOtherBenefitsWomen += sectors[i]['sumOtherBenefits'];
    }
    if (sectors[i].genre.name == 'Masculino') {
      jobClassificationObj[sectors[i].jobClassification.name].men += sectors[i]['staffNo'];
      jobClassificationObj[sectors[i].jobClassification.name].sumBruteSalaryMen += sectors[i]['sumBruteSalary'];
      jobClassificationObj[sectors[i].jobClassification.name].sumBaseSalaryMen += sectors[i]['sumBaseSalary'];
      jobClassificationObj[sectors[i].jobClassification.name].sumExtraordinaryTimeMen += sectors[i]['sumExtraordinaryTime'];
      jobClassificationObj[sectors[i].jobClassification.name].sumOtherBenefitsMen += sectors[i]['sumOtherBenefits'];
    }
  }
  var key;
  var result = {};
  var substract;
  for (key in jobClassificationObj) {
    if (jobClassificationObj.hasOwnProperty(key)) {
      jobClassificationObj[key].personalTotal = jobClassificationObj[key].women + jobClassificationObj[key].men;
      jobClassificationObj[key].avgBruteSalaryWomen = jobClassificationObj[key].sumBruteSalaryWomen / jobClassificationObj[key].women;
      jobClassificationObj[key].avgBaseSalaryWomen = jobClassificationObj[key].sumBaseSalaryWomen / jobClassificationObj[key].women;
      jobClassificationObj[key].avgExtraordinaryTimeWomen = jobClassificationObj[key].sumExtraordinaryTimeWomen / jobClassificationObj[key].women;
      jobClassificationObj[key].avgOtherBenefitsWomen = jobClassificationObj[key].sumOtherBenefitsWomen / jobClassificationObj[key].women;
      jobClassificationObj[key].avgBruteSalaryMen = jobClassificationObj[key].sumBruteSalaryMen / jobClassificationObj[key].men;
      jobClassificationObj[key].avgBaseSalaryMen = jobClassificationObj[key].sumBaseSalaryMen / jobClassificationObj[key].men;
      jobClassificationObj[key].avgExtraordinaryTimeMen = jobClassificationObj[key].sumExtraordinaryTimeMen / jobClassificationObj[key].men;
      jobClassificationObj[key].avgOtherBenefitsMen = jobClassificationObj[key].sumOtherBenefitsMen / jobClassificationObj[key].men;

      jobClassificationObj[key].avgBruteSalaryPercentage = jobClassificationObj[key].avgBruteSalaryWomen / jobClassificationObj[key].avgBruteSalaryMen;
      jobClassificationObj[key].avgBruteSalaryPercentage = jobClassificationObj[key].avgBruteSalaryPercentage.toFixed(2);
      jobClassificationObj[key].avgBruteSalaryPercentage = parseFloat(jobClassificationObj[key].avgBruteSalaryPercentage);

      jobClassificationObj[key].avgBaseSalaryPercentage = jobClassificationObj[key].avgBaseSalaryWomen / jobClassificationObj[key].avgBaseSalaryMen;
      jobClassificationObj[key].avgBaseSalaryPercentage = jobClassificationObj[key].avgBaseSalaryPercentage.toFixed(2);
      jobClassificationObj[key].avgBaseSalaryPercentage = parseFloat(jobClassificationObj[key].avgBaseSalaryPercentage);

      jobClassificationObj[key].avgExtraordinaryTimePercentage = jobClassificationObj[key].avgExtraordinaryTimeWomen / jobClassificationObj[key].avgExtraordinaryTimeMen;
      jobClassificationObj[key].avgExtraordinaryTimePercentage = jobClassificationObj[key].avgExtraordinaryTimePercentage.toFixed(2);
      jobClassificationObj[key].avgExtraordinaryTimePercentage = parseFloat(jobClassificationObj[key].avgExtraordinaryTimePercentage);

      jobClassificationObj[key].avgOtherBenefitsPercentage = jobClassificationObj[key].avgOtherBenefitsWomen / jobClassificationObj[key].avgOtherBenefitsMen;
      jobClassificationObj[key].avgOtherBenefitsPercentage = jobClassificationObj[key].avgOtherBenefitsPercentage.toFixed(2);
      jobClassificationObj[key].avgOtherBenefitsPercentage = parseFloat(jobClassificationObj[key].avgOtherBenefitsPercentage);

      result[key] = {};
      substract = 1 - jobClassificationObj[key].avgBruteSalaryPercentage;
      if (substract == 1) {
        result[key].bruteSalaryGapPercentage = 0;
      } else {
        result[key].bruteSalaryGapPercentage = substract;
        result[key].bruteSalaryGapPercentage = result[key].bruteSalaryGapPercentage.toFixed(3);
        result[key].bruteSalaryGapPercentage = parseFloat((parseFloat(result[key].bruteSalaryGapPercentage) * 100).toFixed(3));
      }
      substract = 1 - jobClassificationObj[key].avgBaseSalaryPercentage;
      if (substract == 1) {
        result[key].baseSalaryGapPercentage = 0;
      } else {
        result[key].baseSalaryGapPercentage = substract;
        result[key].baseSalaryGapPercentage = result[key].baseSalaryGapPercentage.toFixed(3);
        result[key].baseSalaryGapPercentage = parseFloat((parseFloat(result[key].baseSalaryGapPercentage) * 100).toFixed(3));
      }
      substract = 1 - jobClassificationObj[key].avgExtraordinaryTimePercentage;
      if (substract == 1) {
        result[key].extraordinaryTimeGapPercentage = 0;
      } else {
        result[key].extraordinaryTimeGapPercentage = substract;
        result[key].extraordinaryTimeGapPercentage = result[key].extraordinaryTimeGapPercentage.toFixed(3);
        result[key].extraordinaryTimeGapPercentage = parseFloat((parseFloat(result[key].extraordinaryTimeGapPercentage) * 100).toFixed(3));
      }
      substract = 1 - jobClassificationObj[key].avgOtherBenefitsPercentage;
      if (substract == 1) {
        result[key].otherTimeGapPercentage = 0;
      } else {
        result[key].otherTimeGapPercentage = substract;
        result[key].otherTimeGapPercentage = result[key].otherTimeGapPercentage.toFixed(3);
        result[key].otherTimeGapPercentage = parseFloat((parseFloat(result[key].otherTimeGapPercentage) * 100).toFixed(3));
      }
    }
  }
  return result;

}

function handleError(res, err) {
  return res.status(500).send(err);
}
