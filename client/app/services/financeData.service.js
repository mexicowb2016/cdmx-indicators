angular.module('cdmxIndicatorsApp').
  service('financeDataService', function ($http, $filter, $timeout) {
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
      var url = '/api/results/get/totalAllSpents/';
      return $http.get(url);
    }

    function getExecutedSpentsByDepartmentFunctionData (sort) {
      var url = '/api/results/get/executedSpents/function/';
      return $http({
        url: url,
        method: 'GET',
        params: {
          sort: sort
        }
      });
    }

    function getExecutedSpentsByDepartmentFunctionGraph (data) {
      data = formatMultiBarDataIndicator5(data);
      createMultiHorizontalBarGraph(data, 'indicator5div');
    }

    function getExecutedSpentsByDependencyData (favorite, dependency, sort) {
      dependency = dependency == 'dependencies' ? 1 : 0;
      var url = '/api/results/get/executedSpents/dependency/';
      return $http({
        url: url,
        method: 'GET',
        params: {
          favorite: favorite,
          dependency: dependency,
          sort: sort
        }
      });
    }

    function getExecutedSpentsByDependencyGraph (data) {
      data = formatMultiBarDataIndicator4(data);
      console.log(data);
      createMultiBarGraph(data, 'indicator4div', true);
    }

    function getTop3CapitalSpentsByDependencyData() {
      var url = '/api/results/get/top3CapitalSpents/dependency';
      return $http.get(url, {cache:true});
    }

    function getTop3CapitalSpentsByInstActData() {
      var url = '/api/results/get/top3CapitalSpents/institutionalActivity';
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
    function createMultiBarGraph(data, elementContainerCls, calculateHeight) {
      google.charts.setOnLoadCallback(function createGroupedBy4MultiBarChart () {
        var containerGraphEl = angular.element('#' + elementContainerCls);
        var containerGraphDOMEl = containerGraphEl[0];
        var height = '80%';
        if (calculateHeight) {
          var elementHeight = (data.length * 30) + 'px';
          document.getElementById(elementContainerCls).style.height = elementHeight;
        }
        var dataGraph = google.visualization.arrayToDataTable(data);

        var formatter = new google.visualization.NumberFormat({
            fractionDigits: 0,
            suffix: ' Miles de Pesos Mexicanos (MXN)'
        });
        formatter.format(dataGraph, 1);
        formatter.format(dataGraph, 2);

        var options = {
          title: '',
          colors: ['#FF0E98','#C1C1C1'],
          chartArea: {width: '60%', height: height, left: '50%', top: 10},
          fontSize: 12,
          legend: "none",
          hAxis: {format: "#' Mil (MXN)'"},
          bars: "horizontal"
        };

        var chart = new google.visualization.BarChart(containerGraphDOMEl);

        $timeout(function() {
          chart.draw(dataGraph, options);
        }, 1000);
      });
      // nv.addGraph(function() {
      //   var chart = nv.models.multiBarHorizontalChart()
      //     .color(['#FF0E98','#C1C1C1']) //colors for every barChart
      //     .showControls(false)
      //     // .staggerLabels(true)
      //     .margin({"left": 620})
      //     .showLegend(false);
      //
      //   chart.yAxis
      //     .tickValues([0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100])
      //     .tickFormat(function (d){ return d + '%'; });
      //
      //   chart.xAxis
      //     .tickFormat(function (d){ return d; });
      //
      //   chart.forceY([0, 100]);
      //
      //   // if (data.length > 10) {
      //   //   // chart.rotateLabels(-90);
      //   //   // chart.xAxis.ticks(5);
      //   //   chart.groupSpacing(0.1);
      //   //   chart.wrapLabels(true);
      //   // }
      //
      //   d3.select('.' + elementContainerCls + ' svg')
      //     .datum(data)
      //     .call(chart);
      //
      //   // d3.select('.' + elementContainerCls + ' svg').selectAll('g.nv-group').selectAll('rect').attr('width', 20);
      //
      //   nv.utils.windowResize(chart.update);
      //
      //   return chart;
      // });
    }

    function createMultiHorizontalBarGraph(data, elementContainerCls) {
      google.charts.setOnLoadCallback(function createGroupedBy4MultiBarChart () {
        var containerGraphEl = angular.element('#' + elementContainerCls);
        var containerGraphDOMEl = containerGraphEl[0];
        var dataGraph = google.visualization.arrayToDataTable(data);

        var formatter = new google.visualization.NumberFormat({
            fractionDigits: 0,
            suffix: ' (MXN)'
        });
        formatter.format(dataGraph, 1);

        var options = {
          title: '',
          colors: ['#FF149B'],
          chartArea: {width: '58%', height: '90%', left: '38%', top: 10},
          fontSize: 12,
          legend: "none",
          bars: "horizontal",
          hAxis: {title: "Pesos Mexicanos (MXN)"}
        };

        var chart = new google.visualization.BarChart(containerGraphDOMEl);

        chart.draw(dataGraph, options);
      });
      // nv.addGraph(function() {
      //   var chart = nv.models.multiBarHorizontalChart()
      //     // .x(function(d) { return d.label })
      //     // .y(function(d) { return d.value })
      //     .color(['#FF149B']) //colors for every barChart
      //     .showControls(false)
      //     .margin({"left": 420})
      //     .showLegend(false);
      //
      //   format = d3.format("0,000");
      //
      //   chart.xAxis
      //     .tickFormat(function (d){return d});
      //
      //   chart.yAxis
      //     .tickFormat(function (d){ return format(d)});
      //
      //   // chart.forceY([0, 100]);
      //
      //   // chart.xRange([0, 800]);
      //   //
      //   // setTimeout(function() {
      //   //   d3.selectAll('.' + elementContainerCls + ' svg').selectAll('rect').attr("height", chart.xAxis.rangeBand() / 3);
      //   // }, 10);
      //
      //   if (data.length > 10) {
      //     chart.groupSpacing(0.1);
      //   }
      //
      //   d3.select('.' + elementContainerCls + ' svg')
      //     .datum(data)
      //     .call(chart);
      //
      //   nv.utils.windowResize(chart.update);
      //
      //   return chart;
      // });
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

    function formatMultiBarDataIndicator4(data) {
      var result = [['Centro', 'Gasto Corriente', 'Gasto Capital']];
      for (var i = 0; i < data.length; i++) {
        var key = data[i].center;
        result.push([key, data[i].currentSpent, data[i].capitalSpent])
      }
      return result;
    }

    function formatMultiBarDataIndicator5(data) {
      var result = [['Funcion', 'Gasto']];
      for (var i = 0; i < data.length; i++) {
        var key = data[i].description;
        result.push([key, data[i].executed]);
      }
      return result;
    }

});
