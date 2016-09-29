var React = require('react');

var Cluster = require('../../../Widget/Cluster.jsx')

var LiveMap = React.createClass({

	renderCluster: function(){

		var clusters = this.props.clusters.filter(function(item){ return item.count > 0 }).map( function( cluster ){

			return ( <Cluster key={cluster.id} top={cluster.top} left={cluster.left} text={cluster.count}/> )
		})

		return clusters
	},

	render: function(){
		
		return (
			<div className="angular-google-map-container" >
				{this.renderCluster()}
			</div>
		);
	}

});

module.exports = LiveMap;