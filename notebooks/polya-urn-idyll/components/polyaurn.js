const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');

const width = 650;
const height = 260;
const acolor = "Orange";
const bcolor = "CornflowerBlue";
const text_color = "#888888";
const num_cols = 15;
const r = Math.floor(width / 2 / num_cols / 2);
const line_offset = 2;
const text_padding = 4;


function init_urn(svg, a0, b0) {
    var i;
    for (i = 0; i < a0; i++) {
	svg
	    .append('circle')
	    .attr('r', r)
	    .attr('cx', width / 2 - r - i % num_cols * 2 * r)
	    .attr('cy', height - r - line_offset - Math.floor(i / num_cols) * (line_offset + 2 * r))
	    .style("stroke", 'black')
	    .style("stroke-width", 2)
	    .style("fill", acolor);
    }
    
    for (i = 0; i < b0; i++) {
	svg
	    .append('circle')
	    .attr('r', r)
	    .attr('cx', width / 2 + r + i % num_cols * 2 * r)
	    .attr('cy', height - r - line_offset - Math.floor(i / num_cols) * (line_offset + 2 * r))
	    .style("stroke", 'black')
	    .style("stroke-width", 2)
	    .style("fill", bcolor);
    }
}

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


	init_urn(svg, props.a0, props.b0);
	
	const txt = svg.append("text")
	      .attr("x", 5)
	      .attr("y", 25)
	      .text( "Ratio b / (a + b) = " )
	      .attr("font-family", "sans-serif")
	      .attr("font-size", "18px")
	      .attr("fill", text_color);

	const bbox = txt.node().getBBox();
	const txt_num = svg.append("text")
	    .attr("x", bbox.x + bbox.width + 5)
	    .attr("y", txt.attr("y"))
            .attr("id", "ratio")
	    .text(d3.format(",.2f")(props.b0 / (props.a0 + props.b0)))
	    .attr("font-family", "sans-serif")
	    .attr("font-size", "18px")
	    .attr("fill", (props.b0 > props.a0) ? bcolor : acolor);

	svg.append("rect")
	    .attr("x", bbox.x - text_padding)
	    .attr("y", bbox.y - text_padding)
	    .attr("width", bbox.width + txt_num.node().getBBox().width + 5 + 2 * text_padding)
	    .attr("height", bbox.height + 2 * text_padding)
	    .attr("fill", "none")
	    .style("stroke", text_color)
	    .style("stroke-width", 1);
    }

    update(props, oldProps) {
	this.svg.selectAll("svg > circle").remove();
	init_urn(this.svg, props.a0, props.b0);
	
	var a = props.a0;
	var b = props.b0;
	var color;
	var pos;
	var offset;
	var sign;
	const max_balls = (Math.floor(height / (2 * r + line_offset)) - 1) * num_cols

	if (oldProps.run) {
	    while ((a < max_balls) & (b  < max_balls)) {
		if (Math.random() > b / (a + b)) {
		    color = acolor;
		    sign = -1;
		    pos = a++;
		} else {		    
		    color = bcolor;
		    sign = 1;
		    pos = b++;
		};
		
		this.svg
		    .append('circle')
		    .attr('r', r)
		    .attr('cx', width / 2 + sign * (r + pos % num_cols * 2 * r))
		    .attr('cy', - r)
		    .style("fill", color);
		
		this.svg
		    .select('circle:last-child')
		    .transition()
		    .ease(d3.easeExp)
		    .duration(500)
		    .delay((a + b) * 5)
		    .attr('cy', height - r - line_offset  - Math.floor(pos / num_cols) * (line_offset + 2 * r));
	    }
	}
	
	d3.select('#ratio')
	    .text(d3.format(",.2f")(b / (a + b)))
	    .attr("fill", (b > a) ? bcolor : acolor);
	props.updateProps({
	    run: false
	})
    }
}

module.exports = PolyaUrn;
