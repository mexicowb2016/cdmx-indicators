'use strict';

angular.module('cdmxIndicatorsApp')
  .controller('MainCtrl', function ($scope, $http, socket, $uibModal, $log) {
    $scope.awesomeThings = [];

    $scope.myModalContent = {
      indicator1: {
        title: 'Gasto de capital',
        description: 'Evolución del gasto de capital. Presenta el presupuesto original (o presupuesto aprobado) anual y el presupuesto modificado y ejercido (para el último mes disponible) del gasto de capital. También presenta el porcentaje de ejecución del gasto de capital (el cual se calcula dividiendo el presupuesto ejercido sobre el presupuesto modificado).'
      },
      indicator2: {
        title:'Gasto corriente',
        description:'Evolución del gasto corriente. Presenta el presupuesto original (o presupuesto aprobado) anual y el presupuesto modificado y ejercido (para el último mes disponible) del gasto corriente. También presenta el porcentaje de ejecución del gasto corriente (el cual se calcula dividiendo el presupuesto ejercido sobre el presupuesto modificado).'
      },
      indicator3: {
        title:'Tres primeros en ejecución de gasto de capital',
        description:'Presenta las tres Dependencias y las tres Actividades Institucionales con mayor ejecución de gasto de capital. Hacer clic en el botón de Dependencia o Actividad Institucional según lo que se quiera revisar.'
      },
      indicator4:{
        title:'Ejecución del gasto por Dependencia',
        description:'Presenta la ejecución del gasto corriente y la ejecución del gasto de capital para las cinco principales Dependencias según el presupuesto original (o presupuesto aprobado) anual. Si desea revisar la ejecución del gasto de otras Dependencias, debe seleccionar los nombres en el menú desplegable.'
      },
      indicator5:{
        title:'Ejecución del gasto por función',
        description:'Presenta la ejecución del gasto por función, de conformidad con la finalidad a la cual corresponde el gasto (gobierno, desarrollo social o desarrollo económico).'
      },
    }

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });

    //Codigo modal
    $scope.items = ['item1', 'item2', 'item3'];

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

         modalInstance.result.then(function (selectedItem) {
           $scope.selected = selectedItem;
         }, function () {
           $log.info('Modal dismissed at: ' + new Date());
         });
       };

       $scope.toggleAnimation = function () {
         $scope.animationsEnabled = !$scope.animationsEnabled;
       };
   //Fin codigo modal
  });
