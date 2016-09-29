var React = require('react')

var shortId = require('shortid')

var CountTo = require('../Widget/CountTo.jsx')

//action
// var OverviewActions = require('../../actions/OverviewActions')
var SettingActions = require('../../actions/SettingActions')

// store 
var OverviewStore = require('../../stores/OverviewStore.jsx')
var TrackerStore = require('../../stores/TrackerStore.jsx')

var anchorStyle = {
	position: "relative"
}

var Overview = React.createClass({

	getInitialState: function() {
		return {}
	},

	componentWillMount: function(){},

	componentDidMount: function(){

		// regist 
		OverviewStore.listen(this.onOverviewChange)
		TrackerStore.listen(this.onTrackerChange)
	},

	componentWillUnmount: function() {
  		OverviewStore.unlisten(this.onOverviewChange)
  		TrackerStore.unlisten(this.onTrackerChange)
	},

	// on-line user
	onTrackerChange: function(state){

		if( state.onlineUser[this.props.site.siteid] ){
			this.refs.onlineUser.to(state.onlineUser[this.props.site.siteid])
		}
	},

	shouldComponentUpdate: function() {
	    return false
  },

	setSite: function(){

		this.props.hideOverview()

		if(this.props.path === "/MainTCPProxy")
			this.transitionTo( '/' )

		setTimeout( SettingActions.setSite.bind(this, this.props.site), 300  )
	},

	onOverviewChange: function(data) {

		var state = data.sites[this.props.site.siteid]

		if( !state ) return

		this.refs.threats.to(state.threat)
		this.refs.cache.to(state.cacheratio)
		this.refs.pageViews.to(state.pageviews)
		this.refs.visitors.to(state.visitors)
	},

	render: function() {

	    return (
	        <li className="Site.AnomalyStatus" onClick={this.setSite}>						
				<a style={anchorStyle} href="" onClick={ function(e){ e.preventDefault() } }>{this.props.site.sitename}</a>
				<div className="clearfix">
					<div>
						<CountTo ref="onlineUser" end={0} begin={0} time={100} easing="inoutSine" />
						<label>Online Users</label>
					</div>
					<div>
						<CountTo ref="threats" end={0} begin={0} time={3000} easing="inoutSine" />
						<label>Threats</label>
					</div>
					<div>
						<CountTo ref="cache" type="%"  end={0} begin={0} time={3000} easing="inoutSine" />
						<label>Cache Ratio</label>
					</div>
					<div>
						<div className="clearfix">
							<label>Page Views</label>
							<CountTo ref="pageViews" end={0} begin={0} time={3000} easing="inoutSine" />
						</div>
						<div className="clearfix">
							<label>Visitors</label>
							<CountTo ref="visitors" end={0} begin={0} time={3000} easing="inoutSine" />
						</div>
					</div>
				</div>
			</li>
	    );
	}

});

module.exports = Overview;