'use strict';
/**
 * @function NegociosCtrl
 * Este es el controlador del modulo de negocios, el cual realiza los siguientes procesos:
 * - Establece y ejecuta el evento para mostrar modales de informacion de cada grafico(Al momento de hacer click en los
 * iconos de informacion de cada panel)
 * - Inyecta y ejecuta metodos del servicio businessDataService para la obtencion de datos, configuracion y realizado de
 * graficos (Gauge y Radar charts).
 * - Inyecta servicios genericos de AngularJS para guardar/usar propiedades/metodos declarados en este controlador.
 * - Inyecta servicio de Angular-Bootstrap para el uso de su componente web tipo Modal.
 *
 * @param {Object} $rootScope - Objeto global que utiliza AngularJS para guardar/usar propiedades/metodos globales en la aplicacion.
 * @param {Object} $scope - Objeto privado que se establece para guardar/usar propiedades/metodos en el controlador
 * @param {Object} $uibModal - Servicio generico que la libreria Angular-Bootstrap establece para la configuracion/uso de propiedades/metodos
 * de un componente web tipo Modal.
 * @param {Object} businessDataService - Servicio generico que utiliza este controlador para invocar sus metodos de obtencion de datos
 * y dibujar graficos de dichos datos.
 */
angular.module('cdmxIndicatorsApp')
  .controller('NegociosCtrl', function ($scope, $uibModal, businessDataService, $rootScope, $sce) {
    $rootScope.loading = true;

    $scope.selectedBusiness = "active-menu";

    $scope.ui = {};
    $scope.ui.indicator3 = {};
    $scope.ui.indicator1 = {};

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

    $scope.modalFirstIndicator = {
      graph1: {
        title: 'Apertura de una empresa',
        description: '<p>Mide los retos para comenzar un negocio en CDMX. Incluye el número de pasos que nuevos empresarios necesitan cumplir, el tiempo promedio que toma, y el costo y capital mínimo requerido como porcentaje del Ingreso Nacional Bruto per capita.</p>' +
        '<div><strong>Procedimientos (Número):</strong> Número total de procedimientos necesarios para inscribir una sociedad. Un procedimiento se define como cualquier interacción de los fundadores de la sociedad con terceras partes externas (por ejemplo, organismos del gobierno, abogados, auditores o notarios).</div>' +
        '<div><strong>Tiempo (Días):</strong> Número total de días necesarios para inscribir una empresa. La medición captura la duración promedio que los abogados expertos en la constitución de sociedades estiman como necesaria para completar un procedimiento</div>' +
        '<div><strong>Calidad (%):</strong> Importe que el empresario necesita depositar en un banco o ante un notario antes de la inscripción y hasta tres meses después de la constitución de la sociedad. Se computa como un porcentaje del ingreso per cápita de la economía.</div>' +
        '<div><strong>Costo (MXN):</strong> El costo se registra como un porcentaje del ingreso per cápita de la economía. Incluye todas las tarifas oficiales y los honorarios por servicios legales o profesionales si la ley los exige.</div>'
      },
      graph2: {
        title: 'Registro de propiedades',
        description: '<p>Se refiere a la facilidad con la que las empresas pueden asegurar los derechos de propiedad. Esto incluye el número de pasos, el tiempo y el costo de registro de la propiedad.</p>' +
        '<div><strong>Procedimientos (Número):</strong> Número total de procedimientos requeridos para registrar propiedades. Un procedimiento se define como cualquier interacción del comprador o del vendedor, de sus agentes o de la propiedad con partes externas.</div>' +
        '<div><strong>Tiempo (Días):</strong> Número total de días requeridos para registrar propiedades. La medición captura la duración promedio que los abogados expertos en compraventa de bienes inmuebles, así como los notarios o los funcionarios del registro indiquen como necesarios para completar un procedimiento.</div>' +
        '<div><strong>Calidad (0 - 30):</strong> El índice de calidad de administración de tierras tiene cuatro dimensiones: la fiabilidad de la infraestructura, la transparencia de la información, la cobertura geográfica y la resolución de disputas sobre propiedades.</div>' +
        '<div><strong>Costo (% del valor de la propiedad):</strong> El costo se registra como un porcentaje del valor de la propiedad, que se presume equivalente a 50 veces el ingreso per cápita. Sólo se utilizan los costos oficiales que exige la ley.</div>'
      },
      graph3: {
        title: 'Manejo de permisos de construcción',
        description: '<p>Incluye los procedimientos, tiempo y costo para construir un almacén, incluyendo la obtención de licencias y permisos, completar las notificaciones e inspecciones requeridas, y la obtención de conexiones a servicios públicos.</p>' +
        '<div><strong>Procedimientos (Número):</strong> Número total de procedimientos necesarios para construir un almacén. Un procedimiento es cualquier interacción de los empleados o gerentes de la empresa con terceras partes.</div>' +
        '<div><strong>Tiempo (Días):</strong> Número total de días necesarios para construir un almacén. La medición captura la duración promedio que los expertos locales estiman necesaria para completar un procedimiento en la práctica.</div>' +
        '<div><strong>Calidad (0 - 15):</strong> El índice de control de calidad de la construcción se basa en otros seis índices: los índices de calidad de las normas de construcción, control de calidad antes de la construcción, control de calidad durante la construcción, control de calidad después de la construcción, regímenes de responsabilidad y seguros, y certificaciones profesionales.</div>' +
        '<div><strong>Costo (MXN):</strong> El costo se calcula como un porcentaje del ingreso per cápita de la economía. Sólo se registran los costos oficiales.</div>'
      },
      graph4: {
        title: 'Cumplimiento de contratos',
        description: '<p>Mide la facilidad para hacer cumplir contratos comerciales en CDMX. Se determina haciendo seguimiento a la evolución de una disputa en el pago y estableciendo el tiempo, costo y el número de procedimientos que se requieren desde el momento en que se establece una demanda legal hasta el momento del pago final.</p>' +
        '<div><strong>Procedimientos (Número):</strong> El número de procedimientos que se requieren en promedio para conseguir el cumplimiento de un contrato. La lista de trámites de cada economía muestra el orden cronológico de una disputa commercial ante el tribunal competente.</div>' +
        '<div><strong>Tiempo (Días):</strong> Tiempo para resolver una disputa, contado desde el momento en que el demandante decide presentar la demanda en el juzgado hasta el momento del pago. Incluye los días en que tiene lugar el juicio y también los períodos de espera entre las diferentes fases.</div>' +
        '<div><strong>Calidad (0 - 18):</strong> El índice de calidad de los procesos judiciales evalúa si cada una de las economías que cubre el proyecto Doing Business ha adoptado una serie de buenas prácticas en su sistema judicial en cuatro diferentes areas: estructura de los tribunales y procedimientos judiciales, administración de causas, automatización de los tribunales y resolución alternativa de disputas.</div>' +
        '<div><strong>Costo (%):</strong> Costos judiciales y honorarios de un abogado (si se exige comparecer con abogado o son necesarios en la práctica) expresados como un porcentaje del importe en la demanda. </div>'
      }
    };

    $scope.animationsEnabled = true;
    $scope.open = function (indicator, size) {
      var modalInstance = $uibModal.open({
       animation: $scope.animationsEnabled,
       templateUrl: 'information-modal.html',
       controller: 'ModalCtrl',
       size: size || 'sm',
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

    businessDataService.getSubnationalRankData().then(function (response) {
      var data = response.data;
      $scope.ui.indicator1.firstTitle = data['Apertura de una empresa'];
      $scope.ui.indicator1.secondTitle = data['Registro de propiedades'];
      $scope.ui.indicator1.thirdTitle = data['Manejo de permisos de construccion'];
      $scope.ui.indicator1.fourthTitle = data['Cumplimiento de contratos'];
      businessDataService.getSubnationalRankGraph(data);
      $rootScope.loading = false;
    }).catch(function (err) {
      console.log(err);
    });

    $scope.selectedIndicator = 'Todos';
    $scope.selectedIndicator3 = 'Apertura de una empresa';
    $scope.indicator4all = true;

    $scope.selectIndicator4All = function() {
      $scope.selectedIndicator = 'Todos';
      $scope.indicator4all = true;
      $scope.updateIndicator4();
    };

    $scope.selectIndicator4 = function(indicator) {
      $scope.selectedIndicator = indicator;
      $scope.selectedIndicator3 = indicator;
      $scope.indicator4all = false;
      $scope.updateIndicator3();
      $scope.selectIndicator4Indicator(indicator);
    };

    $scope.updateIndicator3 = function() {
      var indicator = -1;
      if ($scope.selectedIndicator3.charAt(0) == 'A') {
        indicator = 1;
      } else if ($scope.selectedIndicator3.charAt(0) == 'M') {
        indicator = 3;
      } else if ($scope.selectedIndicator3.charAt(0) == 'R') {
        indicator = 2;
      } else if ($scope.selectedIndicator3.charAt(0) == 'C') {
        indicator = 4;
      }
      businessDataService.getCurrentQualificationData(indicator).then(function (response) {
        var data = response.data;
        businessDataService.getCurrentQualificationGraph(data.radarData, $scope.selectedIndicator3, data.qualification);
      });
    };

    $scope.indicator4Indicator = null;
    $scope.indicator4Entity = "Todos";
    $scope.indicator4Gcdmx = null;
    $scope.indicator4Indicators = [];
    $scope.indicator4Entities = [];
    businessDataService.getDoingBusinessGoalsLists().then(function (response) {
      var data = response.data;
      $scope.indicator4Indicators = data.indicators;
      $scope.indicator4Entities = data.inCharge;
    });

    $scope.selectIndicator4Indicator = function(indicator, event) {
      $scope.indicator4Indicator = indicator;
      if (event != null) {
        event.stopPropagation();
      }
      $scope.updateIndicator4();
    }

    $scope.selectIndicator4Entity = function(entity, event) {
      $scope.indicator4Entity = entity;
      if (event != null) {
        event.stopPropagation();
      }
      $scope.updateIndicator4();
    }

    $scope.updateIndicator4 = function() {
      businessDataService.getDoingBusinessGoals($scope.indicator4Indicator, $scope.indicator4Entity, $scope.indicator4Gcdmx).then(function (response) {
        var data = response.data;
        $scope.indicator4data = data;
      })
    };

    $scope.updateIndicator3();
    $scope.updateIndicator4();

  });
