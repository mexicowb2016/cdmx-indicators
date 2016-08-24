'use strict';

var express = require('express');
var controller = require('./spent.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.get('/get/allTotalSpents/', controller.getAllTotalSpents);
router.get('/get/totalSpents/:spentTypeId/', controller.getTotalSpents);
router.get('/get/top3CapitalSpents/dependency/', controller.getTop3CapitalSpentsByDependency);
router.get('/get/top3CapitalSpents/institutionalActivity/', controller.getTop3CapitalSpentsByInstitutionalAct);
router.get('/get/executedSpents/dependency/', controller.getExecutedSpentsByDependency);
router.get('/get/executedSpents/function/', controller.getExecutedSpentsByDepartmentFunction);

module.exports = router;
