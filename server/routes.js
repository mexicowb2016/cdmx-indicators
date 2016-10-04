/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/financefilters', require('./api/financefilter'));
  app.use('/api/results', require('./api/result'));
  app.use('/api/genres', require('./api/genre'));
  app.use('/api/sectors', require('./api/sector'));
  app.use('/api/jobClassifications', require('./api/jobClassification'));
  app.use('/api/spents', require('./api/spent'));
  app.use('/api/spentTypes', require('./api/spentType'));
  app.use('/api/institutionalActivities', require('./api/institutionalActivity'));
  app.use('/api/departmentSubFunctions', require('./api/departmentSubFunction'));
  app.use('/api/departmentFunctions', require('./api/departmentFunction'));
  app.use('/api/finalities', require('./api/finality'));
  app.use('/api/managerCenters', require('./api/managerCenter'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
