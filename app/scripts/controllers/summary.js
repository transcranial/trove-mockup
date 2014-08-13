'use strict';

/**
 * @ngdoc function
 * @name mockupApp.controller:SummaryCtrl
 * @description
 * # SummaryCtrl
 * Controller of the mockupApp
 */
var app = angular.module('mockupApp');

app.controller('SummaryCtrl', function ($scope, $location) {

    $scope.viewBadges = function() {
        $location.path('/badges');
    };

    // blue, yellow, green, red, purple, orange
    $scope.colors = ['#5C97BF', '#F4D03F', '#1BBC9B', '#D24D57', '#9B59B6', '#F89406'];
    //$scope.colors = ['#81CFE0','#F5D76E','#68C3A3', '#E08283', '#AEA8D3','#F9BF3B']; 

    $scope.colorLuminance = function (hex, lum) {

        // validate hex string
        hex = String(hex).replace(/[^0-9a-f]/gi, '');
        if (hex.length < 6) {
            hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
        }
        lum = lum || 0;

        // convert to decimal and change luminosity
        var rgb = "#", c, i;
        for (i = 0; i < 3; i++) {
            c = parseInt(hex.substr(i*2,2), 16);
            c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
            rgb += ("00"+c).substr(c.length);
        }

        return rgb;
    };

    var randomArray = function (length, limit) {
        var arr = [];
        for (var i = 0; i < length; i++) {
            arr.push(Math.round(Math.random() * limit));
        }
        return arr;
    };

    $scope.data = {

        'name': 'Leon Chen',
        'residency_progress': 6, // in percent
        'number_studies_by_modality': [
            {
                'label': 'XR',
                'weekly_numbers': randomArray(10, 100),
                'subcategories': ['Abdomen', 'Chest', 'Bone', 'Other'],
                'subcategories_numbers': randomArray(4, 250),
                'total': 0
            },
            {
                'label': 'CT',
                'weekly_numbers': randomArray(10, 20),
                'subcategories': ['Head', 'Chest', 'Abdomen/Pelvis', 'Other'],
                'subcategories_numbers': randomArray(4, 50),
                'total': 0
            },
            {
                'label': 'MR',
                'weekly_numbers': randomArray(10, 10),
                'subcategories': ['Brain', 'Other'],
                'subcategories_numbers': randomArray(2, 50),
                'total': 0
            }
        ],
        'weekly_dates': ['7-Jun-14','14-Jun-14','21-Jun-14','28-Jun-14','5-Jul-14','12-Jul-14','19-Jul-14','26-Jul-14','2-Aug-14','9-Aug-14'],
        'number_studies_total': 0,
        'points': 0,
        'badges': 42

    };
    var tempnum = 0;
    for (var i=0; i<3; i++) {
        $scope.data.number_studies_by_modality[i].total = $scope.data.number_studies_by_modality[i].weekly_numbers.reduce(function (a, b) { return a + b; });
        $scope.data.number_studies_total = $scope.data.number_studies_total + $scope.data.number_studies_by_modality[i].total;
        tempnum = $scope.data.number_studies_by_modality[i].total - $scope.data.number_studies_by_modality[i].subcategories_numbers.slice(0, $scope.data.number_studies_by_modality[i].subcategories.length-1).reduce(function (a, b) { return a + b; });
        if (tempnum < 0) {
            $scope.data.number_studies_by_modality[i].subcategories_numbers[$scope.data.number_studies_by_modality[i].subcategories.length-2] = $scope.data.number_studies_by_modality[i].subcategories_numbers[$scope.data.number_studies_by_modality[i].subcategories.length-2] + tempnum;
        } else {
            $scope.data.number_studies_by_modality[i].subcategories_numbers[$scope.data.number_studies_by_modality[i].subcategories.length-1] = tempnum;
        }
    }
    $scope.data.points = $scope.data.number_studies_by_modality[0].total + $scope.data.number_studies_by_modality[1].total * 20 + $scope.data.number_studies_by_modality[2].total * 30;

    $scope.modality_selected_index = -1;
    
});

