'use strict';

angular.module('cdmxIndicatorsApp')
  .directive('navbarCdmx', function () {
    return {
      templateUrl: 'components/navbar-cdmx/navbar-cdmx.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });