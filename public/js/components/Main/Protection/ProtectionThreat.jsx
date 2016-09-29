var React = require('react')
var Scroll = require('react-scroll')
var Helpers = Scroll.Helpers

// mixin
var AppMixin = require('../../Mixins/AppMixin.jsx')

var WorldMap = require('./Chart/TreatMap.jsx')
var DataTable = require('./DataTable.jsx')

var WAFStore = require('../../../stores/WAFStore.jsx')

var ProtectionThreat = React.createClass({

	mixins: [AppMixin], 

	getInitialState: function(){

		var siteId = this.getSiteId()

		if( siteId === "" ){
			return { data: [], map: {} }
		}
		else{
			return { data: WAFStore.getState().cddWAFTop10IP[siteId]['data'], map: WAFStore.getState().cddWAFTop10IP[siteId]['map'] }
		}
	},

	componentDidMount: function(){

		WAFStore.listen( this.onChange )

		// this.setState( { cddWAFTop10IP: WAFStore.getState().cddWAFTop10IP })
	},

	componentWillUnmount: function(){
		WAFStore.unlisten( this.onChange )
	},

	// shouldComponentUpdate(nextProps, nextState){
	// 	return this.state.data.length !== nextState.data.length
	// },

	onChange: function(state){

		var siteId = this.getSiteId()

    if( siteId === "" ) return

		this.setState( { data: state.cddWAFTop10IP[siteId]['data'], map: state.cddWAFTop10IP[siteId]['map'] } )
	},

  	render: function() {

	    return (
	    	<div className="">
				<h1>Threats</h1>
				<WorldMap data={this.state.map} color="#ABDDA4" />
				<DataTable data={this.state.data} />
			</div>
	    );
  	}

});

module.exports = Helpers.Element(ProtectionThreat);