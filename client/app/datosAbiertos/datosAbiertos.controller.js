'use strict';

angular.module('cdmxIndicatorsApp')
  .controller('DatosAbiertosCtrl', function ($scope, $uibModal, openDataService, $rootScope) {
    $rootScope.loading = true;

    $scope.selectedOpenData = "active-menu";

    $scope.ui = {};

    $scope.myModalContent = {
      indicator1: {
        title:'Evolución de la demanda de datos abiertos de la CDMX',
        description: 'Número de descargas de datasets desde el portal de datos abiertos de la CDMX'
      },
      indicator2: {
        title:'Evolución de la oferta de datos abiertos de la CDMX',
        description:'Número de descargas de datasets desde el portal de datos abiertos de la CDMX; y número de datasets publicados en gobierno gobiernoabierto.cdmx.gob.mx'
      },
      indicator3: {
        title:'Entidades con mayor oferta de datos abiertos',
        description:'Número de datasets publicados en gobiernoabierto.cdmx.gob.mxpor entidad'
      },
      indicator4:{
        title:'Entidades con mayor demanda de datos abiertos',
        description:'Número de descargas de datos abiertos de la CDMX por entidad'
      },
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

    openDataService.getOfferDemandOpenData().then(function (response) {
      var data = response.data;
      openDataService.getOfferDemandOpenDataGraph(data);
      $rootScope.loading = false;
    }).catch(function (err) {
      console.log(err);
    });
  });
