const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');

class WeightedWordList extends D3Component {

    loadData(props) {
	fetch(props.src)
	    .then((response) => {
		return response.text();
	    }).then((text) => {
		const parsed = d3.csvParse(text);
		props.updateProps({ value: parsed });
	    })
    }

    initialize(node, props) {
	
	var width = 960,
	    height = 500;

	const svg = (this.svg = d3.select(node).append('svg'));
	svg.append("rect")
	    .attr("width", "100%")
	    .attr("height", "100%")
	    .attr("fill", "white");
	
	svg
	    .attr('viewBox', `0 0 ${width} ${height}`)
	    .style('width', '100%')
	    .style('height', '${height}');

	var g = svg.append("g");
	
	d3.csv(props.src, function(data) {		
	    console.log(data[0]);
	    svg.selectAll("text")
		.data(data)
		.enter()
		.append("text") // append text
		.attr("x", 200)
		.attr("y", 400)
		.attr("dy", -7) // set y position of bottom of text
		.style("fill", "black") // fill the text with the colour black
		.attr("text-anchor", "middle") // set anchor y justification
		.text( function(d) { d.count + 200; }); // define the text to display
	});	
    }

    update(props, oldProps) {
	if (props.load) {
	    this.loadData(props);
	}
    }
}

module.exports = WeightedWordList;
