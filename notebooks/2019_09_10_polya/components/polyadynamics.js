const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');

const width = 650;
const height = 250;
const widget_height = 250;
const acolor = "Orange";
const bcolor = "CornflowerBlue";
const text_color = "#222222";
const num_cols = 15;
const r = Math.floor(width / 2 / num_cols / 2);
const line_offset = 2;
const text_padding = 4;


function init(svg, a0, b0, num_steps) {
    let y0 = height * (1 - b0 / (a0 + b0));
    svg.append("line")  
	.style("stroke", "black") 
        .style("stroke-dasharray", ("3, 3")) 
	.style("opacity", 0.8)
	.attr("x1", 0) 
	.attr("y1", y0) 
	.attr("x2", (num_steps + 1) * 10)   
	.attr("y2", y0);

    let vgap = 20;
    let vheight = 26;
    let hgap = 8;
    let hwidth = 65;

    let y0_t = (b0 > a0)? y0 + vgap + vheight : y0;
    svg.append("text")
	.attr("x", width - hgap - hwidth + 5)
	.attr("y", y0_t - vgap)
	.text( "Y")
	.attr("font-family", "sans-serif")
	.attr("font-size", "16px")
	.attr("fill", text_color)
	.append('tspan')
	.text('0')
	.style('font-size', '10px')
	.attr('dx', '-.2em')
	.attr('dy', '.7em');

    svg.append("text")
	.attr("x",  width - hgap - hwidth + 15)
	.attr("y", y0_t - vgap)
	.text( "= " + d3.format(",.2f")(b0 / (a0 + b0)))
	.attr("font-family", "sans-serif")
	.attr("font-size", "16px")
	.attr("fill", text_color);
    
    svg.append("rect")
	.attr("id", "text_box")
	.attr("x", width - hwidth - hgap)
	.attr("y", y0_t - vgap - 17)
	.attr("width", hwidth)
	.attr("height", vheight)
	.attr("fill", "none")
	.style("stroke", text_color)
	.style("stroke-width", 1);
}

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
	init(svg, props.a0, props.b0, props.num_steps);
    }

    update(props, oldProps) {
	this.svg.selectAll("svg > circle").remove();
	this.svg.selectAll("svg > line").remove();	
	this.svg.selectAll("svg > text").remove();	
	d3.select('#text_box').remove();
	init(this.svg, props.a0, props.b0, props.num_steps);
	
	if (oldProps.run) { 	    
	    let duration = 2200 / props.num_steps;
	    var i = 0;
	    var j = 0;
	    var b = Array(props.num_runs).fill(props.b0);
	    for (i=0; i < props.num_steps; i++) {	    
		for (j=0; j < props.num_runs; j++) {
		    let adrawn = Math.random() > b[j] / (props.a0 + props.b0 + i);
		    if (!adrawn) {b[j]++;}		
		    
		    this.svg.append("line") 
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
		this.svg.append("circle")
		    .transition()
		    .duration(duration)
		    .delay(i * duration)
		    .attr("cx", i * 10)
		    .attr("cy", height * (1 - avg / (props.b0 + props.a0 + i + 1)))
		    .attr("r", 3)
		    .style("fill", "Tomato");
	    }
	}
	
	props.updateProps({
	    run: false
	})
    }
}

module.exports = PolyaDynamics;
