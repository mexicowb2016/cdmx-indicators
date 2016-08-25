/**
 * Created by joel on 24-08-16.
 */
angular.module('cdmxIndicatorsApp').
  service('genreDataService', function ($http) {
    var saveJobClassificationDataOrder = ['Mando Superior', 'Mando Medio', 'Tecnico Operativo de Confianza', 'Tecnico Operativo de Base', 'Haberes', 'Estabilidad Laboral'];

    return {
      getWomenPromotedRepresentationGraph: getWomenPromotedRepresentationGraph,
      getWomenQuantityRepresentationGraph: getWomenQuantityRepresentationGraph,
      getWomenRecruitmentRepresentationGraph: getWomenRecruitmentRepresentationGraph,
      getWomenSalaryGapRepresentationGraph: getWomenSalaryGapRepresentationGraph,
      getWomenPromotedRepresentationDataByJobClassification: getWomenPromotedRepresentationDataByJobClassification,
      getWomenQuantityRepresentationDataByJobClassification: getWomenQuantityRepresentationDataByJobClassification,
      getWomenRecruitmentRepresentationDataByJobClassification: getWomenRecruitmentRepresentationDataByJobClassification,
      getWomenSalaryGapDataByJobClassification: getWomenSalaryGapDataByJobClassification
    };

    function getWomenPromotedRepresentationGraph (data) {
      data = formatMultiBarSingleData(data);
      createMultiBarGraph(data, 'women-promoted-percentage', true)
    }

    function getWomenQuantityRepresentationGraph (data) {
      data = formatMultiBarSingleData(data);
      createMultiBarGraph(data, 'women-quantity-percentage', true)
    }

    function getWomenRecruitmentRepresentationGraph (data) {
      data = formatMultiBarSingleData(data);
      createMultiBarGraph(data, 'women-recruitment-percentage', true)
    }

    function getWomenSalaryGapRepresentationGraph (data) {
      data = formatMultiBarMultiData(data);
      createMultiBarGraph(data, 'women-salaryGap-percentage', false);
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

    function getWomenSalaryGapDataByJobClassification () {
      return $http.get('/api/sectors/get/womenJobClassification/salaryGap/');
    }


  //Utility functions

    function createMultiBarGraph (data, elementContainerCls, isSingleBar) {
      nv.addGraph(function() {
        var chart = nv.models.multiBarChart()
          .color(isSingleBar ? ['#FF149B'] : ['#FF0000','#9DC3E6', '#A5A5A5', '#F5B183']) //colors for every barChart
          .showControls(false)
          .staggerLabels(true)
          .margin({"bottom": 80})
          .showLegend(false);

        chart.yAxis
          .tickValues([0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100])
          .tickFormat(function (d){ return d + '%'});

        chart.xAxis
          .tickFormat(function (d){return d});
        var rangeData = isSingleBar ? [0, 100] : [0, 50];
        chart.forceY(rangeData);

        chart.wrapLabels(true);

        d3.select('.' + elementContainerCls + ' svg')
          .datum(data)
          .call(chart);

        nv.utils.windowResize(chart.update);

        return chart;
      });
    }

    function formatMultiBarMultiData (data) {
      var key;
      var result = [];
      for (var i = 0; i < saveJobClassificationDataOrder.length; i++) {
          for (key in data) {
            if (data.hasOwnProperty(key)) {
              if (key == saveJobClassificationDataOrder[i]) {
              result.push({
                "key": 'Brecha en remuneración bruta',
                "values": [{x: key, y: data[key].bruteSalaryGapPercentage == null ? 0 : data[key].bruteSalaryGapPercentage}]
              }, {
                "key": 'Brecha en salario base',
                "values": [{x: key, y: data[key].baseSalaryGapPercentage == null ? 0 : data[key].baseSalaryGapPercentage}]
              }, {
                "key": 'Brecha en tiempo extraordinario',
                "values": [{x: key, y: data[key].extraordinaryTimeGapPercentage == null ? 0 : data[key].extraordinaryTimeGapPercentage}]
              }, {
                "key": 'Brecha en otras prestaciones',
                "values": [{x: key, y: data[key].otherTimeGapPercentage == null ? 0 : data[key].otherTimeGapPercentage}]
              });
              break;
            }
          }
        }
      }
      return result;
    }

    function formatMultiBarSingleData (data) {
      var key;
      var result = [];
      for (var i = 0; i < saveJobClassificationDataOrder.length; i++) {
        for (key in data) {
          if (data.hasOwnProperty(key)) {
            if (key == saveJobClassificationDataOrder[i]) {
              result.push({
                "key": key,
                "values": [{x:key, y:data[key].womenPercentage}]
              });
              break;
            }
          }
        }
      }
      return result;
    }


});
