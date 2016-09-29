var React = require('react');
var Scroll = require('react-scroll')

var LiveMap = require('./Chart/LiveMap.jsx')
var DataTable = require('./DataTable.jsx') 

var Helpers = Scroll.Helpers

// store
var TrackerStore = require('../../../stores/TrackerStore.jsx')

var BPLiveMap = React.createClass({

	now: new Date().getTime(),

	getInitialState: function(){
		return { clusters: TrackerStore.getState().clusters, 
				 actions: TrackerStore.getState().rawData}
	},

	componentDidMount: function(){
		TrackerStore.listen(this.onChange)
	},

	componentWillUnmount: function(){
		TrackerStore.unlisten(this.onChange)
	},

	onChange: function(state){

		var time = new Date().getTime()

		if( time - this.now > 500 ){
			this.setState( { clusters: state.clusters, actions: state.rawData } );
			this.now = time;
		}
	},

	render: function() {
		return (
			<div className="LiveMaps MainViews-Item" >
				<h1>Pageviews</h1>
				<LiveMap clusters={this.state.clusters} />
				<DataTable actions={ this.state.actions}/>
			</div>
		);
	}

});

module.exports = Helpers.Element(BPLiveMap);