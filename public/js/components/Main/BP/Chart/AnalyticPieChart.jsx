var React = require('react');
var Highcharts = require('react-highcharts');

// mixin
var AppMixin = require('../../../Mixins/AppMixin.jsx')

var AnalyticPieConfig = {

        title: {
                text: ''
        },

        chart:{
            width: '1000',
            height: '550'
        },

        colors: [
            '#e15829', '#e6e6e6', '#b3b3b3', '#999999', '#808080', '#666666'
        ],

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

        series:
        [
            {
                name: 'Visitors',
                type: 'pie',
                data: [1],
                center: [90, 280],
                size: 200,
                innerSize: 140,
                dataLabels: {
                    enabled: false
                }
            },

            {
                name: 'Device',
                type: 'pie',
                data: [1],
                center: [310, 355],
                size: 145,
                innerSize: 105,
                legend: {
                    borderWidth: 0,
                },
                dataLabels: {
                    enabled: false
                }
            },

            {
                name: 'Traffic',
                type: 'pie',
                data: [{ name: 'Referral', y: 557304 }, { name: 'Direct', y: 187852}, { name: 'Search', y: 10282}],
                center: [480, 300],
                size: 200,
                innerSize: 145,
                dataLabels: {
                    enabled: false
                }
            },

            {
                name: 'Browsers',
                type: 'pie',
                data: [3,2,1],
                center: [645, 200],
                size: 180,
                innerSize: 120,
                dataLabels: {
                    enabled: false
                }
            },

            { 
                name: 'SearchEngine',
                type: 'pie',
                data: [10,3,2,1],
                center: [840, 290],
                size: 240,
                innerSize: 170,
                dataLabels: {
                    enabled: false
                }
            }
        ],

        credits: false
    };

var AnalyticPieChart = React.createClass({

    mixins: [AppMixin],

	getInitialState: function(){

		return { config: AnalyticPieConfig }
	},

	componentDidMount: function() {

    },

    componentWillUnmount: function() {

    },

    renderChart: function( data ){
        // this.refs.chart.getChart().series[0].update({ data: [data.totalblock] })
    },

    renderDevice: function(){

        var arr = this.props.device.data.filter( function(device, index){ return ( (device.name !== 'Device')&&(index < 3)) } ).map( function( device ){

            return (
                <li key={device.id} >
                    <div>{ device.name + " " + device.rate + '%' }</div>
                </li>
            )
        })

        return  arr
    },

    renderBrowser: function(){

        var arr = this.props.browser.data.filter( function(browser, index){ return (browser.name !== 'Browser') && (index < 3)  } ).map( function( browser ){

            return (
                <li key={browser.id} >
                    <div>{ browser.name + " " + browser.rate + '%' }</div>
                </li>
            )
        })

        return  arr
    },

    renderSearchEngine: function(){

        var arr = this.props.searchengine.data.filter( function(searchengine, index){ return (searchengine.name !== 'Engine') && (index < 3)  } ).map( function( searchengine ){

            return (
                <li key={searchengine.id} >
                    <div>{ searchengine.name + " " + searchengine.rate + '%' }</div>
                </li>
            )
        })

        return  arr
    },

    renderTraffic: function(){

        var arr = this.props.traffic.data.filter( function(source, index){ return (source.name !== 'Traffic Source') && (index < 3)  } ).map( function( source ){

            return (
                <li key={source.id} >
                    <div>{ source.name + " " + source.rate + '%' }</div>
                </li>
            )
        })

        return  arr
    },

	render: function() {

        var visitors = this.props.visitors
        var device = this.props.device
        var browser = this.props.browser
        var searchengine = this.props.searchengine
        var traffic = this.props.traffic

        // visitor
        var newvisitor = visitors.data[0] || {};
        var returnvisitor = visitors.data[1] || {};

        AnalyticPieConfig['series'][0]['data'] = visitors.data

        // device
        var deviceTop1 = device.data[0] || {}

        AnalyticPieConfig['series'][1]['data'] = device.data

        // browser
        var browserTop1 = browser.data[0] || {}

        AnalyticPieConfig['series'][3]['data'] = browser.data

        // searchengine
        var searchengineTop1 = searchengine.data[0] || {}

        AnalyticPieConfig['series'][4]['data'] = searchengine.data

        // traffic
        var trafficTop1 = traffic.data[0] || {}

        AnalyticPieConfig['series'][2]['data'] = traffic.data

	    return (
            <div>
                <Highcharts config={AnalyticPieConfig}></Highcharts>
                <div className="PieChartsCenter Visitors">
                    <label>New</label>
                    <div>{newvisitor.rate || 0}</div>
                    <hr />
                    <label>Return</label>
                    <div>{returnvisitor.rate || 100}</div>
                </div>
                <div className="PieChartsCenter Device">
                    <label>Device<br />Source</label>
                    <hr />
                    <h1>{deviceTop1.name || 'Device'}</h1>
                    <div>{deviceTop1.rate || 0}</div>
                </div>
                <div className="PieChartsCenter Traffic">
                    <label>Traffic<br />Source</label>
                    <hr />
                    <h1>{trafficTop1.name}</h1>
                    <div>{trafficTop1.rate}</div>
                </div>
                <div className="PieChartsCenter Browsers">
                    <label>Browser</label>
                    <hr />
                    <h1>{browserTop1.name || 'Browser'}</h1>
                    <div>{browserTop1.rate || 0}</div>
                </div>
                <div className="PieChartsCenter SearchEngine">
                    <label>Search Engine</label>
                    <hr />
                    <h1>{searchengineTop1.name}</h1>
                    <div>{searchengineTop1.rate}</div>
                </div>
                <ul className="PieChartsLegend Device">
                    {this.renderDevice()}
                </ul>
                <ul className="PieChartsLegend Traffic">
                    {this.renderTraffic()}
                </ul>
                <ul className="PieChartsLegend Browsers">
                    {this.renderBrowser()}
                </ul>
                <ul className="PieChartsLegend SearchEngine">
                    {this.renderSearchEngine()}
                </ul>
            </div>
	    );
  	}

});

module.exports = AnalyticPieChart;
