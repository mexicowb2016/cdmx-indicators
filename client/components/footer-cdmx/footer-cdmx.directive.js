'use strict';

angular.module('cdmxIndicatorsApp')
  .directive('footerCdmx', function () {
    return {
      templateUrl: 'components/footer-cdmx/footer-cdmx.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });