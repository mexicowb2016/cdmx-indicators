'use strict';

/**
 * Rutas para Resultados
 */

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
router.get('/get/executedSpents/bubble/', controller.financeExecutedSpentsBubble);
router.get('/get/openData/demandOffer/', controller.openDataDemandOffer);
router.get('/get/genre/proportion/', controller.genreProportion);
router.get('/get/genre/salaryGap/', controller.genreSalaryGap);
router.get('/get/genre/demographic/', controller.genreDemographic);
router.get('/get/genre/remuneration/', controller.genreRemuneration);
router.get('/get/genreJobClassification/', controller.genreJobClassification);
router.get('/get/businessSubnationalRank/', controller.businessSubnationalRank);
router.get('/get/businessGoals/', controller.businessGoals);
router.get('/get/businessGoalsLists/', controller.businessGoalsLists);
router.get('/get/business/currentQualification/:rankDetail', controller.businessCurrentQualification);

module.exports = router;
