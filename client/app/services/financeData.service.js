'use strict';
/**
 * @function financeDataService
 * Este servicio retorna un objeto con metodos para realizar llamadas REST al back-end y graficos utilizando las librerias
 * D3.js y GoogleCharts
 * @returns {Object}
 */
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
            suffix: '%'
        });
        formatter.format(dataGraph, 1);
        formatter.format(dataGraph, 2);

        var options = {
          title: '',
          colors: ['#FF0E98','#C1C1C1'],
          chartArea: {width: '60%', height: height, left: '50%', top: 10},
          fontSize: 12,
          legend: "none",
          hAxis: {format: "#'%'"},
          bars: "horizontal"
        };

        var chart = new google.visualization.BarChart(containerGraphDOMEl);

        chart.draw(dataGraph, options);
        var element = angular.element('#' + elementContainerCls + " svg g")[0];
        document.getElementById(elementContainerCls).style.height = (element.getBBox().height + 20) + 'px';
        var elementSvg = angular.element('#' + elementContainerCls + " svg")[0];
        elementSvg.setAttribute('height', element.getBBox().height + 20);
      });
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
