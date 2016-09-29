var React = require('react')
var Scroll = require('react-scroll'); 

var Link = Scroll.Link;
var scrollSpy = Scroll.scrollSpy;
// views
var BPLiveMap = require('./BPLiveMap.jsx')
var BPTrend = require('./BPTrend.jsx')
var BPAnalytic = require('./BPAnalytic.jsx')

var style = {
  right: '50px',
  display: 'block'
}

var MainBP = React.createClass({
  componentDidMount:function () {
		scrollSpy.scrollHandler(document);
  },
	render: function() {
		return (
			<section id="MainViews-Biz">
				<BPLiveMap name="BPLiveMap"/>
				<BPTrend name="BPTrend"/>
				<BPAnalytic name="BPAnalytic"/>
				<ul className="MainViewsMenu" style={style}>
	                <li>
	                    <Link to="BPLiveMap" spy={true} smooth={true} offset={-250} duration={500}></Link>
	                </li>
	                <li>
	                    <Link to="BPTrend" spy={true} smooth={true} offset={-300} duration={500}></Link>
	                </li>
	                <li>
	                    <Link to="BPAnalytic" spy={true} smooth={true} offset={-150} duration={500}></Link>
	                </li>
            	</ul>
			</section>
		);
	}

});

module.exports = MainBP;