var React = require('react')
var Scroll = require('react-scroll')
var Helpers = Scroll.Helpers

// views
var TrendLineChart = require('./Chart/WebTrendChart.jsx')

var BPTrend = React.createClass({
	render: function() {
		return (
			<div className="MainViews-Item">
				<h1>WEBSITE TRENDS</h1>
				<TrendLineChart />
			</div>
		)
	}

});

module.exports = Helpers.Element(BPTrend);