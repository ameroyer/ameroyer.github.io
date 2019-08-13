const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');

const width = 650;
const height = 250;
const acolor = "Orange";
const bcolor = "CornflowerBlue";
const text_color = "#888888";
const num_cols = 8;
const r = Math.floor(width / 2 / num_cols / 2);


class PolyaUrn extends D3Component {
    initialize(node, props) {
	const svg = (this.svg = d3.select(node).append('svg'));
	svg.append("rect")
	    .attr("width", "100%")
	    .attr("height", "100%")
	    .attr("fill", "white");
	
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
	
	const txt = svg.append("text")
	      .attr("x", 5)
	      .attr("y", 25)
	      .text( "Ratio b / (a + b) = " )
	      .attr("font-family", "sans-serif")
	      .attr("font-size", "18px")
	      .attr("fill", text_color);

	const bbox = txt.node().getBBox();
	svg.append("text")
	    .attr("x", bbox.x + bbox.width + 5)
	    .attr("y", txt.attr("y"))
            .attr("id", "ratio")
	    .text(d3.format(",.2f")(props.b / (props.a + props.b)))
	    .attr("font-family", "sans-serif")
	    .attr("font-size", "18px")
	    .attr("fill", (props.b > props.a) ? bcolor : a_color);
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
	if (props.a > props.b) {
	    color = acolor;
	} else {
	    color = bcolor;
	}
	d3.select('#ratio')
	    .text(d3.format(",.2f")(props.b / (props.a + props.b)))
	    .attr("fill", (props.b > props.a) ? bcolor : a_color);
    }
}

module.exports = PolyaUrn;
