'use strict';

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
