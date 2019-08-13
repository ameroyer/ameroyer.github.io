const React = require('react');

const colors = {
  'a':   'Orange',
  'b': 'CornflowerBlue',
};

class Population extends React.Component {
    render() {

        const { idyll, hasError, updateProps, ...props } = this.props;
        let aSpanStyle = { fontWeight: '700', color: 'Orange' };
        let bSpanStyle = { fontWeight: '700', color: 'CornflowerBlue' };

        return (
		<span {...props} style={{color: colors[this.props.group]}} >
                  { this.props.text }
               </span>
        );
    }
}

module.exports = Population;
