const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');

const width = 650;
const height = 250;
const acolor = "Orange";
const bcolor = "CornflowerBlue";
const text_color = "#888888";
const num_cols = 15;
const r = Math.floor(width / 2 / num_cols / 2);
const line_offset = 2;
const text_padding = 4;


class PolyaDynamics extends D3Component {
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


	svg.append("line")  
	    .style("stroke", "black") 
            .style("stroke-dasharray", ("3, 3")) 
	    .style("opacity", 0.8)
	    .attr("x1", 0) 
	    .attr("y1", height * (1 - props.b0 / (props.a0 + props.b0 ) )) 
	    .attr("x2", (props.num_steps + 1) * 10)   
	    .attr("y2", height * (1 - props.b0 / (props.b0 + props.a0)));
	let duration = 2000 / props.num_steps;
	var i = 0;
	var j = 0;
	var b = Array(props.num_runs).fill(props.b0);
	for (i=0; i < props.num_steps; i++) {	    
	    for (j=0; j < props.num_runs; j++) {
		let adrawn = Math.random() > b[j] / (props.a0 + props.b0 + i);
		if (!adrawn) {b[j]++;}		
		
		svg.append("line") 
		    .style("stroke", "PowderBlue") 
		    .style("opacity", 0.35)
		    .transition()
		    .duration(duration)
		    .delay(i * duration)
		    .attr("x1", i * 10) 
		    .attr("y1", height * (1 - (adrawn? b[j]: b[j] - 1) / (props.a0 + props.b0 + i ) )) 
		    .attr("x2", (i + 1) * 10) 
		    .attr("y2", height * (1 - b[j] / (props.b0 + props.a0 + i + 1)));
	    }
	    
	    let sum = b.reduce((previous, current) => current += previous);
	    let avg = sum / b.length;
	    
	    svg.append("circle")
		.transition()
		.duration(duration)
		.delay(i * duration)
		.attr("cx", i * 10)
		.attr("cy", height * (1 - avg / (props.b0 + props.a0 + i + 1)))
		.attr("r", 3)
		.style("fill", "Tomato");
	}
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

module.exports = PolyaDynamics;
