const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');

const width = 650;
const height = 250;
const border = 4;
const bordercolor = "DarkGray";
const acolor = "Orange";
const bcolor = "CornflowerBlue";
const num_cols = 8;
const r = Math.floor(width / 2 / num_cols / 2);

class CustomD3Component extends D3Component {
    initialize(node, props) {
	const svg = (this.svg = d3.select(node).append('svg'));
	svg
	    .attr('viewBox', `0 0 ${width} ${height}`)
	    .style('width', '100%')
	    .style('height', '${height}');


	var i;
	for (i = 0; i < props.a; i++) { 
	    svg
		.append('circle')
		.attr('r', r)
		.attr('cx', width / 2 - r - i % num_cols * 2 * r)
		.attr('cy', height - r - Math.floor( i / num_cols) * 2 * r)
		.style("fill", acolor);
	}
	
	for (i = 0; i < props.b; i++) { 
	    svg
		.append('circle')
		.attr('r', r)
		.attr('cx', width/2 + r + i % num_cols * 2 * r)
		.attr('cy', height - r - Math.floor( i / num_cols) * 2 * r)
		.style("fill", bcolor);
	}
    }

    update(props, oldProps) {
	var color;
	var pos;
	var offset;
	var sign;
	if (props.a == oldProps.a + 1) {
	    color = acolor;
	    offset = width / 2;
	    sign = -1;
	    pos = oldProps.a;
	} else {
	    color = bcolor;
	    offset = width / 2;
	    sign = 1;
	    pos = oldProps.b;
	}
	
	this.svg
	    .append('circle')
	    .attr('r', r)
	    .attr('cx', offset + sign * (r + pos % num_cols * 2 * r))
	    .attr('cy', 0)
	    .style("fill", color);
	
	this.svg
	    .select('circle:last-child')
	    .transition()
	    .ease(d3.easeExp)
	    .duration(500)
	    .attr('cy', height - r - Math.floor(pos / num_cols) * 2 * r);
    }
}

module.exports = CustomD3Component;
