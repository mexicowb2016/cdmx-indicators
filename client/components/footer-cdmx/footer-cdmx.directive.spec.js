'use strict';

describe('Directive: footerCdmx', function () {

  // load the directive's module and view
  beforeEach(module('cdmxIndicatorsApp'));
  beforeEach(module('components/footer-cdmx/footer-cdmx.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<footer-cdmx></footer-cdmx>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the footerCdmx directive');
  }));
});