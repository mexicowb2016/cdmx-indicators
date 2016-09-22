'use strict';
/**
 * @function MainCtrl
 * Este es el controlador del modulo de finanzas, el cual realiza los siguientes procesos:
 * - Establece y ejecuta el evento para mostrar modales de informacion de cada grafico(Al momento de hacer click en los
 * iconos de informacion de cada panel)
 * - Inyecta y ejecuta metodos del servicio financeDataService para la obtencion de datos, configuracion y realizado de
 * graficos (Bar charts).
 * - Inyecta servicios genericos de AngularJS para guardar/usar propiedades/metodos declarados en este controlador.
 * - Inyecta servicio de Angular-Bootstrap para el uso de su componente web tipo Modal.
 *
 * @param {Object} $rootScope - Objeto global que utiliza AngularJS para guardar/usar propiedades/metodos globales en la aplicacion.
 * @param {Object} $scope - Objeto privado que se establece para guardar/usar propiedades/metodos en el controlador
 * @param {Object} $uibModal - Servicio generico que la libreria Angular-Bootstrap establece para la configuracion/uso de propiedades/metodos
 * de un componente web tipo Modal.
 * @param {Object} financeDataService - Servicio generico que utiliza este controlador para invocar sus metodos de obtencion de datos
 * y dibujar graficos de dichos datos.
 */
