'use strict';
/**
 * @function scroll
 * Este es una directiva (componente web) el cual contiene funcionalidad personalizada dentro de un template de HTML
 * @param {Object} $window - Servicio generico de AngularJs que instancia el objecto global window de JS encapsulado en este servicio.
 * @returns {function} - La configuracion de la directiva
 */
angular.module('cdmxIndicatorsApp')
  .directive('scroll', function ($window) {
    /**
     * Esta directiva solo retorna una funcion, la cual contiene la funcionalidad de indicar a traves de un flag si se debe
     * agrandecer/achicar un elemento HTML cuando se realiza la accion de "scroll" en una determinada cantidad.
     * La funcionalidad de agrandecer/achicar se implementa usando el servicio ng-class
     */
    return function (scope, element, attrs) {
        angular.element($window).bind("scroll", function() {
            if (this.pageYOffset >= 50) {
                scope.boolChangeClass = true;
            } else {
                scope.boolChangeClass = false;
            }
           scope.$apply();
       });
    }
  });
