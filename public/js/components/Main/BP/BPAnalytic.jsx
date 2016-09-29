var React = require('react')
var Scroll = require('react-scroll')
var shortId = require('shortid')

var Helpers = Scroll.Helpers

// stores
var WAStore = require('../../../stores/WAStore.jsx')
var SettingStore = require('../../../stores/SettingStore.jsx')

// views
var AnalyticPieChart = require('./Chart/AnalyticPieChart.jsx')

var Lib = require('../../../lib/Lib.js')

var style = {
	marginBottom: '200px'
}

var BPAnalytic = React.createClass({
	getInitialState: function(){
		return { 
			rank: WAStore.getState().rank, 
			visitors: WAStore.getState().visitors,
			device: WAStore.getState().device,
			browser: WAStore.getState().browser,
			searchengine: WAStore.getState().searchengine,
			traffic: WAStore.getState().traffic
		}
	},

	componentDidMount: function(){
		WAStore.listen( this.onChange )
	},

	componentWillUnmount: function(){
		WAStore.unlisten( this.onChange )
	},

	onChange: function(state){

		var bp = Lib.getSiteSetting().bp

		if(!bp) return

		this.setState( 
			{ 
				rank: state.rank,
				visitors: state.visitors,
				device: state.device,
				browser: state.browser,
				searchengine: state.searchengine,
				traffic: state.traffic
			} 
		)
	},

	renderTop3: function(){

		var rank = this.state.rank.filter( function( value, index ){ return index < 3 } ).map( function( item, index){

			return(

				<tr key={shortId.generate()}>
					<td>
						<div>Top {index + 1}</div>
						<div>Content</div>
					</td>
					<td>
						<div>
							<a href= { "http://" + SettingStore.getState().site.sitename + '/' + item[0]}>{item[0]}</a>
						</div>
						<div>{Math.round( Math.random() * 500 )} ms</div>
					</td>
				</tr>
			)
		})

		return rank				
	},

	render: function() {

		return (
			<div className="Biz3 MainViews-Item" style={style}>
				<h1>Website Analytics</h1>
				<div className="topContents">
					<table>
						<tbody>
							{this.renderTop3()}
						</tbody>
					</table>
				</div>
				<AnalyticPieChart 
					visitors={this.state.visitors}
					device={this.state.device}
					browser={this.state.browser}
					searchengine={this.state.searchengine}
					traffic={this.state.traffic}
				/>
			</div>
		);
	}

});

module.exports = Helpers.Element(BPAnalytic);