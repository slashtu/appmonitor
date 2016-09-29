var React = require('react')
var Scroll = require('react-scroll') 

var Link = Scroll.Link;
var scrollSpy = Scroll.scrollSpy;
// views
var PerformanceIDC = require('./PerformanceIDC.jsx');
var PerformanceTrend = require('./PerformanceTrend.jsx');


// CSS
var style = {
  right: '50px',
  display: 'block'
}

var MainProtection = React.createClass({
  componentDidMount:function() {
    scrollSpy.scrollHandler(document);
  },
  render: function() {
    return (
    	<section id="MainViews-Performance">
    		<PerformanceIDC name="PerformanceIDC"/>
    		<PerformanceTrend name="PerformanceTrend"/>
    		<ul className="MainViewsMenu" style={style}>
				<li>
					<Link to="PerformanceIDC" spy={true} smooth={true} offset={-200} duration={500}></Link>
				</li>
				<li>
					<Link to="PerformanceTrend" spy={true} smooth={true} offset={-200} duration={500}></Link>
				</li>
			</ul>
    	</section>
    );
  }

});

module.exports = MainProtection;