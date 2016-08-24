'use strict';

var _ = require('lodash');
var Spent = require('./spent.model');

// Get list of spents
exports.index = function(req, res) {
  Spent.find(function (err, spents) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(spents);
  });
};

// Get a single spent
exports.show = function(req, res) {
  Spent.findById(req.params.id, function (err, spent) {
    if(err) { return handleError(res, err); }
    if(!spent) { return res.status(404).send('Not Found'); }
    return res.json(spent);
  });
};

// Creates a new spent in the DB.
exports.create = function(req, res) {
  Spent.create(req.body, function(err, spent) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(spent);
  });
};

// Updates an existing spent in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Spent.findById(req.params.id, function (err, spent) {
    if (err) { return handleError(res, err); }
    if(!spent) { return res.status(404).send('Not Found'); }
    var updated = _.merge(spent, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(spent);
    });
  });
};

// Deletes a spent from the DB.
exports.destroy = function(req, res) {
  Spent.findById(req.params.id, function (err, spent) {
    if(err) { return handleError(res, err); }
    if(!spent) { return res.status(404).send('Not Found'); }
    spent.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

exports.getAllTotalSpents = function (req, res) {
  Spent.find().populate('spentType').exec(function (err, spents){
    if (err) console.log(err);
    var result;
    var dividedResult;
    var i;
    var originalNormalSpentSum = 0;
    var modifiedNormalSpentSum = 0;
    var executedNormalSpentSum = 0;
    var originalCapitalSpentSum = 0;
    var modifiedCapitalSpentSum = 0;
    var executedCapitalSpentSum = 0;
    var normalSpentExecutedByPercentage = 0;
    var capitalSpentExecutedByPercentage = 0;
    for (i = 0; i < spents.length; i++) {
      if (spents[i].spentType.spentTypeId == 1) {
        //TODO consider all spents made in each month - not only december
        originalNormalSpentSum += spents[i].originalSpent;
        modifiedNormalSpentSum += spents[i].modifiedSpents.december;
        executedNormalSpentSum += spents[i].executedSpents.december;
      }
      if (spents[i].spentType.spentTypeId == 2) {
        //TODO consider all spents made in each month - not only december
        originalCapitalSpentSum += spents[i].originalSpent;
        modifiedCapitalSpentSum += spents[i].modifiedSpents.december;
        executedCapitalSpentSum += spents[i].executedSpents.december;
      }
    }
    if (originalNormalSpentSum != 0) {
      originalNormalSpentSum = parseFloat(originalNormalSpentSum.toFixed(2));
    }
    if (modifiedNormalSpentSum != 0 && executedNormalSpentSum != 0) {
      executedNormalSpentSum = parseFloat(executedNormalSpentSum.toFixed(2));
      modifiedNormalSpentSum = parseFloat(modifiedNormalSpentSum.toFixed(2));
      dividedResult = (executedNormalSpentSum / modifiedNormalSpentSum).toFixed(2);
      dividedResult = parseFloat(dividedResult);
      normalSpentExecutedByPercentage = dividedResult * 100;
    }
    if (originalCapitalSpentSum != 0) {
      originalCapitalSpentSum = parseFloat(originalCapitalSpentSum.toFixed(2));
    }
    if (modifiedCapitalSpentSum != 0 && executedCapitalSpentSum != 0) {
      executedCapitalSpentSum = parseFloat(executedCapitalSpentSum.toFixed(2));
      modifiedCapitalSpentSum = parseFloat(modifiedCapitalSpentSum.toFixed(2));
      dividedResult = (executedCapitalSpentSum / modifiedCapitalSpentSum).toFixed(2);
      dividedResult = parseFloat(dividedResult);
      capitalSpentExecutedByPercentage = dividedResult * 100;
    }
    result = {
      executedNormalTotalSpentPercentage: normalSpentExecutedByPercentage,
      originalNormalSpentSum: Math.round(originalNormalSpentSum),
      modifiedNormalSpentSum: Math.round(modifiedNormalSpentSum),
      executedNormalSpentSum: Math.round(executedNormalSpentSum),
      executedCapitalTotalSpentPercentage: capitalSpentExecutedByPercentage,
      originalCapitalSpentSum: Math.round(originalCapitalSpentSum),
      modifiedCapitalSpentSum: Math.round(modifiedCapitalSpentSum),
      executedCapitalSpentSum: Math.round(executedCapitalSpentSum)
    };
    return res.status(200).json(result);
  });
};

//Get normal or capital total spents
exports.getTotalSpents = function(req, res) {
  var spentType = req.params.spentTypeId;
  // console.log(req.params);
  Spent.find().populate('spentType').exec(function (err, spents){
    if (err) console.log(err);
    var i;
    var originalSpentSum = 0;
    var modifiedSpentSum = 0;
    var executedSpentSum = 0;
    var spentExecutedByPercentage = 0;
    var result;
    var dividedResult;
      for (i = 0; i < spents.length; i++) {
        if (spents[i].spentType.spentTypeId == spentType) {
          //TODO consider all spents made in each month - not only december
          originalSpentSum += spents[i].originalSpent;
          modifiedSpentSum += spents[i].modifiedSpents.december;
          executedSpentSum += spents[i].executedSpents.december;
        }
      }
      if (originalSpentSum != 0) {
        originalSpentSum = parseFloat(originalSpentSum.toFixed(2));
      }
      if (modifiedSpentSum != 0 && executedSpentSum != 0) {
        executedSpentSum = parseFloat(executedSpentSum.toFixed(2));
        modifiedSpentSum = parseFloat(modifiedSpentSum.toFixed(2));
        dividedResult = (executedSpentSum / modifiedSpentSum).toFixed(2);
        dividedResult = parseFloat(dividedResult);
        spentExecutedByPercentage = dividedResult * 100;
      }
      result = {
        executedTotalSpentPercentage: spentExecutedByPercentage,
        originalTotalSpent: Math.round(originalSpentSum),
        modifiedTotalSpent: Math.round(modifiedSpentSum),
        executedTotalSpent: Math.round(executedSpentSum)
      };
      return res.status(200).json(result);
  });
};

exports.getTop3CapitalSpentsByDependency = function (req, res) {
  Spent.find().populate('managerCenter spentType').exec(function (err, spents) {
    if (err) console.log(err);
    var i;
    var results = {
      first: {},
      second: {},
      third: {}
    };
    var managerCenterObj = {};
    for (i = 0; i < spents.length; i++) {
      if (spents[i].spentType.spentTypeId == 2 && spents[i].managerCenter.dependency == 1) {
        //TODO consider all spents made in each month - not only december
        if (managerCenterObj[spents[i].managerCenter.name] == null) {
          managerCenterObj[spents[i].managerCenter.name] = 0;
          managerCenterObj[spents[i].managerCenter.name] += spents[i].executedSpents.december;
        } else {
          managerCenterObj[spents[i].managerCenter.name] += spents[i].executedSpents.december;
        }
      }
    }
    var key;
    var totalArr = [];
    for (key in managerCenterObj) {
      if (managerCenterObj.hasOwnProperty(key)) {
        managerCenterObj[key] = Math.round(parseFloat(managerCenterObj[key].toFixed(2)));
        totalArr.push({
          name: key,
          totalSpent: managerCenterObj[key]
        });
      }
    }

    totalArr.sort(function (a, b) {
      return b.totalSpent - a.totalSpent;
    });

    results.first.name = totalArr[0].name;
    results.first.totalSpent = totalArr[0].totalSpent;
    results.second.name = totalArr[1].name;
    results.second.totalSpent = totalArr[1].totalSpent;
    results.third.name = totalArr[2].name;
    results.third.totalSpent = totalArr[2].totalSpent;

    return res.status(200).json(results);
  });
};

exports.getTop3CapitalSpentsByInstitutionalAct = function(req, res) {
  Spent.find().populate('institutionalActivity spentType').exec(function (err, spents) {
    var i;
    var results = {
      first: {},
      second: {},
      third: {}
    };
    var institutionalActObj = {};
    for (i = 0; i < spents.length; i++) {
      if (spents[i].spentType.spentTypeId == 2) {
        //TODO consider all spents made in each month - not only december
        if (institutionalActObj[spents[i].institutionalActivity.name] == null) {
          institutionalActObj[spents[i].institutionalActivity.name] = 0;
          institutionalActObj[spents[i].institutionalActivity.name] += spents[i].executedSpents.december;
        } else {
          institutionalActObj[spents[i].institutionalActivity.name] += spents[i].executedSpents.december;
        }
      }
    }

    var totalArr = [];
    var key;
    for (key in institutionalActObj) {
      if (institutionalActObj.hasOwnProperty(key)) {
        institutionalActObj[key] = Math.round(parseFloat(institutionalActObj[key].toFixed(2)));
        totalArr.push({
          name: key,
          totalSpent: institutionalActObj[key]
        });
      }
    }

    totalArr.sort(function (a, b) {
      return b.totalSpent - a.totalSpent;
    });

    results.first.name = totalArr[0].name;
    results.first.totalSpent = totalArr[0].totalSpent;
    results.second.name = totalArr[1].name;
    results.second.totalSpent = totalArr[1].totalSpent;
    results.third.name = totalArr[2].name;
    results.third.totalSpent = totalArr[2].totalSpent;

    return res.status(200).json(results);
  });
};

exports.getExecutedSpentsByDependency = function (req, res) {
  Spent.find().populate('managerCenter spentType').exec(function (err, spents) {
    if (err) {console.log(err);}
    var i;
    var j;
    var managerCenterObj = {};
    var managerCenterArr = getSpentsByMainManagerCentersDependency();
    for (i = 0; i < spents.length; i++) {
      if (spents[i].managerCenter.dependency == 1) {
        for (j = 0; j < managerCenterArr.length; j++) {
          if (spents[i].managerCenter.name == managerCenterArr[j]) {
            setTotalSpentsForManagerCenterByDependency(managerCenterObj, spents[i]);
            break;
          }
        }
      }
    }
    var key;
    var result = {};
    var normalExecuted;
    var capitalExecuted;
    for (key in managerCenterObj) {
      if (managerCenterObj.hasOwnProperty(key)) {
        normalExecuted= parseFloat((managerCenterObj[key].normalSpent.executedSpents / managerCenterObj[key].normalSpent.modifiedSpents).toFixed(2)) * 100;
        capitalExecuted = parseFloat((managerCenterObj[key].capitalSpent.executedSpents / managerCenterObj[key].capitalSpent.modifiedSpents).toFixed(2)) * 100;
        result[key] = {
          normalSpentExecuted: Math.round(normalExecuted),
          capitalSpentExecuted: Math.round(capitalExecuted)
        };
      }
    }
    return res.status(200).json(result);
  });
};

exports.getExecutedSpentsByDepartmentFunction = function (req, res) {
  Spent.find().populate('departmentFunction spentType').exec(function(err, spents){
    if (err) console.log(err);
    var i;
    var departmentFunObj = {};
    for (i = 0; i < spents.length; i++) {
      if (departmentFunObj[spents[i].departmentFunction.name] == null) {
        departmentFunObj[spents[i].departmentFunction.name] = {
          normalSpent: {
            modifiedSpents: 0,
            executedSpents: 0
          },
          capitalSpent: {
            modifiedSpents: 0,
            executedSpents: 0
          }
        }
      }
      //TODO consider all spents made in each month - not only december
      if (spents[i].spentType.spentTypeId == 1) {
        departmentFunObj[spents[i].departmentFunction.name].normalSpent.modifiedSpents += spents[i].modifiedSpents.december;
        departmentFunObj[spents[i].departmentFunction.name].normalSpent.executedSpents += spents[i].executedSpents.december;
      }
      if (spents[i].spentType.spentTypeId == 2) {
        departmentFunObj[spents[i].departmentFunction.name].capitalSpent.modifiedSpents += spents[i].modifiedSpents.december;
        departmentFunObj[spents[i].departmentFunction.name].capitalSpent.executedSpents += spents[i].executedSpents.december;
      }
    }
    var key;
    var normalExecuted;
    var capitalExecuted;
    var result = {};
    for (key in departmentFunObj) {
      if (departmentFunObj.hasOwnProperty(key)) {
        normalExecuted = parseFloat((departmentFunObj[key].normalSpent.executedSpents / departmentFunObj[key].normalSpent.modifiedSpents).toFixed(2)) * 100;
        capitalExecuted = parseFloat((departmentFunObj[key].capitalSpent.executedSpents / departmentFunObj[key].capitalSpent.modifiedSpents).toFixed(2)) * 100;
        result[key] = {
          normalSpentExecuted: Math.round(normalExecuted),
          capitalSpentExecuted: Math.round(capitalExecuted)
        };
      }
    }
    return res.status(200).json(result);
  })
};

function getSpentsByMainManagerCentersDependency () {
  return ['Procuraduría General de Justicia del Distrito Federal', 'Secretaría de Desarrollo Social del Distrito Federal',
    'Secretaría de Obras y Servicios del Distrito Federal', 'Secretaría de Salud del Distrito Federal', 'Secretaría de Seguridad Pública del Distrito Federal'
  ];
}

function setTotalSpentsForManagerCenterByDependency (mainObj, currentSpent) {
  if (mainObj[currentSpent.managerCenter.name] == null) {
    mainObj[currentSpent.managerCenter.name] = {
      normalSpent: {
        modifiedSpents: 0,
        executedSpents: 0
      },
      capitalSpent: {
        modifiedSpents: 0,
        executedSpents: 0
      }
    };
  }
  //TODO consider all spents made in each month - not only december
  if (currentSpent.spentType.spentTypeId == 1) {
    mainObj[currentSpent.managerCenter.name].normalSpent.modifiedSpents += currentSpent.modifiedSpents.december;
    mainObj[currentSpent.managerCenter.name].normalSpent.executedSpents += currentSpent.executedSpents.december;
  }
  if (currentSpent.spentType.spentTypeId == 2) {
    mainObj[currentSpent.managerCenter.name].capitalSpent.modifiedSpents += currentSpent.modifiedSpents.december;
    mainObj[currentSpent.managerCenter.name].capitalSpent.executedSpents += currentSpent.executedSpents.december;
  }

}

function handleError(res, err) {
  return res.status(500).send(err);
}
