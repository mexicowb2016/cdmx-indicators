'use strict';

angular.module('cdmxIndicatorsApp')
  .controller('NavbarCtrl', function ($rootScope, $scope, $location, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };

  });

angular.module('cdmxIndicatorsApp').
  controller('LoginCtrl', function ($rootScope, $scope, $uibModalInstance) {
    $scope.formSubmitted = false;
    $scope.user = {
      password: ""
    };
    $scope.login = function (form) {
      $scope.formSubmitted = true;
      if (form.$valid && form['password'].$modelValue === "Wa2d83$!"){
        $rootScope.passwordValidated = true;
        $rootScope.modalClosed = true;
        $uibModalInstance.close();
      } else {
        form['password'].$invalid = true;
      }
    }
  });
