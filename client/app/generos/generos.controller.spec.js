'use strict';

describe('Controller: GenerosCtrl', function () {

  // load the controller's module
  beforeEach(module('cdmxIndicatorsApp'));

  var GenerosCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GenerosCtrl = $controller('GenerosCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
