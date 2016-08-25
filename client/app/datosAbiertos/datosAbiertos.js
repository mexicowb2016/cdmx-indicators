'use strict';

angular.module('cdmxIndicatorsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('datosAbiertos', {
        url: '/datosAbiertos',
        templateUrl: 'app/datosAbiertos/datosAbiertos.html',
        controller: 'DatosAbiertosCtrl'
      });
  });