let React = require('react');

let Lib = require('../../../../lib/Lib.js')

// let CountTo = require('../Widget/CountTo.jsx')

let addDays = function( n ){
	var time = new Date().getTime()
  return new Date(time + (n * 24 * 60 * 60 * 1000))
}

let daysArr = [
	addDays(0).getMonth() + 1 + '/' + addDays(0).getDate(),
	addDays(-1).getMonth() + 1 + '/' + addDays(-1).getDate(),
	addDays(-2).getMonth() + 1 + '/' + addDays(-2).getDate(),
	addDays(-3).getMonth()+ 1 + '/' + addDays(-3).getDate(),
	addDays(-4).getMonth()+ 1 + '/' + addDays(-4).getDate(),
]

let Center = React.createClass({

	getInitialState: function(){
		return {style: {display: 'none'}}
	},

	renderCenters: function(){

	},

	show: function(){
		this.setState({style:{display: 'block'}})
	},

	hide: function(){

		this.setState({style:{display: 'none'}})
	},

  	render: function() {

	    return (	
			<div className={this.props.className} onMouseOver={this.show} onMouseOut={this.hide}>
				<label className={this.props.labelClassName}>
					<div>{ Lib.numberFormat(this.props.count) + '' || ''}</div>
				</label>
				<div style={this.state.style}>
					<label>{this.props.label}</label>
					<i>Scrubbing Center Status</i>
					<ul className="clearfix">
						<li  className="status-{day.status}">
							<label>{daysArr[0]}</label>
						</li>
						<li  className="status-{day.status}">
							<label>{daysArr[1]}</label>
						</li>
						<li  className="status-{day.status}">
							<label>{daysArr[2]}</label>
						</li>
						<li  className="status-{day.status}">
							<label>{daysArr[3]}</label>
						</li>
						<li  className="status-{day.status}">
							<label>{daysArr[4]}</label>
						</li>
					</ul>
				</div>
			</div>			
	    );
  	}

});

module.exports = Center;