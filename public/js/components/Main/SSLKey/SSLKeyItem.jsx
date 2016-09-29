var React = require('react')

var status = {
	color: 'red'
}


var SSLKeyItem = React.createClass({

	crt: null,
	key: null,

	getInitialState: function() {
		return { status: "N/A"}
	},

	handleCRT(e){
		// console.log(e.target.files)
		// console.log(e.target.value.split(/(\\|\/)/g).pop())

		this.crt = e.target.files[0]
	},

	handleKey(e){
		this.key = e.target.files[0]
	},

	upload: function(){

		//React.findDOMNode(this.refs.form).submit()
		var myFormData = new FormData()

		// req.body
		myFormData.append('siteid', this.props.site.siteid)
		myFormData.append('siteurl', this.props.site.sitename)
		myFormData.append('sitename', this.props.site.sitename)

		// req.files
		myFormData.append('crt', this.crt, this.crt.name)
		myFormData.append('key', this.key, this.key.name)



		var self = this

		this.setState({status: 'Processing'})

		$.ajax({
		  url: '/ssl/upload',
		  type: 'POST',
		  processData: false, // important
		  contentType: false, // important
		  data: myFormData,

		  success: function(data){
		  	// console.log(data)
		  	// self.setState({status: data.uploadStatus})
		  	if(data.uploadStatus === 'success')
		  		self.setState({status: 'Deployed'})
		  	else{
		  		console.log( '/ssl/upload failure', err )
		  		self.setState({status: 'failure'})
		  	}
		  },

		  error: function(err){
		  	console.log( '/ssl/upload error', err )
		  	self.setState({status: 'error'})
		  }

		});
	},

	render: function() {

		// console.log(this.props.site)

		return (
			<tr >
				<td>{this.props.site.sitename}</td>
				<td>{this.state.status}</td>
				<td>
					<span id=" site._id _crt_upload" style={status} ></span>
					<input type="file" name="crt" className="upload" accept=".crt" title="Choose a file to upload" onChange={this.handleCRT}/>
				</td>
				<td>
					<span id=" site._id _key_upload" style={status} ></span>
					<input type="file" name="key" className="upload" accept=".key" title="Choose a file to upload" onChange={this.handleKey}/>
				</td>
				<td><a className="btn_upload" onClick={this.upload} ></a></td>
			</tr>
		);
  }

});

module.exports = SSLKeyItem;