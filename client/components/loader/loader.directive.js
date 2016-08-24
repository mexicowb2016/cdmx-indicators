'use strict';

angular.module('cdmxIndicatorsApp')
  .directive('loader', function () {
    return {
      templateUrl: 'components/loader/loader.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });