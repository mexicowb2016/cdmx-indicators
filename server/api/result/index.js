'use strict';

var express = require('express');
var controller = require('./result.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.get('/get/totalAllSpents/', controller.financeTotalAllSpents);
router.get('/get/top3CapitalSpents/dependency/', controller.financeTop3CapitalSpentsByDependency);
router.get('/get/top3CapitalSpents/institutionalActivity/', controller.financeTop3CapitalSpentsByInstitutionalActivity);
router.get('/get/executedSpents/dependency/', controller.financeExecutedSpentsByDependency);
router.get('/get/executedSpents/function/', controller.financeExecutedSpentsByDepartmentFunction);
router.get('/get/openData/demandOffer/', controller.openDataDemandOffer);
router.get('/get/genre/proportion/', controller.genreProportion);

module.exports = router;
