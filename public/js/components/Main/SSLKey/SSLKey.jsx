var React = require('react')
var shortId = require('shortid')

var SSLKeyItem = require('./SSLKeyItem.jsx')

var CustomerStore = require('../../../stores/CustomerStore.jsx')

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

var SSLKey = React.createClass({

	getInitialState: function() {
		return { sites: CustomerStore.getState().sites}
	},

	componentWillMount: function(){

		// listener
		CustomerStore.listen(this.onChange)
	},

	componentDidMount: function(){
		$('#HUD').hide()
		$('#site-switch').hide()
		$('#tab').show()

		$('#tab_title').text('SSL Key Manager')
	},

	componentWillUnmount: function(){

		$('#HUD').show()
		$('#site-switch').show()
		$('#tab').hide()

		CustomerStore.unlisten(this.onChange)
	},

	onChange: function( state ){

		this.setState({ sites: state.sites })
	},

	renderSites: function(){

		var sites = this.state.sites.map( function(item){

			return (
				<SSLKeyItem site={item} key={shortId.generate()} />
			)

		});

		return (sites)
	},

	render: function() {
		return (
			<section className="SSLKey-content">		
				<div id="CustomerMainView" className="MemberForm" style={divStyle}>
					<h2>SSL Key Upload</h2>
					<h4>Please do not encrypt files to be uploaded and remove pass phrases when generating the private key. Files should be uploaded in plain RSA format.</h4>
					<h4>‧Certificate file extension should be .crt, .pem, or .cer.</h4>
					<h4>‧Private Key extension should be .key.</h4>
					
					
					<table width="100%" cellSpacing="0" cellPadding="0" className="upload_table" style={style}>
						<thead>
							<tr>
								<th width="35%">Domain Name</th>
								<th width="15%">Process Status</th>
								<th width="20%">Certificate File</th>
								<th width="20%">Private Key</th>
								<th width="10%">Upload</th>
							</tr>
						</thead>
						<tbody>
							{this.renderSites()}
						</tbody>
					</table>
				</div>
			</section>
		);
  }

});

module.exports = SSLKey;