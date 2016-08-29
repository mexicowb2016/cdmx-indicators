'use strict';

var express = require('express');
var controller = require('./sector.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.get('/get/womenJobClassification/quantity/', controller.getWomenQuantityByJobClassification);
router.get('/get/womenJobClassification/recruitment/', controller.getWomenRecruitmentRepresentationByJobClassification);
router.get('/get/womenJobClassification/promotion/', controller.getWomenPromotionRepresentationByJobClassification);
router.get('/get/womenJobClassification/salaryGap/', controller.getWomenSalaryGapByJobClassification);
router.get('/get/genreJobClassification/', controller.getGenreJobClassification);

module.exports = router;