app.directive("summaryChart", function ($window) {

    return {
        restrict: "E",
        link: function (scope, elem, attrs) {

            // pie chart

            var width_piechart = $window.innerHeight / 3,
                height = $window.innerHeight / 3,
                margin = 60,
                radius = height / 2,
                label_radius = radius + 20,
                colors = scope.colors;

            var data = scope.data.number_studies_by_modality;

            var pieChart = d3.select(elem[0])
                .append('svg')
                .attr('width', width_piechart + margin*2)
                .attr('height', height + margin*2)
                .append('g')
                .attr('transform', 'translate(' + (radius + margin) + ',' + (radius + margin) + ')');

            var arc = d3.svg.arc()
                .outerRadius(radius)
                .innerRadius(1);

            var pie = d3.layout.pie()
                .sort(null)
                .value(function (d) { return d.total; });

            var g = pieChart.selectAll('.arc')
                .data(pie(data))
                .enter()
                .append('g')
                .attr('class', 'arc')
                .on('mouseover', function (d) {
                    var arcOver = d3.svg.arc().outerRadius(radius + 10);
                    d3.select(this).select('path')
                        .transition()
                        .ease('elastic')
                        .duration(600)
                        .attr('d', arcOver);
                })
                .on('mouseout', function (d) {
                    d3.select(this).select('path')
                        .transition()
                        .ease('elastic')
                        .duration(600)
                        .attr('d', arc);
                });

            g.append('path')
                .attr('d', arc)
                .style('fill', function (d, i) { return colors[i]; })
                .on('mouseover', function (d, i) {
                    scope.modality_selected_index = i;
                    scope.$apply();
                    updateLineGraph();
                })
                .on('mouseout', function (d, i) {
                    scope.modality_selected_index = -1;
                    scope.$apply();
                });

            g.append('text')
                .attr('transform', function (d) { 
                    var c = arc.centroid(d),
                        x = c[0],
                        y = c[1],
                        h = Math.sqrt(x*x + y*y);
                    return 'translate(' + (x/h * label_radius) + ',' + (y/h * label_radius) + ')';
                })
                .attr('dy', '.35em')
                .attr('class', 'pie-graph-label')
                .attr('text-anchor', function (d) {
                    return (d.endAngle + d.startAngle)/2 > Math.PI ? 'end' : 'start';
                })
                .text(function (d, i) { return data[i].label; })
                .style('fill', function (d, i) { return colors[i]; });

            // line graph

            var margin_linegraph = {top: 50, right: 20, bottom: 30, left: 50},
                width_linegraph = $window.innerWidth - document.getElementById('dashboard-sidebar').clientWidth - radius * 2 - margin*2 - margin_linegraph.left - margin_linegraph.right - 50,
                height_linegraph = $window.innerHeight / 3 - margin_linegraph.top - margin_linegraph.bottom;

            var parseDate = d3.time.format('%d-%b-%y').parse;

            var data_line = [];
            var sumtemp = 0;
            for (var i=0; i<scope.data.weekly_dates.length; i++) {
                if (scope.modality_selected_index == -1 ) {
                    sumtemp = 0;
                    for (var j=0; j<scope.data.number_studies_by_modality.length; j++) {
                        sumtemp += scope.data.number_studies_by_modality[j].weekly_numbers[i];
                    }
                    data_line.push({
                        'weekly_date': parseDate(scope.data.weekly_dates[i]),
                        'weekly_number': sumtemp
                    });
                } else {
                    data_line.push({
                        'weekly_date': parseDate(scope.data.weekly_dates[i]),
                        'weekly_number': scope.data.number_studies_by_modality[scope.modality_selected_index].weekly_numbers[i]
                    });
                }
            }

            var x = d3.time.scale()
                .domain(d3.extent(data_line, function (d) { return d.weekly_date; }))
                .range([0, width_linegraph]);

            var y = d3.scale.linear()
                .domain([0, d3.max(data_line, function (d) { return d.weekly_number; })]).nice()
                .range([height_linegraph, 0]);

            var xAxis = d3.svg.axis()
                .scale(x)
                .orient('bottom')
                .tickValues(data_line.map( function (d) { return d.weekly_date; }))
                .tickFormat(d3.time.format('%b %d, %Y'));

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient('left')
                .ticks(5);

            var line = d3.svg.line()
                .interpolate('linear')
                .x(function (d) { return x(d.weekly_date); })
                .y(function (d) { return y(d.weekly_number); });

            var lineChart = d3.select(elem[0])
                .append('svg')
                .attr('width', width_linegraph + margin_linegraph.left + margin_linegraph.right)
                .attr('height', height + margin_linegraph.top + margin_linegraph.bottom)
                .append('g')
                .attr('transform', 'translate(' + margin_linegraph.left + ',' + margin_linegraph.top + ')');

            lineChart.append('g')
                .attr('class', 'x axis')
                .attr('transform', 'translate(0,' + height_linegraph + ')')
                .call(xAxis)
                .selectAll('text')
                    .style('text-anchor', 'end')
                    .attr('dx', '-0.8em')
                    .attr('dy', '0.15em')
                    .attr('transform', function (d) { return 'rotate(-65)' });

            lineChart.append('g')
                .attr('class', 'y axis')             
                .call(yAxis)
                .append('text')
                .style('text-anchor', 'end')       
                .text('# Read')                
                .attr('transform', 'translate(' + 0 + ',' + -12 + ')');


            function updateLineGraph() {
                var data_line = [];
                var sumtemp = 0;
                for (var i=0; i<scope.data.weekly_dates.length; i++) {
                    if (scope.modality_selected_index == -1 ) {
                        sumtemp = 0;
                        for (var j=0; j<scope.data.number_studies_by_modality.length; j++) {
                            sumtemp += scope.data.number_studies_by_modality[j].weekly_numbers[i];
                        }
                        data_line.push({
                            'weekly_date': parseDate(scope.data.weekly_dates[i]),
                            'weekly_number': sumtemp
                        });
                    } else {
                        data_line.push({
                            'weekly_date': parseDate(scope.data.weekly_dates[i]),
                            'weekly_number': scope.data.number_studies_by_modality[scope.modality_selected_index].weekly_numbers[i]
                        });
                    }
                }

                lineChart.select('path.line').remove();

                y = d3.scale.linear()
                    .domain([0, d3.max(data_line, function (d) { return d.weekly_number; })]).nice()
                    .range([height_linegraph, 0]);

                yAxis.scale(y);

                lineChart.select('.y.axis')
                    .transition()
                    .duration(300)
                    .call(yAxis);

                var path = lineChart.append('path')
                    .datum(data_line)
                    .attr('class', 'line')
                    .attr('d', line)
                    .style('stroke', function() {
                        if (scope.modality_selected_index == -1) {
                            return '#2C3E50';
                        } else {
                            return colors[scope.modality_selected_index];
                        }
                    });

                var totalLength = path.node().getTotalLength();

                path.attr('stroke-dasharray', totalLength + ' ' + totalLength)
                    .attr('stroke-dashoffset', totalLength)
                    .transition()
                    .duration(2000)
                    .ease('linear')
                    .attr('stroke-dashoffset', 0);
            }

            updateLineGraph();
        }
    };
});
