'use strict';
/**
 * @function openDataService
 * Este servicio retorna un objeto con un metodo para realizar llamada REST al back-end y grafico utilizando la libreria
 * GoogleCharts
 * @returns {Object}
 */
angular.module('cdmxIndicatorsApp').
  service('openDataService', function ($http) {

  return {
    getOfferDemandOpenData: getOfferDemandOpenData,
    getOfferDemandOpenDataGraph: getOfferDemandOpenDataGraph
  };

  function getOfferDemandOpenData () {
    return $http.get('/api/results/get/openData/demandOffer/');
  }

  function getOfferDemandOpenDataGraph (data, rootScope) {

    google.charts.setOnLoadCallback(function createDualYAxisLinearChart() {
      // data = formatOfferDemandLinearData(data);
      var graphContainerEl = angular.element('div.offer-demand-opendata');
      var graphContainerDOMEl = graphContainerEl[0];

      var graphData = new google.visualization.DataTable();
      graphData.addColumn('string', 'Tiempo');
      graphData.addColumn('number', 'Evolucion oferta de datos abiertos');
      graphData.addColumn('number', 'Evolucion demanda de datos abiertos');

      graphData.addRows(data);

      var chartOptions = {
        title: '',
        legend: { position: 'none' },
        width: graphContainerEl.width(),
        height: 270,
        lineWidth: 4,
        series: {
          0: {color: '#FF149B', axis: 'Acumulado oferta'},
          1: {color: '#C3C3C3', axis: 'Acumulado demanda'}
        },
        axes: {
          'Acumulado oferta': {label: 'Acumulado oferta'},
          'Acumulado demanda': {label: 'Acumulado demanda'}
        }
      };

      var linearChart = new google.charts.Line(graphContainerDOMEl);
      linearChart.draw(graphData, chartOptions);
    });
  }

});
