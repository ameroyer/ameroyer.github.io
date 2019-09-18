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
		.attr("x", 100)
	    .attr("y", function(d) { return d.count * 100;})
		.style("fill", "black") // fill the text with the colour black
		.attr("text-anchor", "middle") // set anchor y justification
		.text(function(d) {return d.name;}); // define the text to display	
    }

    update(props, oldProps) {
	if (props.load) {
	    this.loadData(props);
	}
    }
}

module.exports = WeightedWordList;
