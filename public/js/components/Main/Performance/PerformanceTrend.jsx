var React = require('react')
var Helpers = require('react-scroll').Helpers

// views
var TrendLineChart = require('./Chart/PerformanceTrendChart.jsx')

var style = {
	marginBottom: '285px'
}

var PerformanceTrend = React.createClass({
	render: function() {
		return (
			<div className="MainViews-Item" style={style}>
				<h1>Performance Trends</h1>
				<TrendLineChart />			
			</div>
		)
	}

});

module.exports = Helpers.Element(PerformanceTrend);