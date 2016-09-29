var React = require('react');
var Highcharts = require('react-highcharts');

var Lib = require('app/lib/Lib')

// mixin
var AppMixin = require('app/components/Mixins/AppMixin.jsx')

// stores
var OverviewStore = require('store/OverviewStore.jsx')
var SettingStore = require('store/SettingStore.jsx')

var ChartDefaultColors = ['#f2f2f2'];
var ChartColors = ['#e15829', '#666666', '#808080', '#999999', '#b3b3b3', '#e6e6e6'];

var AnalyticPieConfig = {

        title: {
                text: ''
        },

        chart:{
            width: '710',
            height: '550'
        },        

        legend:{
            labelFormat:'{name} ({percentage:.1f}%)'
        },

        tooltip: {
            formatter: function(){
                return this.point.name + '<br/>' + this.point.series.name + ': ' + Highcharts.Highcharts.numberFormat(this.point.y,0,'',',')
            },
            // pointFormat: '{series.name}: <b>{point.y:,.0f}</b><br/>',
            // valueSuffix: ' cm',
            shared: true
        },

        series:[{
            name: 'DDos',
            type: 'pie',
            colors: ChartDefaultColors,
            data: [{ name: 'DDos', y: 1}],
            center: [244, 295],
            size: 370,
            innerSize: 250,
            dataLabels: {
                enabled: false
            }
        },

        {
            name: 'WAF',
            type: 'pie',
            colors: ChartDefaultColors,
            data: [{ name: 'WAF', y: 1 }],
            center: [551, 168],
            size: 250,
            innerSize: 175,
            legend: {
                borderWidth: 0
            },
            dataLabels: {
                enabled: false
            }
        }],

        credits: false
    };



var AnalyticPieChart = React.createClass({

    mixins: [AppMixin],

    waf_enable: false,

	getInitialState: function(){
        this.waf_enable = SettingStore.getState().site.waf
        var siteId = this.getSiteId()

        var threat = 0
        var totalwaf = 0
        var wafpattern = []
        var wafdata=[];
        if(siteId != ""){ 
         
            threat = OverviewStore.getState().sites[siteId]['threat'] || 0
            // totalwaf = OverviewStore.getState().sites[siteId]['waf'] || 0
            wafpattern = OverviewStore.getState().sites[siteId]['wafpattern'] || []
            
            wafpattern.forEach(
                function(obj){
                    for(var key in obj){
                        wafdata.push({name: key, y: obj[key] });
                        totalwaf+=obj[key];
                    }
                }
            );


            AnalyticPieConfig.series[0].data[0].y = ( threat === 0 ) ? 1 : threat;
            AnalyticPieConfig.series[0].colors = (threat === 0) ? ChartDefaultColors : ChartColors ;
            // AnalyticPieConfig.series[1].data[0].y = ( totalwaf === 0 )? 1: totalwaf
            AnalyticPieConfig.series[1].data = ( wafpattern.length === 0 ) ? [{ name:'WAF', y: 1}] : wafdata;
            AnalyticPieConfig.series[1].colors = (wafpattern.length === 0) ? ChartColors : ChartDefaultColors;
            // var data=[];

            // AnalyticPieConfig.series[1].data[0].y = ( wafpattern === 0 )? 1: wafpattern

            threat = Lib.numberFormat(threat)
            totalwaf = Lib.numberFormat(totalwaf)
        }
		return { config: AnalyticPieConfig, ddos: threat, waf: totalwaf, wafdata : wafdata }
	},

	componentDidMount: function() {
        OverviewStore.listen(this.onOverviewChange)
    },

    componentWillUnmount: function() {
        OverviewStore.unlisten(this.onOverviewChange)
    },

    onOverviewChange: function( state ){

        
        // waf is enable or disable
        this.waf_enable = SettingStore.getState().site.waf

        var siteId = this.getSiteId()

        if( siteId === "" ) return

        var data = state.sites[siteId];

        if(!data) return

        var totalwaf = 0;
        var wafdata = [];
        data.wafpattern.forEach(
            function(obj){
                for(var key in obj){
                    wafdata.push({name: key, y: obj[key] });
                    totalwaf+=obj[key];
                }
            }
        );


        AnalyticPieConfig.series[0].data = [{ name:'DDos', y: ( data.threat === 0 )? 1: data.threat }];
        AnalyticPieConfig.series[0].colors = (data.threat === 0) ? ChartDefaultColors : ChartColors;
        AnalyticPieConfig.series[1].data = ( data.wafpattern.length === 0 ) ? [{ name:'WAF', y: 1}] : wafdata;
        AnalyticPieConfig.series[1].colors = (data.wafpattern.length ===0 ) ? ChartDefaultColors : ChartColors;
        
        // AnalyticPieConfig.series[1].data = (data.wafpattern === [] ) ? 1 : data.wafpattern ;

        var threat = Lib.numberFormat(data.threat)
        totalwaf = Lib.numberFormat(totalwaf)

        this.setState({ config:AnalyticPieConfig, ddos: threat, waf: totalwaf, wafdata: wafdata })
    },

    renderChart: function( data ){
        // this.refs.chart.getChart().series[0].update({ data: [data.threat] })
    },

	render: function() {

        // var waf_enable = SettingStore.getState().site.waf
        var wafdataArray = this.state.wafdata.map(function(data,i){
            return( <li key={i}>{data.name}:{data.y}</li> );
        });

	    return (
            <div>
	            <Highcharts ref="chart" config={this.state.config}></Highcharts>
                <div className="PieChartsCenter DDoS">
                    <label>DDoS</label>
                    <div>{this.state.ddos}</div>
                </div>
                <div className="PieChartsCenter WAF">
                    <label >Web<br />Application<br />Attacks</label>
                    <div>{ this.waf_enable?this.state.waf:"N/A"}</div>
                </div>
                <ul className="PieChartsLegend ThreatCategories">
                    {wafdataArray}
                    <li style={{display: "none"}}>"WAF log is empty at the moment".</li>
                </ul>
            </div>
	    );
  	}

});

module.exports = AnalyticPieChart;
