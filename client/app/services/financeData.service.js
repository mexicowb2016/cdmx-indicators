'use strict';
/**
 * @function financeDataService
 * Este servicio retorna un objeto con metodos para realizar llamadas REST al back-end y graficos utilizando las librerias
 * D3.js y GoogleCharts
 * @returns {Object}
 */
angular.module('cdmxIndicatorsApp').
  service('financeDataService', function ($http, $filter, $compile) {
    return {
      getAllTotalSpentData: getAllTotalSpentsData,
      getExecutedSpentsByDepartmentFunctionData: getExecutedSpentsByDepartmentFunctionData,
      getExecutedSpentsByDepartmentFunctionGraph: getExecutedSpentsByDepartmentFunctionGraph,
      getExecutedSpentsByDependencyData: getExecutedSpentsByDependencyData,
      getExecutedSpentsByDependencyGraph: getExecutedSpentsByDependencyGraph,
      getExecutedSpentsBubbleData: getExecutedSpentsBubbleData,
      getExecutedSpentsBubbleGraph: getExecutedSpentsBubbleGraph,
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

    function getExecutedSpentsBubbleData (month, level0, level1) {
      var params = {
        month: month
      };
      if (level0 != null) {
        params.level0 = level0;
        if (level1 != null) {
          params.level1 = level1;
        }
      }
      var url = '/api/results/get/executedSpents/bubble/';
      return $http({
        url: url,
        method: 'GET',
        params: params
      });
    }

    function getExecutedSpentsBubbleGraph(data, level, scope) {
      data = formatBubbleChartIndicator6(data, level);
      if (data.length == 0) {
        createTextInBubbleGraph('indicator6div');
      } else {
        createBubbleGraph(data, 'indicator6div', scope);
      }
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

    function createTextInBubbleGraph(selector) {
      var svg = d3.select('#' + selector);
      svg.selectAll('.bubble').remove();
      svg.selectAll('text').remove();
      d3.select('.bubble-tooltip').remove();
      svg.append("text")
        .attr("x", 80)
        .attr("y", 100)
        .text("No hay datos de ejecución para el mes seleccionado.");
      svg.append("text")
        .attr("x", 60)
        .attr("y", 120)
        .text("Favor seleccionar otro mes utilizando el menú desplegable.");
    }

    function createBubbleGraph(data, selector, scope) {
      var width = 500;
      var height = 300;
      var center = { x: width / 2, y: height / 2 };
      var damper = 0.102;
      var maxValue = d3.max(data, function (d) { return +d.value; });
      var radiusScale = d3.scale.pow()
        .exponent(0.5)
        .range([2, 45]);
      radiusScale.domain([0, maxValue]);

      var nodes = [];
      for (var i = 0; i < data.length; i++) {
        nodes.push({
          radius: radiusScale(+data[i].value),
          value: data[i].value,
          name: data[i].name,
          x: Math.random() * 450,
          y: Math.random() * 400
        });
      }

      var charge = function(d) {
        return -Math.pow(d.radius, 2.0) / 8;
      };

      var force = d3.layout.force()
        .size([width, height])
        .charge(charge)
        .gravity(-0.01)
        .friction(0.9)
        .nodes(nodes);

      var svg = d3.select('#' + selector);
      svg.selectAll('.bubble').remove();
      svg.selectAll('text').remove();
      d3.select('.bubble-tooltip').remove();

      var fillColor = function(selected) {
        if (selected) {
          return '#FF149B';
        } else {
          return '#F0BECE';
        }
      };

      function floatingTooltip(tooltipId, width) {
        var tt = d3.select('body')
          .append('div')
          .attr('class', 'tooltip bubble-tooltip')
          .attr('id', tooltipId)
          .style('pointer-events', 'none');

        if (width) {
          tt.style('width', width);
        }

        hideTooltip();

        function showTooltip(content, event) {
          tt.style('opacity', 1.0)
            .html(content);
          updatePosition(event);
        }

        function hideTooltip() {
          tt.style('opacity', 0.0);
        }

        function updatePosition(event) {
          var xOffset = 20;
          var yOffset = 10;
          var ttw = tt.style('width');
          var tth = tt.style('height');
          var wscrY = window.scrollY;
          var wscrX = window.scrollX;
          var curX = (document.all) ? event.clientX + wscrX : event.pageX;
          var curY = (document.all) ? event.clientY + wscrY : event.pageY;
          var ttleft = ((curX - wscrX + xOffset * 2 + ttw) > window.innerWidth) ? curX - ttw - xOffset * 2 : curX + xOffset;
          if (ttleft < wscrX + xOffset) {
            ttleft = wscrX + xOffset;
          }
          var tttop = ((curY - wscrY + yOffset * 2 + tth) > window.innerHeight) ? curY - tth - yOffset * 2 : curY + yOffset;
          if (tttop < wscrY + yOffset) {
            tttop = curY + yOffset;
          }
          tt.style({ top: tttop + 'px', left: ttleft + 'px' });
        }

        return {
          showTooltip: showTooltip,
          hideTooltip: hideTooltip,
          updatePosition: updatePosition
        };
      };

      var tooltip = floatingTooltip('bubble_tooltip', 240);

      function addCommas(nStr) {
        nStr /= 1000000;
        nStr += '';
        var x = nStr.split('.');
        if (x.length > 1) {
          if (x[1].length > 1) {
            x[1] = x[1].substring(0, 1);
          }
        }
        var x1 = x[0];
        var x2 = x.length > 1 ? '.' + x[1] : '0';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
          x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
      }

      var showDetail = function(d) {
        var circle = d3.select(this);
        circle
          .attr('fill', fillColor(true));
        var content = d.name + '<br /><strong>' + addCommas(d.value) + ' Millones de Pesos</strong>';
        tooltip.showTooltip(content, d3.event);
      }

      var hideDetail = function(d) {
        d3.select(this).attr('fill', fillColor(false));
        tooltip.hideTooltip();
      }

      var bubbles = svg.selectAll('.bubble')
        .data(nodes, function (d) { return d.value; });

      bubbles.enter().append('circle')
        .classed('bubble', true)
        .attr('r', 0)
        .attr('fill', function (d) { return fillColor(false); })
        .attr('stroke', fillColor(true))
        .attr('stroke-width', 2)
        .attr('ng-click', function(d) { return "addLevelIndicator6('" + d.name + "', $event);"})
        .on('mouseover', showDetail)
        .on('mouseout', hideDetail);

      for (var i = 0; i < bubbles[0].length; i++) {
        if (bubbles[0][i] == null) {
          bubbles[0].splice(i, 1);
          i--;
        }
      }
      $compile(bubbles[0])(scope);

      bubbles.transition()
        .duration(100)
        .attr('r', function (d) { return d.radius; });

      function moveToCenter(alpha) {
        return function (d) {
          d.x = d.x + (center.x - d.x) * damper * alpha;
          d.y = d.y + (center.y - d.y) * damper * alpha;
        };
      }

      force.on('tick', function (e) {
        bubbles.each(moveToCenter(e.alpha))
          .attr('cx', function (d) { return d.x; })
          .attr('cy', function (d) { return d.y; });
      });

      force.start();
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

    function formatBubbleChartIndicator6(data, level) {
      var result = [];
      for (var i = 0; i < data.length; i++) {
        result.push({
          name: data[i].name,
          value: data[i].value
        });
      }
      return result;
    }

});
