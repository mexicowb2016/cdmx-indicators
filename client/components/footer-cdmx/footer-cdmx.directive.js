'use strict';
/**
 * @function footerCdmx
 * Este es una directiva (componente web) el cual contiene funcionalidad personalizada dentro de un template de HTML
 * Contiene el template HTML del footer-bar de la aplicacion.
 * @param {Object} $window - Servicio generico de AngularJs que instancia el objecto global window de JS encapsulado en este servicio.
 * @returns {Object} - La configuracion de la directiva
 */
angular.module('cdmxIndicatorsApp')
  .directive('footerCdmx', function ($window) {
    return {
      templateUrl: 'components/footer-cdmx/footer-cdmx.html',
      restrict: 'EA',
      /**
       * @function link
       * Esta funcion contiene la funcionalidad de este componente web despues de que este haya sido renderizado en la pagina web.
       * En este caso, adjuntamos la funcionalidad del boton que aparece dentro de esta directiva, este se muestra en una cierta cantidad de "scroll"
       * realizado en la pagina y se oculta dicho boton cuando la pagina esta en el tope mas alto.
       * Al momento de hacer click en este boton, la pagina realiza la accion de "scrollTop", el cual muestra la pagina web en el tope mas alto.
       * @param {Object} scope - El $scope que contiene esta directiva
       * @param {jQuery.Object} element - Retorna un elemento tipo jQuery (este caso es el elemento footer-cdmx)
       * @param {Object} attrs - Objeto que contiene propiedades con el mismo nombre que tiene los atributos establecidos en este elemento.
       */
      link: function (scope, element, attrs) {
        var fixedButton = element.find('.scrollTop-button');
        angular.element($window).bind("scroll", function() {
          if (angular.element($window).scrollTop() >= 200) {
            fixedButton.show(10).animate({right: '15px'}, 10);
          } else {
            fixedButton.show(10).animate({right: '-80px'}, 10);
          }
        });
        fixedButton.click(function (e) {
            e.preventDefault();
            angular.element('html,body').animate({
                scrollTop: 0
            }, 600);
        });
      }
    };
  });
