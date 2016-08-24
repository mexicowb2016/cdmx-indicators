'use strict';

describe('Directive: loader', function () {

  // load the directive's module and view
  beforeEach(module('cdmxIndicatorsApp'));
  beforeEach(module('components/loader/loader.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<loader></loader>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the loader directive');
  }));
});