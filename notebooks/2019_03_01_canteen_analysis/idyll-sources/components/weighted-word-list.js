const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');

const transition_duration = 625;

class WeightedWordList extends D3Component {


    initialize(node, props) {	
	var width = 960,
	    height = 700;

	var svg = (this.svg = d3.select(node).append('svg'));
	svg.append("rect")
	    .attr("width", "100%")
	    .attr("height", "100%")
	    .attr("fill", "white");
	
	svg
	    .attr('viewBox', `0 0 ${width} ${height}`)
	    .style('width', '100%')
	    .style('height', '${height}');
	
	svg.selectAll("text")
	    .data(props.data)
	    .enter()
	    .append("text") // append text
	    .attr("x", 200)
	    .attr("y", function(d) { return d.index * 40;})
	    .attr("dy", 40)
	    .attr("text-anchor", "middle") // set anchor y justification
	    .style("font-size", function(d){return 12 + d.count * 3})
	    .text(function(d) {return d.name;})
	    .style("fill", "white") // make the body green
	    .transition()
	    .duration(transition_duration)
	    .delay(function(d) {return d.index * transition_duration * 0.3;})
	    .style("fill", "red"); // define the text to display	
    }

    update(props, oldProps) {
	if (props.load) {
	    this.loadData(props);
	}
    }
}

module.exports = WeightedWordList;
