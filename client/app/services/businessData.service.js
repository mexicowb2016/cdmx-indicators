/**
 * Created by joel on 01-09-16.
 */
angular.module('cdmxIndicatorsApp')
  .service('businessDataService', function ($http) {
    return {
      getCurrentQualificationData: getCurrentQualificationData,
      getCurrentQualificationGraph: getCurrentQualificationGraph,
      getSubnationalRankData: getSubnationalRankData,
      getDoingBusinessGoals: getDoingBusinessGoals,
      getSubnationalRankGraph: getSubnationalRankGraph
    };

    function getCurrentQualificationData (param) {
      return $http.get('/api/results/get/business/currentQualification/'+param);
    }

    function getCurrentQualificationGraph(data, title, qualification) {
      createRadialChart(data, title, qualification);
    }

    function getSubnationalRankData () {
      return $http.get('/api/results/get/businessSubnationalRank/');
    }

    function getDoingBusinessGoals(indicator) {
      return $http({
        url: '/api/results/get/businessGoals',
        method: 'GET',
        params: {
          indicator: indicator
        }
      });
    }

    function getSubnationalRankGraph (data) {
      createGaugeChart('.starting-business-graph', data['Apertura de una empresa'], 'Apertura de una empresa');
      createGaugeChart('.property-registry-graph', data['Registro de propiedades'], 'Registro de propiedades');
      createGaugeChart('.construction-permission-handling-graph', data['Manejo de permisos de construccion'], 'Manejo de permisos de construccion');
      createGaugeChart('.contract-compliance-graph', data['Cumplimiento de contratos'], 'Cumplimiento de contratos');
    }

    function createGaugeChart(container, data) {
      var config = {
        size: 171,
        clipWidth: 170,
        clipHeight: 90,
        ringInset: 20,
        ringWidth: 40,
        pointerWidth: 10,
        pointerTailLength: 5,
        pointerHeadLengthPercent: 0.9,
        minValue: 0,
        maxValue: 32,
        minAngle: -90,
        maxAngle: 90,
        transitionMs: 750,
        majorTicks: 4,
        labelFormat: d3.format(',g'),
        labelInset: 10,
        arcColorArr: ['#d1d1d3', '#f9d3e4', '#ef84b6', '#ff149b']
      };

      var range;
      var r;
      var pointerHeadLength;
      var svg;
      var arc;
      var scale;
      var ticks;
      var tickData;
      var pointer;
      var centerTx;

      function deg2rad(deg) {
        return deg * Math.PI / 180;
      }

      //Initial Configuration
      range = config.maxAngle - config.minAngle;
      r = config.size / 2;
      pointerHeadLength = Math.round(r * config.pointerHeadLengthPercent);

      centerTx = 'translate('+r +','+ r +')';
      // a linear scale that maps domain values to a percent from 0..1
      scale = d3.scale.linear()
        .range([0,1])
        .domain([config.minValue, config.maxValue]);

      ticks = scale.ticks(config.majorTicks);
      tickData = d3.range(config.majorTicks).map(function() {return 1/config.majorTicks;});
      //Arc config
      arc = d3.svg.arc()
      // .innerRadius(r - config.ringWidth - config.ringInset)
        .innerRadius(r - config.ringWidth)
        .outerRadius(r - config.ringInset)
        .startAngle(function(d, i) {
          var ratio = d * i;
          return deg2rad(config.minAngle + (ratio * range));
        })
        .endAngle(function(d, i) {
          var ratio = d * (i+1);
          return deg2rad(config.minAngle + (ratio * range));
        });

      //Init graph configuration
      var gaugeNameCls = 'gauge-' + (container.split('.').join(''));
      svg = d3.select(container)
        .append('svg:svg')
        .attr('class', gaugeNameCls)
        .attr('width', config.clipWidth)
        .attr('height', config.clipHeight);

      var arcs = svg.append('g')
        .attr('class', 'arc')
        .attr('transform', centerTx);

      arcs.selectAll('path')
        .data(tickData)
      .enter().append('path')
        .attr('fill', function(d, i) {
        return config.arcColorArr[i];
        })
        .attr('d', arc);

      //Set tick labels above of each arc
      var lg = svg.append('g')
        .attr('class', 'label')
        .attr('transform', centerTx);
      lg.selectAll('text')
        .data(ticks)
        .enter().append('text')
        .attr('transform', function(d) {
          var ratio = scale(d);
          var newAngle = config.minAngle + (ratio * range);
          return 'rotate(' +newAngle +') translate(0,' +(config.labelInset - r) +')';
        })
        .text(config.labelFormat);

      //Init line indicator config
      var lineData = [ [config.pointerWidth / 2, 0],
        [0, -pointerHeadLength],
        [-(config.pointerWidth / 2), 0],
        [0, config.pointerTailLength],
        [config.pointerWidth / 2, 0] ];
      var pointerLine = d3.svg.line().interpolate('monotone');
      var pg = svg.append('g').data([lineData])
        .attr('class', 'pointer')
        .attr('transform', centerTx);

      pointer = pg.append('path')
        .attr('d', pointerLine)
        .attr('transform', 'rotate(' + 0 +')');

      //Update line indicator with the passed data
      var ratio = scale(data);
      var fixLinePosition;
      if (data > 15) {
        fixLinePosition = -1;
      } else {
        fixLinePosition = 4
      }
      var newAngle = config.minAngle + (ratio * range) + fixLinePosition;
      // var newAngle = config.minAngle + (ratio * range);
      pointer.transition()
        .duration(config.transitionMs)
        .ease('elastic')
        .attr('transform', 'rotate(' +newAngle +')');

    }

    function createRadialChart(data, title, qualification) {
      var chart = RadarChart.chart();
      var ctnEl = angular.element('div.panel-body.radar-g');
      var heightCtn;
      if (ctnEl.children().length > 0) {
        ctnEl.children().remove();
      }
      heightCtn = 280;

      chart.config({
        w: ctnEl.width(),
        h: heightCtn - 30,
        levels: 5,
        maxValue: 100
      });

      var mainTML = '<h5 class="text-center">' + title + '</h5>' +
        '<div class="text-center">Calificacion actual de CDMX: <strong>' + qualification + '</strong> de 100</div>' +
        '<div class="radar-ctn"></div>';
      ctnEl.html(mainTML);

      var ctn = d3.select('.radar-ctn');

      var svg = ctn.append('svg');
      //Insert padding-top in order to display properly a tooltip when it is hovered at top position of the y-axis
      svg.style('padding-top', '25px')
        .attr('width', ctnEl.width())
        .attr('height', heightCtn);

      svg.append('g').classed('focus', 1).datum(data).call(chart);

      //Change polygon and circle points color
      d3.select('.radar-ctn svg polygon')
        .style('fill', '#FF149B')
        .style('stroke', '#FF149B');
      d3.selectAll('.radar-ctn svg circle')
        .style('stroke', '#FF149B')
        .style('fill', '#FF149B');
    }
  });
