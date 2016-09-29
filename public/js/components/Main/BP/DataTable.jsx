var React = require('react');

var DataTable = React.createClass({

	getInitialState: function(){
		return { isOpened: true }
	},

	componentDidMount: function(){
	
	},

	componentWillUnmount: function(){
		
	},

	onChange: function(state){

	},


	toggleDatatable: function(){

		this.setState({ isOpened: !this.state.isOpened })
	},

	renderActions: function(){
		var components = this.props.actions.map(function( action ){

			return ( 
				<tr key={action.id}>
					<td>{action.ip}</td>
					<td>{action.country}</td>
					<td>{action.city}</td>
					<td>
						<div>{action.gt_ms || 0}<i>ms</i></div>
					</td>
					<td>
						<a href={action.url} target="_blank">{action.url}</a>
					</td>
				</tr> )
		})
		return components						
	},

	render: function() {

		var toggleClass = ""
		var tableStyle = {}

		if(!this.state.isOpened){
			toggleClass = "DatatablesSmallOpen"
			tableStyle = { display: 'none' }
		}

		return (
			<div className="LiveMaps">
				<div className="Datatables LiveData">
					<div>
						<div className="clearfix" onClick={this.toggleDatatable}>
							<label>Live Data</label>
							<span className={"DatatablesSmall " + toggleClass}></span>
						</div>
					</div>
					<div className="DatatablesTable" style={tableStyle}>
						<table >
							<thead>
								<tr>
									<th>IP Address</th>
									<th>Country</th>
									<th>City</th>
									<th>PLT(ms)</th>
									<th>URL</th>
								</tr>
							</thead>
							<tbody>
								{this.renderActions()}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}

});

module.exports = DataTable;