/**
 * Created by joel on 24-08-16.
 */
angular.module('cdmxIndicatorsApp').
  service('genreDataService', function ($http) {
    var saveJobClassificationDataOrder = ['Mando Superior', 'Mando Medio', 'Tecnico Operativo Confianza', 'Tecnico Operativo Base', 'Haberes', 'Estabilidad Laboral'];

    return {
      getGenreJobClassificationData: getGenreJobClassificationData,
      getGenreJobClassificationGraph: getGenreJobClassificationGraph,
      getWomenPromotedRepresentationGraph: getWomenPromotedRepresentationGraph,
      getWomenQuantityRepresentationGraph: getWomenQuantityRepresentationGraph,
      getWomenRecruitmentRepresentationGraph: getWomenRecruitmentRepresentationGraph,
      getWomenSalaryGapRepresentationGraph: getWomenSalaryGapRepresentationGraph,
      getWomenPromotedRepresentationDataByJobClassification: getWomenPromotedRepresentationDataByJobClassification,
      getWomenQuantityRepresentationDataByJobClassification: getWomenQuantityRepresentationDataByJobClassification,
      getWomenRecruitmentRepresentationDataByJobClassification: getWomenRecruitmentRepresentationDataByJobClassification,
      getWomenSalaryGapDataByJobClassification: getWomenSalaryGapDataByJobClassification,
      getWomenProportion: getWomenProportion,
      getWomenProportionRepresentationGraph: getWomenProportionRepresentationGraph,
      getDemographic: getDemographic,
      getDemographicGraph: getDemographicGraph,
      getRemuneration: getRemuneration,
      getRemunerationGraph: getRemunerationGraph
    };

    function getGenreJobClassificationData() {
      return $http.get('/api/results/get/genreJobClassification/');
    }

    function getGenreJobClassificationGraph(data, checkedBtn) {
      data = formatDualBarGraph(data, checkedBtn);
      createDualGroupedHorizontalBarGraph(data);
    }

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
      data = format4GroupedMultiBarData(data);
      create4GroupedMultiBarChart(data);
    }

    function getDemographicGraph (data) {
      data = formatMultiBarDemographicData(data, 'proportion');
      createMultiBarHorizontalGraph(data, 'women-demographic-classification-div');
    }

    function getRemunerationGraph (data) {
      data = formatMultiBarRemunerationData(data, 'salaryGap');
      createMultiBarHorizontalGraph(data, 'women-demographic-classification-div');
    }

    function getWomenProportionRepresentationGraph (data) {
      createPieChart(data.quintil1, 'women-proportion', 'piesvg1', 'Quintil 1', '$10,000-$20,000');
      createPieChart(data.quintil2, 'women-proportion', 'piesvg2', 'Quintil 2', '$8,000-$10,000');
      createPieChart(data.quintil3, 'women-proportion', 'piesvg3', 'Quintil 3', '$6,000-$8,000');
      createPieChart(data.quintil4, 'women-proportion', 'piesvg4', 'Quintil 4', '$4,500-$6,000');
      createPieChart(data.quintil5, 'women-proportion', 'piesvg5', 'Quintil 5', '$1,000-$4,500');
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
      return $http.get('/api/results/get/genre/salaryGap/');
    }

    function getWomenProportion () {
      return $http.get('/api/results/get/genre/proportion');
    }

    function getDemographic(dependency, classification) {
      return $http({
        url: '/api/results/get/genre/demographic',
        method: 'GET',
        params: {
          dependency: dependency,
          classification: classification
        }
      });
    }

    function getRemuneration(dependency, classification) {
      return $http({
        url: '/api/results/get/genre/remuneration',
        method: 'GET',
        params: {
          dependency: dependency,
          classification: classification
        }
      });
    }


  //Utility functions
    function create4GroupedMultiBarChart (data) {
      google.charts.setOnLoadCallback(function createGroupedBy4MultiBarChart () {
        var containerGraphEl = angular.element('div.women-salaryGap-percentage');
        var containerGraphDOMEl = containerGraphEl[0];
        var dataGraph = google.visualization.arrayToDataTable(data);

        var formatter = new google.visualization.NumberFormat({
          fractionDigits: 0,
          suffix: '%'
        });
        //Take this format for all bars
        formatter.format(dataGraph, 1);
        formatter.format(dataGraph, 2);
        formatter.format(dataGraph, 3);
        formatter.format(dataGraph, 4);

        var chartOptions = {
          title: '',
          bar: {
            groupWidth: '70%'
          },
          chartArea: {
            top: 10,
            width: '80%',
            height: '70%'
          },
          colors: ['#D83E87', '#E16F9F', '#E794b4', '#F0BECE'],
          legend: {position: 'none'},
          vAxis: {format: '#\'%\''},
          hAxis: {},
          seriesType: 'bars'
        };
        var barChart = new google.visualization.ComboChart(containerGraphDOMEl);
        barChart.draw(dataGraph, chartOptions);
      });
    }

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
    function formatDualBarGraph (data, checkedBtn) {
      var result = [];
      result[0] = data[checkedBtn].womenQuantityPercentage;
      result[1] = data[checkedBtn].menQuantityPercentage;
      result[2] = data[checkedBtn].womenRecruitmentPercentage;
      result[3] = data[checkedBtn].menRecruitmentPercentage;
      result[4] = data[checkedBtn].womenPromotionPercentage;
      result[5] = data[checkedBtn].menPromotionPercentage;
      return result;
    }
    function createMultiBarHorizontalGraph (data, elementContainerId) {
      google.charts.setOnLoadCallback(function () {
        var dataGraph = google.visualization.arrayToDataTable(data);
        var formatter = new google.visualization.NumberFormat({
            fractionDigits: 2,
            suffix: '%'
        });
        formatter.format(dataGraph, 1);
        var options = {
          title: '',
          chartArea: {width: '50%', height: '90%', left: '48%', top: 10},
          fontSize: 12,
          hAxis: {format: "#'%'"},
          legend: "none",
          tooltip: {isHtml: true}
        };

        var chart = new google.visualization.BarChart(document.getElementById(elementContainerId));

        chart.draw(dataGraph, options);
      });
    }

    function format4GroupedMultiBarData (data) {
      var key;
      var result = [
        [
          'Clasificación del Puesto',
          'Brecha en remuneración bruta',
          'Brecha en salario base',
          'Brecha en tiempo extraordinario',
          'Brecha en otras prestaciones'
        ]
      ];
      for (var i = 0; i < saveJobClassificationDataOrder.length; i++) {
          for (key in data) {
            if (data.hasOwnProperty(key)) {
              if (key == saveJobClassificationDataOrder[i]) {
                result.push(
                  [key, data[key].bruteSalaryGapPercentage, data[key].baseSalaryGapPercentage, data[key].extraordinaryTimeGapPercentage, data[key].otherTimeGapPercentage]
                );
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

    function formatMultiBarDemographicData (data, field) {
      var result = [['Sector', 'Proporcion', {role: 'style'}, {type:'string', role: 'tooltip', p: {'html': true}}]];
      for (var key in data) {
        var tooltip = "";
        tooltip += '<div>';
        tooltip += '<div class="google-visualization-tooltip">';
        tooltip += '<ul class="google-visualization-tooltip-item-list">';
        tooltip += '<li class="google-visualization-tooltip-item"><strong>' + key + '</strong></li>';
        tooltip += '<li class="google-visualization-tooltip-item">';
        tooltip += '<span>Proporcion del conjunto de mujeres:</span><strong> ' + parseInt(data[key][field] * 100) + '%</strong><br />';
        tooltip += '<span>Cantidad de Mujeres:</span><span style="font-weight: bolder; color: #E482A9;"> ' + data[key].women + '</span><br />';
        tooltip += '<span>Cantidad de Hombres:</span><span style="font-weight: bolder; color: #5A74C0;"> ' + data[key].men + '</span><br />';
        tooltip += '</li>';
        tooltip += '</ul>';
        tooltip += '</div>';
        tooltip += '</div>';
        result.push([key, data[key][field] * 100, '#FF149B', tooltip]);
      }
      return result;
    }

    function formatMultiBarRemunerationData (data, field) {
      var result = [['Sector', 'Proporcion', {role: 'style'}]];
      for (var key in data) {
        result.push([key, data[key][field] * 100, '#FF149B']);
      }
      return result;
    }

    function createPieChart(data, elementContainerCls, elementSvgId, title, footer) {
      var margin = {top: 40, right: 10, bottom: 20, left: 10};
      var width = 120 - margin.left - margin.right;
      var height = 200 - margin.top - margin.bottom;
      var radius = Math.min(width, height) / 2;

      var color = d3.scale.ordinal()
          .range(["#5A74C0", "#E482A9"]);

      var arc = d3.svg.arc()
          .outerRadius(radius - 10)
          .innerRadius(0);

      var labelArc = d3.svg.arc()
          .outerRadius(radius - 40)
          .innerRadius(radius - 40);

      var pie = d3.layout.pie()
          .sort(null)
          .value(function(d) { return d.value; });

      var svg = d3.select(".women-proportion #" + elementSvgId)
          .attr("width", width)
          .attr("height", height)
        .append("g")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      var g = svg.selectAll(".arc")
          .data(pie(data))
        .enter().append("g")
          .attr("class", "arc")
          .on("mouseover", function (d) {
            d3.select('#pie-tooltip')
              .style('left', d3.event.pageX + 'px')
              .style('top', (d3.event.pageY - 60) + 'px')
              .style('opacity', 1)
            .select('#pie-title')
              .text(title);

            d3.select('#pie-tooltip #pie-slice-label')
              .text(d.data.label);

            d3.select('#pie-tooltip #pie-slice-value')
              .text(Math.round(d.value * 100));
          })
          .on("mouseout", function () {
            // Hide the tooltip
            d3.select("#pie-tooltip")
              .style("opacity", 0);
          });

      g.append("path")
          .attr("d", arc)
          .style("fill", function(d, i) { return color(i); });

      g.append("text")
          .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
          .attr("dy", ".35em")
          .text(function(d) { return d.label; });

      svg.append("text")
          .attr("x", 0)
          .attr("y", 0 - (margin.top / 2) - 36)
          .attr("text-anchor", "middle")
          .text(title);
      svg.append("text")
          .attr("x", 0)
          .attr("y", 85 - (margin.top / 2))
          .attr("text-anchor", "middle")
          .text(footer);
    }

    function createDualGroupedHorizontalBarGraph(dataArr) {
      var x;
      var mainContainer;
      var maxBarElementWidth = angular.element('.genre-job-classification').width();

      x = d3.scale.linear()
        .domain([0, 100])
        .range([0, maxBarElementWidth]);

      mainContainer = d3.selectAll('.genre-job-classification');

      var womenQuantityPercentage = dataArr[0];
      var menQuantityPercentage = dataArr[1];
      var womenRecruitmentPercentage = dataArr[2];
      var menRecruitmentPercentage = dataArr[3];
      var womenPromotionPercentage = dataArr[4];
      var menPromotionPercentage = dataArr[5];

      mainContainer
        .select('div.men-quantity-bar-graph')
        .style('width', x(menQuantityPercentage) + 'px')
        .text(function(d) { return menQuantityPercentage + ' %'; });

      mainContainer
        .select('div.women-quantity-bar-graph')
        .style('width', x(womenQuantityPercentage) + 'px')
        .text(function(d) { return womenQuantityPercentage + ' %'; });

      mainContainer
        .select('div.men-recruitment-bar-graph')
        .style('width', x(menRecruitmentPercentage) + 'px')
        .text(function(d) { return menRecruitmentPercentage + ' %'; });

      mainContainer
        .select('div.women-recruitment-bar-graph')
        .style('width', x(womenRecruitmentPercentage) + 'px')
        .text(function(d) { return womenRecruitmentPercentage + ' %'; });

      mainContainer
        .select('div.men-promotion-bar-graph')
        .style('width', x(menPromotionPercentage) + 'px')
        .text(function(d) { return menPromotionPercentage + ' %'; });

      mainContainer
        .select('div.women-promotion-bar-graph')
        .style('width', x(womenPromotionPercentage) + 'px')
        .text(function(d) { return womenPromotionPercentage + ' %'; });
    }

});
