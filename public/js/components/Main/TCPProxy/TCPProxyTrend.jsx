var React = require('react')
var Scroll = require('react-scroll')
var Helpers = Scroll.Helpers

// views
var TrendLineChart = require('./Chart/TrendLineChart.jsx')

var TCPProxyTrend = React.createClass({
  render: function() {
    return (
      <div style={{padding: '0px'}}>
        <h1>TCP PROXY PROTECTION</h1>
        <TrendLineChart />      
      </div>
    )
  }

});

module.exports = Helpers.Element(TCPProxyTrend);