var React = require('react');
var Helpers = require('react-scroll').Helpers

var PerformanceDataCenterMap = require('./Chart/PerformanceDataCenterMap')

var PerformanceIDC = React.createClass({
  	render: function() {
	    return (
	    	<div className="DataCenterMaps MainViews-Item">
				<h1>Scrubbing Centers</h1>
				<h2>Mouse over to reveal more details about the scrubbing centers,<br/>as well as its service status over the past 5 days.</h2>
				<div className="DataCenterMapsCanvas"></div>
				<PerformanceDataCenterMap />
				<ul className="clearfix">
					<li>
						<h1>Online</h1>
						<div>System is operating at peak performance.</div>
					</li>
					<li>
						<h1>Degradation</h1>
						<div>Performance is slower than normal.</div>
					</li>
					<li>
						<h1>Maintenance</h1>
						<div>While we tune-up, traffic will be re-routed elsewhere.</div>
					</li>
					<li>
						<div className="top"></div>
						<h1>Offline</h1>
						<div>No activity is detected at this scrubbing center.</div>
					</li>
				</ul>
			</div>
	    );
  	}

});

module.exports = Helpers.Element(PerformanceIDC);