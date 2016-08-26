/**
 * Created by joel on 25-08-16.
 */
'use strict';
angular.module('cdmxIndicatorsApp').
  service('openDataService', function ($http) {

  return {
    getOfferDemandOpenData: getOfferDemandOpenData,
    getOfferDemandOpenDataGraph: getOfferDemandOpenDataGraph
  };

  function getOfferDemandOpenData () {
    return $http.get('/api/results/get/openData/demandOffer/');
  }

  function getOfferDemandOpenDataGraph (data) {

    nv.addGraph(function() {
      var chart = nv.models.lineChart()
          .showLegend(false)
          .margin({"right": 25})
          .useInteractiveGuideline(true);

      data = formatOfferDemandLinearData(data);

      chart.xAxis
        .axisLabel('Tiempo')
        .tickFormat(function (d) {
          return d3.time.format('%b-%Y')(new Date(d));
        });

      chart.yAxis
        .axisLabel('Acumulacion')
        .tickFormat(d3.format('d'));

      d3.select('.offer-demand-opendata svg')
        .datum(data)
        .transition().duration(500)
        .call(chart);

      nv.utils.windowResize(chart.update);

      return chart;
    });
  }

  function formatOfferDemandLinearData (data) {
    var currentLine;
    for (var i = 0; i < data.length; i++) {
      currentLine = data[i].values;
      for (var j = 0; j < currentLine.length; j++) {
        currentLine[j].x = new Date(currentLine[j].x);
      }
    }
    return data;
  }
});
