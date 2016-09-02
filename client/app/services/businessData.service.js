/**
 * Created by joel on 01-09-16.
 */
angular.module('cdmxIndicatorsApp')
  .service('businessDataService', function ($http) {
    return {
      getSubnationalRankData: getSubnationalRankData,
      getSubnationalRankGraph: getSubnationalRankGraph
    };

    function getSubnationalRankData () {
      return $http.get('/api/results/get/businessSubnationalRank/');
    }

    function getSubnationalRankGraph (data) {
      createGaugeChart('.starting-business-graph', data['Apertura de una empresa'], 'Apertura de una empresa');
      createGaugeChart('.property-registry-graph', data['Registro de propiedades'], 'Registro de propiedades');
      createGaugeChart('.construction-permission-handling-graph', data['Manejo de permisos de construccion'], 'Manejo de permisos de construccion');
      createGaugeChart('.contract-compliance-graph', data['Cumplimiento de contratos'], 'Cumplimiento de contratos');
    }

    function createGaugeChart(container, data, title) {
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
        arcColorArr: ['#4ABB5E', '#D0D352', '#CC6F34', '#C2252B']
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
  });