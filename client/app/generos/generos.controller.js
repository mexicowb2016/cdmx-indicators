// 'use strict';
//
// angular.module('cdmxIndicatorsApp')
//   .controller('GenerosCtrl', function ($scope) {
//     $scope.message = 'Hello';
//   });

  'use strict';

  angular.module('cdmxIndicatorsApp')
    .controller('GenerosCtrl', function ($scope, $uibModal, financeDataService, $filter) {
      $scope.loading = false;

      $scope.ui = {};

      $scope.ui.top3CapitalSpentModel = 'Dependency';

      financeDataService.getAllTotalSpentData().then(function (response) {
        var data = response.data;
        financeDataService.getTotalSpentGraph($scope, data);
      }).catch(function (err) {
        console.log(err);
      });

      $scope.myModalContent = {
        indicator1: {
          title: 'Proporción de mujeres por clasificación del puesto',
          description: 'Este gráfico muestra el porcentaje de mujeres en el conjunto de personal de cada categoría: mando superior, mando medio, técnico operativo de confianza, técnico operativo de base, haberes y estabilidad laboral. Se calcula el porcentaje dividiendo la suma de mujeres en cada categoría sobre la suma de hombres.'
        },
        indicator2: {
          title:'Brecha salarial entre hombres y mujeres',
          description:'Este gráfico muestra la brecha de la remuneración entre hombres y mujeres en remuneración bruta, salario base, tiempo extraordinario y otras prestaciones, en las seis categorías de puesto. Se calcula la brecha restando el promedio de remuneración de mujeres al promedio correspondiente de hombres, y dividida por el último.'
        },
        indicator3: {
          title:'Porcentaje de mujeres contratadas por clasificación del puesto',
          description:'Este gráfico muestra el porcentaje de mujeres en el conjunto de contrataciones realizadas durante el último trimestre, en cada categoría: mando superior, mando medio, técnico operativo de confianza, técnico operativo de base, haberes y estabilidad laboral. Se calcula el porcentaje dividiendo la suma de mujeres contratadas sobre la suma de todo el personal contratado.'
        },
        indicator4:{
          title:'Porcentaje de mujeres promovidas por clasificación del puesto',
          description:'Este gráfico muestra el porcentaje de mujeres en el conjunto de promociones realizadas durante el último trimestre, en cada categoría: mando superior, mando medio, técnico operativo de confianza, técnico operativo de base, haberes y estabilidad laboral. Se calcula el porcentaje dividiendo la suma de mujeres promovidas sobre la suma de todo el personal promovido.'
        },
        indicator5:{
          title:'Consulta interactiva de las dependencias y delegaciones',
          description:'Este gráfico muestra el desempeño de cada dependencia, delegación y otros órganos del gobierno respecto a la representación equitativa y remuneración equitativa. El usuario puede elegir el indicador que desea conocer, seleccionar “dependencias” o “delegaciones”, y elegir la categoría del puesto (mando superior, mando medio, técnico operativo de confianza, técnico operativo de base, haberes y estabilidad laboral), para conocer el ranking de las dependencias y delegaciones en las áreas específicas.'
        }
      };

      //Codigo modal
      $scope.animationsEnabled = true;
      $scope.open = function (indicator) {
        var modalInstance = $uibModal.open({
         animation: $scope.animationsEnabled,
         templateUrl: 'information-modal.html',
         controller: 'ModalCtrl',
         size: 'sm',
         resolve: {
           indicator: function () {
             return indicator;
           }
         }
        });

      };
      $scope.toggleAnimation = function () {
       $scope.animationsEnabled = !$scope.animationsEnabled;
      };
      //Fin codigo modal

      $scope.getTop3CapitalSpentsByDependency = function () {
        $scope.ui.firstCapitalSpent = '';
        $scope.ui.secondCapitalSpent = '';
        $scope.ui.thirdCapitalSpent = '';
        financeDataService.getTop3CapitalSpentsByDependencyData().then(function (response) {
          var data = response.data;
          $scope.ui.firstCapitalSpent = data.first.name.toUpperCase();
          $scope.ui.secondCapitalSpent = data.second.name.toUpperCase();
          $scope.ui.thirdCapitalSpent = data.third.name.toUpperCase();
        }).catch(function (err) {
          console.log(err);
        });
      };

      $scope.getTop3CapitalSpentsByInstAct = function () {
        $scope.ui.firstCapitalSpent = '';
        $scope.ui.secondCapitalSpent = '';
        $scope.ui.thirdCapitalSpent = '';
        financeDataService.getTop3CapitalSpentsByInstActData().then(function (response) {
          var data = response.data;
          $scope.ui.firstCapitalSpent = data.first.name;
          $scope.ui.secondCapitalSpent = data.second.name;
          $scope.ui.thirdCapitalSpent = data.third.name;
        }).catch(function (err) {
          console.log(err);
        });
      };

      $scope.getTop3CapitalSpentsByDependency();
    });
