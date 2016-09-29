var React = require('react');

var m1 = '/assets/images/cluster1.png'
var m2 = '/assets/images/cluster2.png'
var m3 = '/assets/images/cluster3.png'
var m4 = '/assets/images/cluster4.png'
var m5 = '/assets/images/cluster5.png'

var flash1 = "url('/assets/images/cluster1.png') no-repeat 0%"
var flash2 = "url('/assets/images/cluster1.png') no-repeat 100%"

var imgstyle = {
	position: 'absolute',
	top: '0px',
	left: '0px',
	// clip: 'rect(0px, 56px, 56px, 0px)' 
}

var divstyle = {
	position: 'absolute',
	top: "0px",
	left: "0px",
	color: "black",
	fontSize: "11px",
	fontFamily: "Arial,sans-serif",
	fontWeight: "bold",
	fontStyle: "normal",
	textDecoration: "none",
	textAlign: "center",
	// width: "56px",
	// lineHeight:"56px"
}

var clusterstyle = {
	cursor: "pointer",
	position: "absolute",

	// background: "url('/assets/images/cluster1.png') no-repeat 0%"
	// top: this.props.top,
	// left: this.props.left,
	// width: '56px',
	// height: '56px'
}

var LiveMap = React.createClass({

	count: 0,

	shouldComponentUpdate( nextProps, nextState){

		if( nextProps.text === this.props.text )
			return false

		return true
	},

	getImageCSS: function( image ){

		var style = ''

		if(this.count%2 === 0)
			style = 'url(' + image + ') no-repeat 0%'
		else
			style = 'url(' + image + ') no-repeat 100%'

		this.count ++

		if(this.count === 1000)
			this.count = 0;

		return style
	},

	getCSS: function(){

		var image = ""

		if( this.props.text >= 0 && this.props.text < 10 ){
			image = 'm1'
		}
		else if( this.props.text >= 10 && this.props.text < 100 ){
			image = 'm2'	
		}
		else if( this.props.text >= 100 && this.props.text < 1000 ){		
			image = 'm3'
		}
		else if( this.props.text >= 1000 && this.props.text < 10000 ){
			image = 'm4'	
		}
		else if( this.props.text >= 10000 ){		
			image = 'm5'
		}

		clusterstyle.top = this.props.top
		clusterstyle.left = this.props.left

		switch(image){
			case 'm1':
				imgstyle.clip = 'rect(0px, 53px, 53px, 0px)'
				divstyle.width = '53px'
				divstyle.lineHeight = '53px'
				clusterstyle.width = '53px'
				clusterstyle.height = '53px'
				image = m1
				break
			case 'm2':
				imgstyle.clip = 'rect(0px, 56px, 56px, 0px)'
				divstyle.width = '56px'
				divstyle.lineHeight = '56px'
				clusterstyle.width = '56px'
				clusterstyle.height = '56px'
				image = m2
				break
			case 'm3':
				imgstyle.clip = 'rect(0px, 66px, 66px, 0px)'
				divstyle.width = '66px'
				divstyle.lineHeight = '66px'
				clusterstyle.width = '66px'
				clusterstyle.height = '66px'
				image = m3
				break
			case 'm4':
				imgstyle.clip = 'rect(0px, 78px, 78px, 0px)'
				divstyle.width = '78px'
				divstyle.lineHeight = '78px'
				clusterstyle.width = '78px'
				clusterstyle.height = '78px'
				image = m4
				break
			case 'm5':
				imgstyle.clip = 'rect(0px, 90px, 90px, 0px)'
				divstyle.width = '90px'
				divstyle.lineHeight = '90px'
				clusterstyle.width = '90px'
				clusterstyle.height = '90px'
				image = m5
				break
		}

		clusterstyle['background'] = this.getImageCSS(image)

		return { clusterstyle: clusterstyle, imgstyle: imgstyle, divstyle: divstyle, image: image }
	},

	render: function() {

		var style = this.getCSS()

		return (
			<div className="cluster" title=""  style={style.clusterstyle} >
				<div style={style.divstyle}>{this.props.text}</div>
			</div>
		);
	}
});

module.exports = LiveMap;