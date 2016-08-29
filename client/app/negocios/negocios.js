'use strict';

angular.module('cdmxIndicatorsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('negocios', {
        url: '/negocios',
        templateUrl: 'app/negocios/negocios.html',
        controller: 'NegociosCtrl'
      });
  });