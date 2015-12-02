 function drawChart(queryStat) {

    d3.csv('kobeBryant.csv', type, function(error, data) {

        var width = 1000;
        var barHeight = 30;
        var height = (barHeight + 5) * data.length;
        var padding = 50;

        var barChart = d3.select('#container')
            .append('svg:svg')
            .attr('width', width)
            .attr('height', height)
            .attr('style', 'background-color: #EEE');

        // X Scale
        var x = d3.scale.linear()
            .domain([0, d3.max(data, function(d) {
                return +d[queryStat];
            })])
            .rangeRound([0, width]);

        // Y Scale
        var y = d3.scale.linear()
            .domain([0, data.length])
            .range([0, height]);

        barChart.selectAll('rect')
            .data(data)
            .enter()
            .append('svg:rect')
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
            .data(data)
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
            .data(data)
            .enter()
            .append('svg:text')
            .attr('x', function(d) { return x(d[queryStat]); }) 
            .attr('y', function(d, i) {
                return y(i);
            })
            .attr('dx', '-4em')
            .attr('dy', '1.25em')
            .attr('text-anchor', 'right')
            .text(function(d) {
                return d[queryStat] + ' ' + queryStat;
            })
            .attr('fill', 'white')
            .attr('style', 'font-size: 16; font-family: Helvetica, sans-serif');
    });
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

function type(d) {
    return d;
}