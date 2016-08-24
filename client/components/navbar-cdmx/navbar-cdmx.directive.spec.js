'use strict';

describe('Directive: navbarCdmx', function () {

  // load the directive's module and view
  beforeEach(module('cdmxIndicatorsApp'));
  beforeEach(module('components/navbar-cdmx/navbar-cdmx.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<navbar-cdmx></navbar-cdmx>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the navbarCdmx directive');
  }));
});