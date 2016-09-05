'use strict';
/**
 * @function ModalCtrl
 * Este es el controlador del componente web "Modal". Tiene los eventos de cerrar el modal (@event ok y @event close) al momento de hacer click en sus respectivos botones.
 * Ademas inyecta el servicio indicator de tipo {Object} el cual contiene el contenido (en texto) para mostrarlo en el HTML template del modal. 
 * Este controlador es generico y reutilizado en varias partes de la aplicacion.
 */
angular.module('cdmxIndicatorsApp')
  .controller('ModalCtrl', function ($scope, indicator, $uibModalInstance) {
    $scope.indicatorContent = indicator;

    $scope.ok = function () {
      $uibModalInstance.close();
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  });
