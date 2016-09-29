import React from 'react'
import Scroll from 'react-scroll'

const Helpers = Scroll.Helpers

// views
import TrendLineChart from '../Chart/TrendLineChart.jsx'

var ProtectionTrend = React.createClass({
	render: function() {
		return (
			<div className="">
				<h1>PROTECTION TRENDS</h1>
				<TrendLineChart />			
			</div>
		)
	}

});

module.exports = Helpers.Element(ProtectionTrend);