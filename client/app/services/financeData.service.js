angular.module('cdmxIndicatorsApp').
  service('financeDataService', function ($http) {
    return {
      getTotalSpentGraph: getTotalSpentGraph,
      getTotalSpentData: getTotalSpentData
    };

    function getTotalSpentData(spentType) {
      return $http.get('/api/spents/getTotalSpents/'+spentType, {cache: true});
    }

    function getTotalSpentGraph(scope, returnedData, spentType) {
      var data = returnedData;
      var mainGraphDivCls;
      var dataArr = [];
      dataArr[0] = data.executedTotalSpent;
      dataArr[1] = data.modifiedTotalSpent;
      dataArr[2] = data.originalTotalSpent;
      scope.ui.executedTotalSpentPercentage = data.executedTotalSpentPercentage;
      if (spentType == 2) {
        mainGraphDivCls = 'first-indicator-graph';
      } else {
        mainGraphDivCls = 'second-indicator-graph';
      }
      var x = d3.scale.linear()
        .domain([0, d3.max(dataArr)])
        .range([0, 330]);

      d3.select('.' + mainGraphDivCls)
          .selectAll("div")
          .data(dataArr)
        .enter().append("div")
          .style("width", function(d) { return x(d) + "px"; })
          .text(function(d) { return d; });
    }
});
