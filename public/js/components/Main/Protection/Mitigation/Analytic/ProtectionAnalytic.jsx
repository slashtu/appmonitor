var React = require('react');
var Scroll = require('react-scroll')

var Helpers = Scroll.Helpers

// views
var AnalyticPieChart = require('../Chart/AnalyticPieChart');

var ProtectionAnalytic = React.createClass({
	render: function() {
		return (
			<div className="" anchor="ThreatsAnalytic">
				<h1>Threats Analytics</h1>
				<AnalyticPieChart />	
			</div>
		)
	}
});

module.exports = Helpers.Element(ProtectionAnalytic);
