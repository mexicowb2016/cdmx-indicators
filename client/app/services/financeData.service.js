angular.module('cdmxIndicatorsApp').
  service('financeDataService', function ($http, $filter) {
    return {
      getAllTotalSpentData: getAllTotalSpentsData,
      getExecutedSpentsByDepartmentFunctionData: getExecutedSpentsByDepartmentFunctionData,
      getExecutedSpentsByDepartmentFunctionGraph: getExecutedSpentsByDepartmentFunctionGraph,
      getExecutedSpentsByDependencyData: getExecutedSpentsByDependencyData,
      getExecutedSpentsByDependencyGraph: getExecutedSpentsByDependencyGraph,
      getTop3CapitalSpentsByDependencyData: getTop3CapitalSpentsByDependencyData,
      getTop3CapitalSpentsByInstActData: getTop3CapitalSpentsByInstActData,
      getTotalSpentData: getTotalSpentData,
      getTotalSpentGraph: getTotalSpentGraph
    };

    function getAllTotalSpentsData() {
      var url = '/api/spents/get/allTotalSpents/';
      return $http.get(url);
    }

    function getExecutedSpentsByDepartmentFunctionData () {
      var url = '/api/spents/get/executedSpents/function/';
      return $http.get(url);
    }

    function getExecutedSpentsByDepartmentFunctionGraph (data) {
      data = formatMultiBarData(data);
      console.log(data);
      createMultiHorizontalBarGraph(data, 'executed-spent-function-graph');
    }

    function getExecutedSpentsByDependencyData () {
      var url = '/api/spents/get/executedSpents/dependency/';
      return $http.get(url);
    }

    function getExecutedSpentsByDependencyGraph (data) {
      data = formatMultiBarData(data);
      console.log(data);
      createMultiBarGraph(data, 'executed-spent-dependency-graph');
    }

    function getTop3CapitalSpentsByDependencyData() {
      var url = '/api/spents/get/top3CapitalSpents/dependency';
      return $http.get(url, {cache:true});
    }

    function getTop3CapitalSpentsByInstActData() {
      var url = '/api/spents/get/top3CapitalSpents/institutionalActivity';
      return $http.get(url, {cache:true});
    }

    function getTotalSpentData(spentType) {
      var baseUrl = '/api/spents/get/totalSpents/';
      var url = baseUrl + spentType;
      return $http.get(url, {cache: true});
    }

    function getTotalSpentGraph(scope, returnedData, spentType) {
      var data = returnedData;
      var mainGraphDivCls;
      var dataArr = [];
      if (spentType) {
        dataArr[0] = data.originalTotalSpent / 10e5;
        dataArr[1] = data.modifiedTotalSpent / 10e5;
        dataArr[2] = data.executedTotalSpent / 10e5;
        if (spentType == 2) {
          scope.ui.executedCapitalTotalSpentPercentage = data.executedTotalSpentPercentage;
          mainGraphDivCls = 'first-indicator-graph';
        } else {
          scope.ui.executedNormalTotalSpentPercentage = data.executedTotalSpentPercentage;
          mainGraphDivCls = 'second-indicator-graph';
        }
        createSingleHorizontalBarGraph(dataArr, mainGraphDivCls);
      } else {
        dataArr[0] = data.originalCapitalSpentSum / 10e5;
        dataArr[1] = data.modifiedCapitalSpentSum / 10e5;
        dataArr[2] = data.executedCapitalSpentSum / 10e5;
        scope.ui.executedCapitalTotalSpentPercentage = data.executedCapitalTotalSpentPercentage;
        mainGraphDivCls = 'first-indicator-graph';
        createSingleHorizontalBarGraph(dataArr, mainGraphDivCls);

        dataArr[0] = data.originalNormalSpentSum / 10e5;
        dataArr[1] = data.modifiedNormalSpentSum / 10e5;
        dataArr[2] = data.executedNormalSpentSum / 10e5;
        scope.ui.executedNormalTotalSpentPercentage = data.executedNormalTotalSpentPercentage;
        mainGraphDivCls = 'second-indicator-graph';
        createSingleHorizontalBarGraph(dataArr, mainGraphDivCls);
      }

    }

    //Graph Utility functions
    function createMultiBarGraph(data, elementContainerCls) {
      nv.addGraph(function() {
        var chart = nv.models.multiBarChart()
          .color(['#FF149B','#F1BDCE']) //colors for every barChart
          .showControls(false)
          .staggerLabels(true)
          .showLegend(false);

        chart.xAxis
          .tickFormat(function (d){return d});

        chart.yAxis
          .tickValues([0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100])
          .tickFormat(function (d){ return d + '%'});

        chart.forceY([0, 100]);

        if (data.length > 10) {
          // chart.rotateLabels(-90);
          // chart.xAxis.ticks(5);
          chart.groupSpacing(0.1);
          chart.wrapLabels(true);
        }

        d3.select('.' + elementContainerCls + ' svg')
          .datum(data)
          .call(chart);

        nv.utils.windowResize(chart.update);

        return chart;
      });
    }

    function createMultiHorizontalBarGraph(data, elementContainerCls) {
      nv.addGraph(function() {
        var chart = nv.models.multiBarHorizontalChart()
          // .x(function(d) { return d.label })
          // .y(function(d) { return d.value })
          .color(['#FF149B','#F1BDCE']) //colors for every barChart
          .showControls(false)
          .margin({"left": 200})
          .showLegend(false);

        chart.xAxis
          .tickFormat(function (d){return d});

        chart.yAxis
          .tickValues([0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100])
          .tickFormat(function (d){ return d + '%'});

        chart.forceY([0, 100]);


        if (data.length > 10) {
          // chart.rotateLabels(-90);
          // chart.xAxis.ticks(5);
          chart.groupSpacing(0.1);
        }

        d3.select('.' + elementContainerCls + ' svg')
          .datum(data)
          .call(chart);

        nv.utils.windowResize(chart.update);

        return chart;
      });
    }

    function createSingleHorizontalBarGraph(dataArr, mainContainerSelector) {
      var x;
      var mainContainer;
      var maxBarElementWidth = angular.element('.'+mainContainerSelector).width();

      x = d3.scale.linear()
        .domain([0, d3.max(dataArr)])
        .range([0, maxBarElementWidth]);

      mainContainer = d3.select('.' + mainContainerSelector);

      var originalCurrency = $filter('currency')(dataArr[0], '', 0);
      var modifiedCurrency = $filter('currency')(dataArr[1], '', 0);
      var executedCurrency = $filter('currency')(dataArr[2], '', 0);

      mainContainer
        .select('div.original-bar-graph')
        .style('width', x(dataArr[0]) + 'px')
        .text(function(d) { return originalCurrency + ' mdp'; });

      mainContainer
        .select('div.modified-bar-graph')
        .style('width', x(dataArr[1]) + 'px')
        .text(function(d) { return modifiedCurrency + ' mdp'; });

      mainContainer
        .select('div.executed-bar-graph')
        .style('width', x(dataArr[2]) + 'px')
        .text(function(d) { return executedCurrency + ' mdp'; });
    }

    function formatMultiBarData (data) {
      var key;
      var result = [];
      for (key in data) {
        if (data.hasOwnProperty(key)) {
          result.push({
            "key": "Gasto Corriente",
            "values": [{x:key, y:data[key].normalSpentExecuted}]
          }, {
            "key": "Gasto Capital",
            "values": [{x:key, y:data[key].capitalSpentExecuted}]
          })
        }
      }
      return result;
    }



});
