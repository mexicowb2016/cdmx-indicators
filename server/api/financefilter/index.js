'use strict';

var express = require('express');
var controller = require('./financefilter.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.get('/indicators/indicator1/:month', controller.indicator1);
router.get('/indicators/indicator3/dependencies/:month', controller.indicator3Dependencies);
router.get('/indicators/indicator3/activities/:month', controller.indicator3Activities);
router.get('/indicators/indicator4/:month', controller.indicator4);
router.get('/indicators/indicator4type', controller.indicator4type);
router.get('/indicators/indicator5/:month', controller.indicator5);

module.exports = router;
