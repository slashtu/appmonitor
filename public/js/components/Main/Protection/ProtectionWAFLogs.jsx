var React = require('react');
var Scroll = require('react-scroll');
var Helpers = Scroll.Helpers;

// mixin
var AppMixin = require('../../Mixins/AppMixin.jsx');

var WAFLogStore = require('../../../stores/WAFLogStore.jsx');

var tableStyle = {
	width: "100%"
};

var style = {
	marginBottom: '285px'
};

var ProtectionWAFLogs = React.createClass({

	mixins: [AppMixin],

	getInitialState: function(){

		var siteId = this.getSiteId();

		if( siteId === "" )
			return { log: []};
		else
			return { log:  WAFLogStore.getState().cddWAFLog };
	},

	componentDidMount: function(){

		WAFLogStore.listen( this.onChange );

		// this.setState( { cddWAFTop10IP: WAFStore.getState().cddWAFTop10IP })
	},

	componentWillUnmount: function(){
		WAFLogStore.unlisten( this.onChange );
	},

	onChange: function(state){
		this.setState( { log: state.cddWAFLog } );
	},

	renderLog: function(){

		var log = this.state.log.map(function( attack ){

			return ( 
				<tr key={attack.id}>
					<td>{attack.client}</td>
					<td>{attack.time}</td>
					<td>
						<a href={"http://" + attack.url} target="_blank">{attack.url}</a>
					</td>
					<td>{attack.category}</td>
					<td>Blocked</td>
				</tr>
			);
		})
		
		return log;	
	},

	render: function() {
		return (
			<div className="" anchor="WAFLogs" style={style}>
				<h1>Web Application Attack Log</h1>
				<div className="Datatables WAFLogs">
					<div>
						<div className="clearfix">
							<label>Web Application Attack Log</label>
						</div>
					</div>
					<div className="DatatablesTable">
						<table ng-show="Datatables.WAFLogs" style={tableStyle}>
							<thead>
								<tr>
									<th>IP Address</th>
									<th>Time</th>
									<th>URL</th>
									<th>Category</th>
									<th>Result</th>
								</tr>
							</thead>
							<tbody>
								{this.renderLog()}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
  }

});

module.exports = Helpers.Element(ProtectionWAFLogs);