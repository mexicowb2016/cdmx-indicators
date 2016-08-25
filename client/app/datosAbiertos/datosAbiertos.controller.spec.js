'use strict';

describe('Controller: DatosAbiertosCtrl', function () {

  // load the controller's module
  beforeEach(module('cdmxIndicatorsApp'));

  var DatosAbiertosCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DatosAbiertosCtrl = $controller('DatosAbiertosCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
