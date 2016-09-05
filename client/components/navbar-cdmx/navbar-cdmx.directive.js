'use strict';
/**
 * @function navbarCdmx
 * Este es una directiva (componente web) el cual contiene funcionalidad personalizada dentro de un template de HTML
 * Contiene el template HTML del navigation-bar de la aplicacion.
 * @returns {Object} - La configuracion de la directiva
 */
angular.module('cdmxIndicatorsApp')
  .directive('navbarCdmx', function () {
    return {
      templateUrl: 'components/navbar-cdmx/navbar-cdmx.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
