var React = require('react')
var shortId = require('shortid')
var PureRenderMixin = require('react-addons-pure-render-mixin');


// component 
var OverviewItem = require('./OverviewItem.jsx');
var OverviewItemTCP = require('./OverviewItemTCP.jsx');

//action
var CustomerActions = require('../../actions/CustomerActions')
var OverviewActions = require('../../actions/OverviewActions')

// store 
var CustomerStore = require('../../stores/CustomerStore.jsx')
var OverviewStore = require('../../stores/OverviewStore.jsx')

var overviewStyle = {
	maxHeight: "65%",
	overflow: "auto",
	top: "80px"
	// transition: "all .3s ease 0s"
}

var Overview = React.createClass({

	mixins: [PureRenderMixin],

	topOffset: -150,

	getInitialState: function() {
		return { overviewIsShow: false, sites: []}
	},

	componentWillMount: function(){

		// listener
		CustomerStore.listen(this.showOverview)
	},

	componentWillUnount: function(){
		CustomerStore.unlisten(this.showOverview)
	},

	componentDidMount: function(){
		// get sites
		//CustomerActions.getSites();
	},

	componentDidUpdate: function(){
		this.topOffset = 0 - ( 150 + Math.floor( this.state.sites.length / 2.0001 ) * 109 )
	},

	showOverview: function(state){

		// var sites = []

		// object to array
		// for( var site in state.user.sites ){
		// 	sites.push( state.user.sites[site] )
		// }

		overviewStyle.top = "80px"

		if(state.monitorMode){
			
			var topOffset = 0 - ( 150 + Math.floor( state.sites.length / 2.0001 ) * 109 )

			$("#Overview").animate({top: topOffset + 'px'}, 0);
		}

		this.setState({ sites: state.sites })
	},

	toggleOverview: function(){

		if(this.isClose)
			$("#Overview").animate({top:"80px"}, 200);
		else
			$("#Overview").animate({top: this.topOffset -50 + 'px'}, 200);

		this.isClose = !this.isClose
	},

	hideOverview: function(e){

		if(e) e.preventDefault();

		// var topOffset = 0 - ( 150 + Math.floor( this.state.sites.length / 2.0001 ) * 109 )

		$("#Overview").animate({top: this.topOffset -50 + 'px'}, 200);
		
		this.isClose = true;
	},

	renderSites: function(){

		var self = this;
    
    var sites = this.state.sites.map( function(item){

      if(item.servicetype === 'web')
        return ( <OverviewItem site={item} key={shortId.generate()} hideOverview={self.hideOverview}/> )
      else
        return ( <OverviewItemTCP site={item} key={shortId.generate()} hideOverview={self.hideOverview}/> )
    });

    return (sites)
	},

	render: function() {

	    return (
        <session >
  				<div id="Overview"  style={overviewStyle}>
  					<h1>Choose a site you’re like to monitor.</h1>
  					<ul className="websites clearfix"> 
  						{this.renderSites()}
  					</ul>
  					<a href="" onClick={this.hideOverview}></a>
  				</div>
        </session>
	    );
	}

});

module.exports = Overview;