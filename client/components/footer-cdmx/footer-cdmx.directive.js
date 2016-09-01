'use strict';

angular.module('cdmxIndicatorsApp')
  .directive('footerCdmx', function ($window) {
    return {
      templateUrl: 'components/footer-cdmx/footer-cdmx.html',
      restrict: 'EA',
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
