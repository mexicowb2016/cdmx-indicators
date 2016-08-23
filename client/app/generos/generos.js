'use strict';

angular.module('cdmxIndicatorsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('generos', {
        url: '/generos',
        templateUrl: 'app/generos/generos.html',
        controller: 'GenerosCtrl'
      });
  });
  
