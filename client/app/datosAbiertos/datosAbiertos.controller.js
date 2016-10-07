'use strict';
/**
 * @function DatosAbiertosCtrl
 * Este es el controlador del modulo de negocios, el cual realiza los siguientes procesos:
 * - Establece y ejecuta el evento para mostrar modales de informacion de cada grafico(Al momento de hacer click en los
 * iconos de informacion de cada panel)
 * - Inyecta y ejecuta metodos del servicio openDataService para la obtencion de datos, configuracion y realizado de
 * grafico (Linear chart).
 * - Inyecta servicios genericos de AngularJS para guardar/usar propiedades/metodos declarados en este controlador.
 * - Inyecta servicio de Angular-Bootstrap para el uso de su componente web tipo Modal.
 *
 * @param {Object} $rootScope - Objeto global que utiliza AngularJS para guardar/usar propiedades/metodos globales en la aplicacion.
 * @param {Object} $scope - Objeto privado que se establece para guardar/usar propiedades/metodos en el controlador
 * @param {Object} $uibModal - Servicio generico que la libreria Angular-Bootstrap establece para la configuracion/uso de propiedades/metodos
 * de un componente web tipo Modal.
 * @param {Object} openDataService - Servicio generico que utiliza este controlador para invocar sus metodos de obtencion de datos
 * y dibujar graficos de dichos datos.
 */
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
        description:'Número de descargas de datos abiertos de la CDMX por entidad'
      },
      indicator4:{
        title:'Entidades con mayor demanda de datos abiertos',
        description:'Número de datasets publicados en gobiernoabierto.cdmx.gob.mx por entidad'
      }
    };

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

    $scope.indicator1 = [];
    openDataService.getIndicator1OpenData().then(function(response) {
      $scope.indicator1 = response.data;
    }).catch(function (err) {
      console.log(err);
    });

    openDataService.getOfferDemandOpenData().then(function (response) {
      var data = response.data;
      openDataService.getOfferDemandOpenDataGraph(data);
      $rootScope.loading = false;
    }).catch(function (err) {
      console.log(err);
    });
  });
