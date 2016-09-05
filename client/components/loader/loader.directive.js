'use strict';
/**
 * @function loader
 * Este es una directiva (componente web) el cual contiene funcionalidad personalizada dentro de un template de HTML
 * Contiene el template HTML para enmascarar una pagina web, trabaja junto al sevicio ng-show de AngularJS para verificar
 * si este template HTML debe ser mostrado o no.
 * @returns {Object} - La configuracion de la directiva
 */
angular.module('cdmxIndicatorsApp')
  .directive('loader', function () {
    return {
      templateUrl: 'components/loader/loader.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
