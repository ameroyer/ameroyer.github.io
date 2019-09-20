const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');

const transition_duration = 625;
const padding = 30;
const base_font_size = 8;
const width = 200;
const height = 200;

function load(svg, data) {
    let hstep = (height - padding) / data.length;
    
    svg.selectAll("text")
	.data(data)
	.enter()
	.append("text") 
	.attr("text-anchor", "middle")
	.attr("x", width / 2)
	.attr("y", function(d) { return d.index * hstep;})
	.attr("dy", padding)
	.style("font-size", function(d){return base_font_size + d.count })
	.text(function(d) {return d.name;})
	.style("fill", "white") 
	.style("opacity", 0.)
	.transition()
	.duration(transition_duration)
	.delay(function(d) {return d.index * transition_duration * 0.3;})
	.style("opacity", 1.);
}

class WeightedWordList extends D3Component {


    initialize(node, props) {
	var svg = (this.svg = d3.select(node).append('svg'));	
	svg
	    .attr('viewBox', `0 0 ${width} ${height}`)
	    .style('width', '100%')
	    .style('height', '100%');	
    }

    update(props, oldProps) {
	this.svg.selectAll("text").remove();
	if (props.load) {
	    load(this.svg, props.data);
	}
    }
}

module.exports = WeightedWordList;
