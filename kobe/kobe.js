var width = 1000;
var height;
var barHeight = 28;
var padding = 50;

var barChart;
var stats;
var x, y;

var textColor = '#fefefe'

d3.csv('kobeBryant.csv', type, function(error, data) {
    height = (barHeight + 5) * data.length;
    stats = data;

    // Y Scale
    y = d3.scale.linear()
        .domain([0, stats.length])
        .range([0, height]);

    barChart = d3.select('#container')
        .append('svg:svg')
        .attr('class', 'container')
        .attr('width', width + padding)
        .attr('height', height)
        .attr('style', 'background-color: #ddd');

    barChart.selectAll('rect')
        .data(stats)
        .enter()
        .append('svg:rect')
        .attr('x', 0)
        .attr('y', function(d, i) {
            return y(i);
        })
        .attr('height', barHeight)
        .attr('width', 100)
        .attr('fill', '#743596');

    barChart.selectAll('textSeason')
        .data(stats)
        .enter()
        .append('svg:text')
        .attr('x', 0)
        .attr('y', function(d, i) {
            return y(i);
        })
        .attr('dx', '1em')
        .attr('dy', '1.25em')
        .attr('text-anchor', 'left')
        .text(function(d) {
            return d.Season;
        })
        .attr('class', 'textSeason')
        .attr('fill', textColor);

    barChart.selectAll('textStats')
        .data(stats)
        .enter()
        .append('svg:text')
        .attr('x', function(d) {
            return 200;
        })
        .attr('y', function(d, i) {
            return y(i);
        })
        .attr('dx', '-5em')
        .attr('dy', '1.25em')
        .attr('text-anchor', 'right')
        .text(function(d) {
            return ' ';
        })
        .attr('class', 'textStats')
        .attr('fill', textColor);
});


function updateChart(queryStat) {
    // Calculate X Scale
    x = d3.scale.linear()
        .domain([0, d3.max(stats, function(d) {
            return +d[queryStat];
        })])
        .rangeRound([0, width]);

    barChart.selectAll('rect')
        .data(stats)
        .transition()
        .duration(1000)
        .attr('x', 0)
        .attr('y', function(d, i) {
            return y(i);
        })
        .attr('height', barHeight)
        .attr('width', function(d) {
            return x(d[queryStat]);
        });

    barChart.selectAll('.textStats')
        .data(stats)
        .transition()
        .duration(1000)
        .attr('x', function(d) {
            return x(d[queryStat]);
        })
        .attr('y', function(d, i) {
            return y(i);
        })
        .attr('dx', '-5em')
        .attr('dy', '1.25em')
        .attr('text-anchor', 'right')
        .text(function(d) {
            return d[queryStat] + ' ' + queryStat;
        });
}

function updateHighlight(button) {
    // Highlight corresponding box
    $('.switch').removeClass('goldFill');
    $(button).addClass('goldFill');
}

$(document).ready(function() {
    $('#ButtonPTS').click(function() {
        updateChart('PTS');
        updateHighlight(this);
    });
    $('#ButtonFGP').click(function() {
        updateChart('FGP');
        updateHighlight(this);
    });
    $('#Button3PM').click(function() {
        updateChart('3PM');
        updateHighlight(this);
    });
    $('#Button3PP').click(function() {
        updateChart('3P%');
        updateHighlight(this);
    });
    $('#ButtonFTP').click(function() {
        updateChart('FT%');
        updateHighlight(this);
    });
    $('#ButtonREB').click(function() {
        updateChart('REB');
        updateHighlight(this);
    });
    $('#ButtonAST').click(function() {
        updateChart('AST');
        updateHighlight(this);
    });
    $('#ButtonSTL').click(function() {
        updateChart('STL');
        updateHighlight(this);
    });
    $('#ButtonBLK').click(function() {
        updateChart('BLK');
        updateHighlight(this);
    });
});


function removeCharts() {
    var barChart = d3.select('#container');

    barChart.selectAll('text').remove();
    barChart.selectAll('rect').remove();
}

function animate() {
    var barChart = d3.select('#container');
    var bars = barChart.selectAll('rect');

    bars.transition()
        .attr('width', 100)
        .duration(1000)
        .delay(100);
}

function type(d) {
    return d;
}