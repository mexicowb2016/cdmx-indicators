angular.module('cdmxIndicatorsApp').
  service('financeDataService', function ($http, $filter) {
    return {
      getAllTotalSpentData: getAllTotalSpentsData,
      getTop3CapitalSpentsByDependencyData: getTop3CapitalSpentsByDependencyData,
      getTop3CapitalSpentsByInstActData: getTop3CapitalSpentsByInstActData,
      getTotalSpentData: getTotalSpentData,
      getTotalSpentGraph: getTotalSpentGraph
    };

    function getAllTotalSpentsData() {
      var url = '/api/spents/get/allTotalSpents/';
      return $http.get(url);
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
        dataArr[0] = data.originalTotalSpent;
        dataArr[1] = data.modifiedTotalSpent;
        dataArr[2] = data.executedTotalSpent;
        if (spentType == 2) {
          scope.ui.executedCapitalTotalSpentPercentage = data.executedTotalSpentPercentage;
          mainGraphDivCls = 'first-indicator-graph';
        } else {
          scope.ui.executedNormalTotalSpentPercentage = data.executedTotalSpentPercentage;
          mainGraphDivCls = 'second-indicator-graph';
        }
        createSingleHorizontalBarGraph(dataArr, mainGraphDivCls);
      } else {
        dataArr[0] = data.originalCapitalSpentSum;
        dataArr[1] = data.modifiedCapitalSpentSum;
        dataArr[2] = data.executedCapitalSpentSum;
        scope.ui.executedCapitalTotalSpentPercentage = data.executedCapitalTotalSpentPercentage;
        mainGraphDivCls = 'first-indicator-graph';
        createSingleHorizontalBarGraph(dataArr, mainGraphDivCls);

        dataArr[0] = data.originalNormalSpentSum;
        dataArr[1] = data.modifiedNormalSpentSum;
        dataArr[2] = data.executedNormalSpentSum;
        scope.ui.executedNormalTotalSpentPercentage = data.executedNormalTotalSpentPercentage;
        mainGraphDivCls = 'second-indicator-graph';
        createSingleHorizontalBarGraph(dataArr, mainGraphDivCls);
      }

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
});
