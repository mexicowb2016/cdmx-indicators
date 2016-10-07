'use strict';
/**
 * @function GenerosCtrl
 * Este es el controlador del modulo de generos, el cual realiza los siguientes procesos:
 * - Establece y ejecuta el evento para mostrar modales de informacion de cada grafico(Al momento de hacer click en los
 * iconos de informacion de cada panel)
 * - Inyecta y ejecuta metodos del servicio genreDataService para la obtencion de datos, configuracion y realizado de
 * graficos (Bar y Pie charts).
 * - Inyecta servicios genericos de AngularJS para guardar/usar propiedades/metodos declarados en este controlador.
 * - Inyecta servicio de Angular-Bootstrap para el uso de su componente web tipo Modal.
 *
 * @param {Object} $rootScope - Objeto global que utiliza AngularJS para guardar/usar propiedades/metodos globales en la aplicacion.
 * @param {Object} $scope - Objeto privado que se establece para guardar/usar propiedades/metodos en el controlador
 * @param {Object} $uibModal - Servicio generico que la libreria Angular-Bootstrap establece para la configuracion/uso de propiedades/metodos
 * de un componente web tipo Modal.
 * @param {Object} genreDataService - Servicio generico que utiliza este controlador para invocar sus metodos de obtencion de datos
 * y dibujar graficos de dichos datos.
 */
  angular.module('cdmxIndicatorsApp')
    .controller('GenerosCtrl', function ($rootScope, $scope, $uibModal, genreDataService) {
      $rootScope.loading = true;

      $scope.selectedGenre = "active-menu";

      $scope.ui = {
        jobClassification: {
          superiorCommand: false,
          mediumCommand: false,
          jobStability: false,
          duty: false
        }
      };

      $scope.myModalContent = {
        indicator1: {
          title: 'Composición por género en distintos puestos, y las contrataciones y promociones en el último trimestre.',
          description: 'En este gráfico se muestra la composición de hombres y mujeres en distintas categorías de puestos públicos: mando superior, mando medio, estabilidad laboral y haberes. Así mismo, se muestra la composición por género en las contrataciones y promociones en el último trimestre.'
        },
        indicator2: {
          title:'Composición por género en los quintiles de remuneración de personal técnico-operativo.',
          description:'En este gráfico se muestra la composición por género en los quintiles de remuneración mensual de personal técnico-operativo.'
        },
        indicator3: {
          title:'Brecha salarial entre hombres y mujeres.',
          description:'Este gráfico muestra la brecha de la remuneración entre hombres y mujeres en remuneración bruta, salario base, tiempo extraordinario y otras prestaciones, en las seis categorías de puesto. Se calcula la brecha restando el promedio de remuneración de mujeres al promedio correspondiente de hombres, y dividida por el último.'
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

      genreDataService.getWomenSalaryGapDataByJobClassification().then(function (response) {
        var data = response.data;
        genreDataService.getWomenSalaryGapRepresentationGraph(data);
      }).catch(function (err) {
        console.log(err);
      });

      genreDataService.getWomenProportion().then(function (response) {
        var data = response.data;
        genreDataService.getWomenProportionRepresentationGraph(data);
      }).catch(function (err) {
        console.log(err);
      });

      $scope.indicator5 = 'demographic';

      $scope.dependency = 0;

      $scope.classifications = {
        0: "Estabilidad Laboral",
        1: "Haberes",
        2: "Mando Medio",
        3: "Mando Superior",
        4: "Tecnico Operativo de Base",
        5: "Tecnico Operativo de Confianza"
      };

      $scope.classification = 0;

      $scope.updateIndicator5 = function() {
        if ($scope.indicator5 == 'demographic') {
          $scope.ui.fifthIndicatorGraphTitle = 'Proporción de mujeres en cada ente público';
          genreDataService.getDemographic($scope.dependency, $scope.classifications[$scope.classification]).then(function(data) {
            genreDataService.getDemographicGraph(data.data);
            $rootScope.loading = false;
          });
        } else {
          $scope.ui.fifthIndicatorGraphTitle = 'Brecha salarial entre hombres y mujeres en cada ente público';
          genreDataService.getRemuneration($scope.dependency, $scope.classifications[$scope.classification]).then(function(data) {
            genreDataService.getRemunerationGraph(data.data);
            $rootScope.loading = false;
          });
        }
      };

      $scope.clearSetGenreJobClassificationActiveButtonCSS = function (type) {
        $scope.ui.jobClassification.superiorCommand = false;
        $scope.ui.jobClassification.mediumCommand = false;
        $scope.ui.jobClassification.jobStability = false;
        $scope.ui.jobClassification.duty = false;
        if (type == 'Mando Superior') {
          $scope.ui.jobClassification.superiorCommand = true;
        }
        if (type == 'Mando Medio') {
          $scope.ui.jobClassification.mediumCommand = true;
        }
        if (type == 'Estabilidad Laboral') {
          $scope.ui.jobClassification.jobStability = true;
        }
        if (type == 'Haberes') {
          $scope.ui.jobClassification.duty = true;
        }

      };

      $scope.getGenreJobClassificationGraph = function (type) {
        $scope.clearSetGenreJobClassificationActiveButtonCSS(type);
        genreDataService.getGenreJobClassificationData().then(function (response) {
          var data = response.data;
          genreDataService.getGenreJobClassificationGraph(data, type);
        }).catch(function (err) {
          console.log(err);
        });
      };

      $scope.getGenreJobClassificationGraph($scope.classifications[3]);
      $scope.updateIndicator5();

      $scope.openLoginModal = function () {
        var modalInstance = $uibModal.open({
          templateUrl: 'login_modal.html',
          controller: 'LoginCtrl',
          size: 'md',
          backdrop: 'static'
        });

        modalInstance.result.then(function () {
          $scope.initBackground = false;
        }, function () {});

      };

      if (!$rootScope.passwordValidated) {
        $scope.openLoginModal();
      }
    });
