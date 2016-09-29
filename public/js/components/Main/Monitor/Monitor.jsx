var React = require('react')
var shortId = require('shortid')
// mixins
import withRouter from 'react-router/lib/withRouter';

// actions
var MonitorActions = require('../../../actions/MonitorActions.jsx')

// actions
var CustomerActions = require('../../../actions/CustomerActions.jsx')
var SettingActions = require('../../../actions/SettingActions')

// stores
var CustomerStore = require('../../../stores/CustomerStore.jsx')
var MonitorStore = require('../../../stores/MonitorStore.jsx')

var style = {

	margin: '0 0 200px 0'
}

var divStyle = {
	minHeight: '590px',
    textAlign: 'left',
    padding: '0px',
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'relative'
}

var Monitor = React.createClass({


	getInitialState: function() {
		// return to top
		window.scrollTo(0, 0);
		
		return { sites: MonitorStore.getState().sites, filterString: ''}
	},

	componentWillMount: function(){

		// listener
		CustomerStore.listen(this.onCustomerStoreChange)
		MonitorStore.listen(this.onMonitorStoreChange)
	},

	componentDidMount: function(){

		$('#HUD').hide()
		$('#site-switch').hide()
		$('#tab').show()

		$('#tab_title').text('Monitor')

		if(!CustomerStore.getState().user.roles || CustomerStore.getState().user.roles.indexOf('admin') !== -1)
			MonitorActions.getCustomerList()
	},

	componentWillUnmount: function(){

		$('#HUD').show()
		$('#site-switch').show()
		$('#tab').hide()

		CustomerStore.unlisten(this.onCustomerStoreChange)
		CustomerStore.unlisten(this.onMonitorStoreChange)
	},

	onCustomerStoreChange: function( state ){

		var user = state.user

		if( user.username === 'admin@nxg.com' )
			MonitorActions.getCustomerList()
		else
			this.props.router.push( '/' )
	},

	onMonitorStoreChange: function( state ){
		this.setState({ sites: state.sites })
	},

	filter: function(evt){
		this.setState( { filterString: evt.target.value})
	},

	switcher: function(site){

		var sites = MonitorStore.getSites(site.cid)

		this.props.router.push( '/' )

		CustomerActions.monitorCustomer( { cid: site.cid, sites: sites } )

		setTimeout( SettingActions.setSite.bind(this, site), 1000  )
	},

	renderCustomer: function(){

		var self = this

		var filterString = this.state.filterString

		var sites = this.state.sites.filter(function(site){

			// search 
			var regex = new RegExp( filterString , 'i')

			let searchCustomer = site.customername.search(regex)
			let searchSite = site.sitename.search(regex)

			return (searchCustomer + searchSite === -2 )? false : true

		}).map( function(site){

			return (
				<tr key={site.key}>
					<td>{site.customername}</td>
					<td>{site.sitename}</td>
					<td><a className="btn_upload" onClick={self.switcher.bind( null, site)} ></a></td>
				</tr>
			)

		});

		return (sites)
	},

	render: function() {
		return (
			<section className="Monitor-content">		
				<div id="CustomerMainView" className="MemberForm MainViews-Item" style={divStyle}>
					<h2>Site Switcher</h2>
					<h4>Yep , it's just a site switcher!</h4>
					Search Keyword : <input type="text" onChange={this.filter}/><br/><br/>
					
					<table width="100%" border="0" cellSpacing="0" cellPadding="0" className="upload_table" style={style}>
						<thead>
							<tr>
								<th width="20%">Customer</th>
								<th width="55%">Domain Name</th>
								<th width="15%">Monitor</th>
							</tr>
						</thead>
						<tbody>
							{this.renderCustomer()}
						</tbody>
					</table>
				</div>
			</section>
		);
  }

});

module.exports = withRouter(Monitor);