/**
 * Created by joel on 24-08-16.
 */
angular.module('cdmxIndicatorsApp').
  service('genreDataService', function ($http) {
    return {
      getWomenPromotedRepresentationGraph: getWomenPromotedRepresentationGraph,
      getWomenQuantityRepresentationGraph: getWomenQuantityRepresentationGraph,
      getWomenRecruitmentRepresentationGraph: getWomenRecruitmentRepresentationGraph,
      getWomenPromotedRepresentationDataByJobClassification: getWomenPromotedRepresentationDataByJobClassification,
      getWomenQuantityRepresentationDataByJobClassification: getWomenQuantityRepresentationDataByJobClassification,
      getWomenRecruitmentRepresentationDataByJobClassification: getWomenRecruitmentRepresentationDataByJobClassification
    };

    function getWomenPromotedRepresentationGraph (data) {
      data = formatMultiBarData(data);
      createMultiBarGraph(data, 'women-promoted-percentage')
    }

    function getWomenQuantityRepresentationGraph (data) {
      data = formatMultiBarData(data);
      createMultiBarGraph(data, 'women-quantity-percentage')
    }

    function getWomenRecruitmentRepresentationGraph (data) {
      data = formatMultiBarData(data);
      createMultiBarGraph(data, 'women-recruitment-percentage')
    }

    function getWomenPromotedRepresentationDataByJobClassification() {
      return $http.get('/api/sectors/get/womenJobClassification/promotion/');
    }

    function getWomenQuantityRepresentationDataByJobClassification() {
      return $http.get('/api/sectors/get/womenJobClassification/quantity/');
    }

    function getWomenRecruitmentRepresentationDataByJobClassification() {
      return $http.get('/api/sectors/get/womenJobClassification/recruitment/');
    }


  //Utility functions

    function createMultiBarGraph (data, elementContainerCls) {
      nv.addGraph(function() {
        var chart = nv.models.multiBarChart()
          .color(['#FF149B']) //colors for every barChart
          .showControls(false)
          .staggerLabels(true)
          .margin({"bottom": 70})
          .showLegend(false);

        chart.yAxis
          .tickValues([0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100])
          .tickFormat(function (d){ return d + '%'});

        chart.xAxis
          .tickFormat(function (d){return d});

        chart.forceY([0, 100]);

        chart.wrapLabels(true);

        d3.select('.' + elementContainerCls + ' svg')
          .datum(data)
          .call(chart);

        nv.utils.windowResize(chart.update);

        return chart;
      });
    }

    function formatMultiBarData (data) {
      var key;
      var result = [];
      for (key in data) {
        if (data.hasOwnProperty(key)) {
          result.push({
            "key": key,
            "values": [{x:key, y:data[key].womenPercentage}]
          })
        }
      }
      return result;
    }


});
