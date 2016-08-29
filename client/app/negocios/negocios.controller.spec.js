'use strict';

describe('Controller: NegociosCtrl', function () {

  // load the controller's module
  beforeEach(module('cdmxIndicatorsApp'));

  var NegociosCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NegociosCtrl = $controller('NegociosCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
