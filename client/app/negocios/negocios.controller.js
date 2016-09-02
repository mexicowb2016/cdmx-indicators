'use strict';

angular.module('cdmxIndicatorsApp')
  .controller('NegociosCtrl', function ($scope, $uibModal, businessDataService, $rootScope) {
    $rootScope.loading = true;

    $scope.selectedBusiness = "active-menu";

    $scope.ui = {};

    $scope.myModalContent = {
      indicator1: {
        title: 'Ranking Subnacional',
        description: 'Este gráfico muestra la clasificación actual en la facilidad para hacer negocios en la CDMX comparado con otras Entidades Federativas en México. El ranking se indica en una escala de 1 a 32, donde 1 representa el desempeño más alto y 32 el más bajo.'
      },
      indicator2: {
        title:'Ranking Subnacional - Parte II',
        description:'Este gráfico muestra la clasificación actual en la facilidad para hacer negocios en la CDMX comparado con otras Entidades Federativas en México. El ranking se indica en una escala de 1 a 32, donde 1 representa el desempeño más alto y 32 el más bajo.'
      },
      indicator3: {
        title:'Ranking Mundial',
        description:'Este gráfico muestra la clasificacióna actual global en la facilidad para hacer negocios en la CDMX comparado entre 189 economías del mundo. La clasificación se determina al ordenar el agregado de las puntuaciones de la CDMX en 10 áreas a las que se otorga el mismo peso, cada una consistiendo de varios indicadores. El ranking se indica en una escala de 1 a 189, donde 1 representa el desempeño más alto y 189 el más bajo.'
      },
      indicator4:{
        title:'Calificación Actual',
        description:'Este gráfico muestra el porcentaje de distancia de la CDMX a las mejores prácticas en México en cuanto a la facilidad de hacer negocios medido por la metodología Doing Business. Esta medida muestra la distancia de la CDMX a la "Frontera", la cual representa la Entidad Federativa con el desempeño más alto observado en cada uno de los 4 indicadores analizados en el informe Doing Business Subnacional en México. La distancia de una economía a la frontera se indica en una escala de 0 a 100, donde 0 representa el desempeño mas bajo y 100 el más alto. '
      },
      indicator5:{
        title:'Cumplimiento de metas - Entidades Responsables',
        description:'Descripción del gráfico viene aquí.'
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

    businessDataService.getSubnationalRankData().then(function (response) {
      var data = response.data;
      businessDataService.getSubnationalRankGraph(data);
      $rootScope.loading = false;
    }).catch(function (err) {
      console.log(err);
    })

    $scope.selectedIndicator = 'Todos';
    $scope.indicator4all = true;

    $scope.selectIndicator4All = function() {
      $scope.selectedIndicator = 'Todos';
      $scope.indicator4all = true;
      $scope.updateIndicator4();
    }

    $scope.selectIndicator4 = function(indicator) {
      $scope.selectedIndicator = indicator;
      $scope.indicator4all = false;
      $scope.updateIndicator4();
    }

    $scope.updateIndicator4 = function() {
      var indicator = '';
      if ($scope.selectedIndicator.charAt(0) == 'A') {
        indicator = 'opening';
      } else if ($scope.selectedIndicator.charAt(0) == 'M') {
        indicator = 'permissions';
      } else if ($scope.selectedIndicator.charAt(0) == 'R') {
        indicator = 'registry';
      } else if ($scope.selectedIndicator.charAt(0) == 'C') {
        indicator = 'contracts';
      } else if ($scope.selectedIndicator.charAt(0) == 'T') {
        indicator = 'all';
      }
      businessDataService.getDoingBusinessGoals(indicator).then(function (response) {
        var data = response.data;
        $scope.indicator4data = data;
      })
    };

    $scope.updateIndicator4();

  });
