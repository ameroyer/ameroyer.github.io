const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');

const transition_duration = 500;
const padding = 35;
const base_font_size = 8;
const width = 200;
const height = 225;
const image_offset_x = 15;
const font_color =  "#fe9001";
const font_color2 =  "#fe5e31";

function load_text(svg, data) {
    let hstep = (height - padding) / data.length;
    
    svg.selectAll("text")
	.data(data)
	.enter()
	.append("text") 
	.attr("font-family", "Verdana, Geneva, sans-serif")
	.attr("text-anchor", "middle")
	.attr("x", width / 2)
	.attr("y", function(d) { return d.index * hstep;})
	.attr("dy", padding)
	.style("font-size", function(d){return base_font_size + d.count })
	.text(function(d) {return d.name;})
	.style("fill", function(d) {return (d.index % 2 == 0) ? font_color2 : font_color; }) 
	.style("opacity", 0.)
	.transition()
	.duration(transition_duration)
	.delay(function(d) {return d.index * transition_duration * 0.2;})
	.style("opacity", 1.);
}

class WeightedWordList extends D3Component {
    
    initialize(node, props) {
	var svg = (this.svg = d3.select(node).append('svg'));
	//svg.append("rect")
	 //   .attr("width", "100%")
	 //   .attr("height", "100%")
	 //   .attr("fill", "white");
	
	svg
	    .attr('viewBox', `0 0 ${width} ${height}`)
	    .style('width', '100%')
	    .style('height', '100%');
	
	svg.append("svg:image")
	    .attr("id", "bg")
	    .attr('class', 'introimage')
	    .attr('x', image_offset_x)
	    .attr('y', height / 4)
	    .attr('width', width - 2 * image_offset_x)
	    .attr("xlink:href", props.bg)
    }

    update(props, oldProps) {
	this.svg.selectAll("text").remove();
	if (props.load){
	    this.svg.select("#bg")
		.style("opacity", 1.)
		.transition()
		.duration(500)
		.style("opacity", 0.);
	    load_text(this.svg, props.data);
	} else {
	    this.svg.select("#bg")
		.style("opacity", 0.)
		.transition()
		.duration(300)
		.style("opacity", 1.);
	}
    }
}

module.exports = WeightedWordList;
