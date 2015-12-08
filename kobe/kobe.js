var width = 1000;
var height;
var barHeight = 30;
var padding = 50;

var barChart;
var stats;
var x, y;


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
        .attr('style', 'background-color: #EEE');

    barChart.selectAll('rect')
        .data(stats)
        .enter()
        .append('svg:rect')
        .attr('x', 0)
        .attr('y', function(d, i) {
            return y(i);
        })
        .attr('height', barHeight)
        .attr('width', 10)
        .attr('fill', '#2d578b');
});


function drawChart(queryStat) {

    barChart.selectAll('text').remove();

    // Calculate X Scale
    x = d3.scale.linear()
        .domain([0, d3.max(stats, function(d) {
            return +d[queryStat];
        })])
        .rangeRound([0, width]);

    barChart.selectAll('rect')
        .data(stats)
        .attr('x', 0)
        .attr('y', function(d, i) {
            return y(i);
        })
        .attr('height', barHeight)
        .attr('width', function(d) {
            return x(d[queryStat]);
        })
        .attr('fill', '#2d578b');

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
        .attr('fill', 'white')
        .attr('style', 'font-size: 16; font-family: Helvetica, sans-serif');

    barChart.selectAll('textStats')
        .data(stats)
        .enter()
        .append('svg:text')
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
        })
        .attr('fill', 'white')
        .attr('style', 'font-size: 16; font-family: Helvetica, sans-serif');

}
$(document).ready(function() {
    $('#ButtonPTS').click(function() {
        drawChart('PTS');
        console.log('PTS');
    });
    $('#Button3PM').click(function() {
        drawChart('3PM');
        console.log('3PM');
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