var React = require('react')

// store
var IDCStore = require('../../../../stores/IDCStore.jsx');

var Center = require('./Center.jsx')

var SizeCSS = [  
	'DataCenterMarksSize1',
	'DataCenterMarksSize2',
	'DataCenterMarksSize3',
	'DataCenterMarksSize4',
	'DataCenterMarksSize5',
	'DataCenterMarksSize6',
	'DataCenterMarksSize7',
	'DataCenterMarksSize8',
	'DataCenterMarksSize9',
	'DataCenterMarksSize10'
]

var PerformanceDataCenterMap = React.createClass({

	getInitialState: function(){
		
		var idc = IDCStore.getState().idcrequest

		if(idc[0]){
			return { idc: idc[0][1] }
		}
		else
			return { idc: {} }
	},

	componentDidMount: function(){
		IDCStore.listen( this.onChange )
	},

	componentWillUnmount: function(){
		IDCStore.unlisten( this.onChange)
	},

	onChange: function(state){
		if(state.idcrequest[0])
			this.setState({idc: state.idcrequest[0][1]})
	},

	getSizeCSS: function( count ){

		if(count === 0) return "DataCenterMarksSize0"

		if(count >= 100) return "DataCenterMarksSize10"

		return SizeCSS[ Math.floor( count / 10 )] 
	},

	getStatusCSS: function(){
		return 'online'
	},

	render: function() {

    return (
			<div className="DataCenterMarks">
				<Center className="SanJose" labelClassName={ this.getSizeCSS(this.state.idc.SanJose || 0) + " online" } count={this.state.idc.SanJose || 0} label="San Jose" />
				<Center className="LosAngeles" labelClassName={ this.getSizeCSS(this.state.idc.LosAngeles || 0) + " online" } count={this.state.idc.LosAngeles || 0} label="LosAngeles" />
				<Center className="Washington" labelClassName={ this.getSizeCSS(this.state.idc.Washington || 0) + " online" } count={this.state.idc.Washington || 0} label="Washington" />
				<Center className="Miami" labelClassName={ this.getSizeCSS(this.state.idc.Miami || 0) + " online" } count={this.state.idc.Miami || 0} label="Miami" />
				<Center className="Amsterdam" labelClassName={ this.getSizeCSS(this.state.idc.Amsterdam || 0) + " online" } count={this.state.idc.Amsterdam || 0} label="Amsterdam" />
				<Center className="London" labelClassName={ this.getSizeCSS(this.state.idc.London || 0) } count={this.state.idc.London || 0} label="London" />
				<Center className="HongKong" labelClassName={ this.getSizeCSS(this.state.idc.HongKong || 0) + " online" } count={this.state.idc.HongKong || 0} label="HongKong" />
				<Center className="Singapore" labelClassName={ this.getSizeCSS(this.state.idc.Singapore || 0) + " online" } count={this.state.idc.Singapore || 0} label="Singapore" />
				<Center className="Taipei" labelClassName={ this.getSizeCSS(this.state.idc.Taipei || 0) + " online" } count={this.state.idc.Taipei || 0} label="Taipei" />
			</div>
    );
	}
});

module.exports = PerformanceDataCenterMap;