angular.module('cdmxIndicatorsApp')
  .controller('MainCtrl', function ($rootScope, $scope, $uibModal, financeDataService, SweetAlert) {
    /**
     * @type {boolean} $rootScope.loading - Variable que se guarda en el $rootScope y enmascara la pagina de finanzas utilizando el servicio ng-show
     * en un componente web personalido llamado "loader".
     **/
    $rootScope.loading = true;
    /**
     * @type {string} $scope.selectedFinance - Variable que se ejecuta en el servicio ng-class(declarado en el navbar HTML template) cuando
     * el tab-button llamado "Finanzas" esta "activado" o "seleccionado", este establece la clase CSS "active-menu" en dicho tab-button.
     */
    $scope.selectedFinance = "active-menu";
    /**
     * @type {Object} $scope.ui - Variable que guarda/utiliza propiedades que se involucran con el HTML de la pagina de finanzas.
     */
    $scope.ui = {};
    /**
     * @type {string} $scope.ui.top3CapitalSpentModel - Variable que indica que boton del tercer indicador de finanzas esta "activado" por defecto
     * utilizando los servicios ng-model para el get/set del valor de la variable, ng-class para establecer el CSS "active" en dicho boton y
     * uib-btn-radio de Angular-Bootstrap para guardar el valor en el servicio ng-model si este boton ha sido "clickeado"
     */
    $scope.ui.top3CapitalSpentModel = 'Dependency';
    /**
     * @type {string} $scope.ui.firstCapitalSpent - Variable que se utiliza para mostrar el primer gasto capital por dependencia en el tercer indicador.
     */
    $scope.ui.firstCapitalSpent = '';
    /**
     * @type {string} $scope.ui.secondCapitalSpent - Variable que se utiliza para mostrar el segundo gasto capital por dependencia en el tercer indicador.
     */
    $scope.ui.secondCapitalSpent = '';
    /**
     * @type {string} $scope.ui.thirdCapitalSpent - Variable que se utiliza para mostrar el tercer gasto capital por dependencia en el tercer indicador.
     */
    $scope.ui.thirdCapitalSpent = '';
    /**
     * @type {Object} $scope.myModalContent - Objeto que se utiliza para guardar los contenidos (titulo y descripcion) de cada modal. Este se utiliza como parametro
     * en el metodo "open" del servicio de $uibModal para mostrar un modal con su respectivo contenido al momento de hacer click en el icono de informacion
     */
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
      indicator6:{
        title:'Ejecución del Gasto por Función, Tipo de Unidad Responsable y Unidad Responsable',
        description:'Presenta la ejecución del gasto por función (primer nivel), tipos de unidades responsables relacionados con cada función (segundo nivel) y unidades responsables relacionadas con cada función (tercer nivel). Esta gráfica permite comparar cantidades por cada elemento. Entre más grande sea la burbuja, más grande es el presupuesto ejercido.'
      }
    };
    /**
     * @type {boolean} $scope.indicator4dependency - Variable que se utiliza en el servicio de ng-class para indicar que boton ha sido "activado",
     * en el servicio ng-model para el get/set de su valor, uib-btn-radio de Angular-Bootstrap para guardar el valor en el servicio ng-model si este boton ha sido "clickeado" y
     * para establecerlo como parametro en el metodo getExecutedSpentsByDependencyData del servicio financeDataService para la obtencion de los datos del cuarto indicador de finanzas.
     */
    $scope.indicator4dependency = 'preferred';
    /**
     * @type {string} $scope.indicator4sort - Variable que se utiliza en el servicio de ng-class para indicar que boton ha sido "activado",
     * en el servicio ng-model para el get/set de su valor, uib-btn-radio de Angular-Bootstrap para guardar el valor en el servicio ng-model si este boton ha sido "clickeado" y
     * para establecerlo como parametro en el metodo getExecutedSpentsByDependencyData del servicio financeDataService para la obtencion de los datos del cuarto indicador de finanzas.
     */
    $scope.indicator4sort = 'current';
    /**
     * @type {string} $scope.indicator5sort - Variable que se utiliza en el servicio de ng-class para indicar que boton ha sido "activado",
     * en el servicio ng-model para el get/set de su valor, uib-btn-radio de Angular-Bootstrap para guardar el valor en el servicio ng-model si este boton ha sido "clickeado" y
     * para establecerlo como parametro en el metodo getExecutedSpentsByDepartmentFunctionData del servicio financeDataService para la obtencion de los datos del quinto indicador de finanzas.
     */
    $scope.indicator5sort = 'name';
    /**
     * @type {boolean} $scope.animationsEnabled - Variable que establece e indica si un modal presentara animacion al momento de ser abierto/cerrado al momento de ser enviado como parametro
     * en el metodo "open" del servicio $uibModal.
     */
    $scope.animationsEnabled = true;
    /**
     * @function $scope.clearTop3Data
     * Metodo que borra los datos de cada variable que se muestra como resultado en el tercer indicador.
     */
    $scope.clearTop3Data = function () {
      $scope.ui.firstCapitalSpent = '';
      $scope.ui.secondCapitalSpent = '';
      $scope.ui.thirdCapitalSpent = '';
    };
    /**
     * @event open - Este metodo se invoca al momento de hacer click en el icono de informacion de un panel. Se instancia al componente $uibModal de Angular-Bootstrap, el cual
     * invoca a su controlador, su template HTML e inyecta en su controlador como parametro el objeto "indicator" el cual contiene el contenido (en texto) del modal.
     * @param {Object} indicator - Este objeto contiene los contenidos del modal guardados en un objecto con propiedades title y description, se lo establece como parametro al momento de invocar este metodo
     * en el servicio ng-click (declarado en el HTML), el cual manda una propiedad del objeto myModalContent.
     */
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

    /**
     * @function financeDataService.getAllTotalSpentData
     * Metodo que se invoca en el servicio financeDataService, el cual realiza una llamada REST al back-end (lado servidor) para la obtencion de los datos del total de las
     * ventas clasificadas por tipo de gasto capital y corriente. Este metodo retorna un objecto tipo {Promise} el cual indica si la llamada REST ha sido
     * exitosa o no (utilizando los metodos "then" y "catch"). Si esta llamada ha sido exitosa, mandara los datos retonardos de la llamada REST como parametro al metodo getTotalSpentGraph
     * del mismo servicio para que este realice la grafica de los datos del primer y segundo indicador. Tambien establece la variable "loading" como false para que se desenmascare la pagina de finanzas
     * a traves del servicio ng-show. De lo contrario, si la llamada ha sido erronea, entonces solo mostrara en consola del navegador, el error que sucedio al momento de finalizar la llamada REST.
     * @return {Promise} - El resultado de la llamada REST.
     */
    financeDataService.getAllTotalSpentData().then(function (response) {
      var data = response.data;
      financeDataService.getTotalSpentGraph($scope, data);
      $rootScope.loading = false;
    }).catch(function (err) {
      console.log(err);
    });

    /**
     * @function $scope.getTop3CapitalSpentsByDependency
     * Metodo que se invoca al instanciar este controlador y al momento de hacer click en los botones de filtracion del tercer indicador.
     * Este metodo invoca el borrado de los datos de las variables: $scope.ui.firstCapitalSpent, $scope.ui.secondCapitalSpent, $scope.ui.thirdCapitalSpent.
     * Ademas invoca al metodo getTop3CapitalSpentsByDependencyData del servicio financeDataService, el cual realiza una llamada REST al back-end (lado servidor) para la obtencion de los datos del top 3 de gastos capitales por dependencia.
     *
     * El metodo getTop3CapitalSpentsByDependencyData retorna un objecto tipo {Promise} el cual indica si la llamada REST ha sido exitosa o no (utilizando los metodos "then" y "catch").
     * Si esta llamada ha sido exitosa, mandara los datos retonardos de la llamada REST, en tres variables ($scope.ui.firstCapitalSpent, $scope.ui.secondCapitalSpent, $scope.ui.thirdCapitalSpent) para mostrarlos
     * en el HTML.
     * De lo contrario, si la llamada ha sido erronea, entonces solo mostrara en consola del navegador, el error que sucedio al momento de finalizar la llamada REST.
     */
    $scope.getTop3CapitalSpentsByDependency = function () {
      $scope.clearTop3Data();
      financeDataService.getTop3CapitalSpentsByDependencyData().then(function (response) {
        var data = response.data;
        $scope.ui.firstCapitalSpent = data.first.name.toUpperCase();
        $scope.ui.secondCapitalSpent = data.second.name.toUpperCase();
        $scope.ui.thirdCapitalSpent = data.third.name.toUpperCase();
      }).catch(function (err) {
        console.log(err);
      });
    };
    /**
     * @function $scope.getTop3CapitalSpentsByInstAct
     * Metodo que se invoca al instanciar este controlador y al momento de hacer click en los botones de filtracion del tercer indicador.
     * Este metodo invoca el borrado de los datos de las variables: $scope.ui.firstCapitalSpent, $scope.ui.secondCapitalSpent, $scope.ui.thirdCapitalSpent.
     * Ademas invoca al metodo getTop3CapitalSpentsByInstActData del servicio financeDataService, el cual realiza una llamada REST al back-end (lado servidor) para la obtencion de los datos del top 3 de gastos capitales por actividad institucional.
     *
     * El metodo getTop3CapitalSpentsByInstActData retorna un objecto tipo {Promise} el cual indica si la llamada REST ha sido exitosa o no (utilizando los metodos "then" y "catch").
     * Si esta llamada ha sido exitosa, mandara los datos retonardos de la llamada REST, en tres variables ($scope.ui.firstCapitalSpent, $scope.ui.secondCapitalSpent, $scope.ui.thirdCapitalSpent) para mostrarlos
     * en el HTML.
     * De lo contrario, si la llamada ha sido erronea, entonces solo mostrara en consola del navegador, el error que sucedio al momento de finalizar la llamada REST.
     */
    $scope.getTop3CapitalSpentsByInstAct = function () {
      $scope.clearTop3Data();
      financeDataService.getTop3CapitalSpentsByInstActData().then(function (response) {
        var data = response.data;
        $scope.ui.firstCapitalSpent = data.first.name;
        $scope.ui.secondCapitalSpent = data.second.name;
        $scope.ui.thirdCapitalSpent = data.third.name;
      }).catch(function (err) {
        console.log(err);
      });
    };
    /**
     * Invocar el metodo al momento de instanciar el controlador. Este cuenta con las variables que necesita por defecto ($scope.ui.firstCapitalSpent, $scope.ui.secondCapitalSpent, $scope.ui.thirdCapitalSpent).
     * establecidas en el inicio de este controlador.
     */
    $scope.getTop3CapitalSpentsByDependency();
    /**
     * @function $scope.updateIndicator4
     * Metodo que se invoca al instanciar este controlador y al momento de hacer click en los botones de filtracion del cuarto indicador. Este metodo invoca a un metodo en el servicio financeDataService llamado
     * getExecutedSpentsByDependencyData, el cual realiza una llamada REST al back-end (lado servidor) para la obtencion de los datos de los gastos ejercidos por dependencia, mandando como parametros las variables
     * favorite de tipo {Number}, indicator4dependency de tipo {string} y indicator4sort de tipo {string}.
     *
     * El metodo getExecutedSpentsByDependencyData retorna un objecto tipo {Promise} el cual indica si la llamada REST ha sido exitosa o no (utilizando los metodos "then" y "catch").
     * Si esta llamada ha sido exitosa, mandara los datos retonardos de la llamada REST como parametro al metodo getExecutedSpentsByDependencyGraph del mismo servicio para que este realice la grafica de los datos.
     * De lo contrario, si la llamada ha sido erronea, entonces solo mostrara en consola del navegador, el error que sucedio al momento de finalizar la llamada REST.
     */
    $scope.updateIndicator4 = function() {
      var favorite = $scope.indicator4dependency == 'preferred' ? 1 : 0;
      financeDataService.getExecutedSpentsByDependencyData(favorite, $scope.indicator4dependency, $scope.indicator4sort).then(function (response) {
        var data = response.data;
        financeDataService.getExecutedSpentsByDependencyGraph(data);
      }).catch(function (err) {
        console.log(err);
      });
    };
    /**
     * Invocar el metodo al momento de instanciar el controlador. Este cuenta con las variables que necesita por defecto ($scope.indicator4dependency, $scope.indicator4sort) establecidas
     * en el inicio de este controlador.
     */
    $scope.updateIndicator4();
    /**
     * @function $scope.updateIndicator5
     * Metodo que se invoca al instanciar este controlador y al momento de hacer click en los botones de filtracion del quinto indicador. Este metodo invoca a un metodo en el servicio financeDataService llamado
     * getExecutedSpentsByDepartmentFunctionData, el cual realiza una llamada REST al back-end (lado servidor) para la obtencion de los datos de los gastos ejercidos por funcion, mandando como parametro
     * a la variable indicator5sort de tipo {string}.
     *
     * El metodo getExecutedSpentsByDepartmentFunctionData retorna un objecto tipo {Promise} el cual indica si la llamada REST ha sido exitosa o no (utilizando los metodos "then" y "catch").
     * Si esta llamada ha sido exitosa, mandara los datos retonardos de la llamada REST como parametro al metodo getExecutedSpentsByDepartmentFunctionGraph del mismo servicio para que este realice la grafica de los datos.
     * De lo contrario, si la llamada ha sido erronea, entonces solo mostrara en consola del navegador, el error que sucedio al momento de finalizar la llamada REST.
     */
    $scope.updateIndicator5 = function() {
      financeDataService.getExecutedSpentsByDepartmentFunctionData($scope.indicator5sort).then(function (response) {
        var data = response.data;
        financeDataService.getExecutedSpentsByDepartmentFunctionGraph(data);
      }).catch(function (err) {
        console.log(err);
      });
    };
    /**
     * Invocar el metodo al momento de instanciar el controlador. Este cuenta con la variable que necesita por defecto ($scope.indicator5sort) establecida en el inicio de este controlador.
     */
    $scope.updateIndicator5();

    $scope.monthIndicator6 = 0;
    $scope.level0Indicator6 = null;
    $scope.level1Indicator6 = null;

    $scope.updateIndicator6 = function() {
      financeDataService.getExecutedSpentsBubbleData($scope.monthIndicator6, $scope.level0Indicator6, $scope.level1Indicator6).then(function(response) {
        var data = response.data;
        var level = 0;
        if ($scope.level0Indicator6 != null) {
          if ($scope.level1Indicator6 != null) {
            level = 2;
          } else {
            level = 1;
          }
        }
        financeDataService.getExecutedSpentsBubbleGraph(data, level, $scope);
      }).catch(function (err) {
        console.log(err);
      });
    };

    $scope.indicator6Label = null;

    $scope.addLevelIndicator6 = function(value, event) {
      if ($scope.level0Indicator6 == null) {
        $scope.level0Indicator6 = value;
        $scope.indicator6Label = $scope.level0Indicator6;
        $scope.updateIndicator6();
      } else if ($scope.level1Indicator6 == null) {
        $scope.level1Indicator6 = value;
        $scope.indicator6Label = $scope.level0Indicator6 + " - " + $scope.level1Indicator6;
        $scope.updateIndicator6();
      } else {
        SweetAlert.swal({
          title: "No hay información.",
          text: "Subir de nivel para visualizar la información.",
          type: "error",
          showCancelButton: false,
          timer: 3000,
          showConfirmButton: true
        });
      }
      event.stopPropagation();
    };

    $scope.removeLevelIndicator6 = function(value) {
      if ($scope.level1Indicator6 != null) {
        $scope.level1Indicator6 = null;
        $scope.indicator6Label = $scope.level0Indicator6;
        $scope.updateIndicator6();
      } else if ($scope.level0Indicator6 != null) {
        $scope.level0Indicator6 = null;
        $scope.indicator6Label = null;
        $scope.updateIndicator6();
      }
    };

    $scope.updateIndicator6();

  });
