var React = require('react');
var Highcharts = require('react-highcharts');

// Store
var SiteStore = require('../../../../stores/SiteStore.jsx');

var Setting = require('../../../../setting.js');

// This is for all plots, change Date axis to local timezone
Highcharts.Highcharts.setOptions({                                            
    global : { useUTC : false },

    lang: {
        thousandsSep: ","
    }
});

var TrendLineConfig = {

            chart: {
                zoomType: 'x',
                width: '950',
                height: '350',
                marginTop: 50
            },
            title: {
                text: ''
            },
            
            colors: ['#e15829', '#4d4d4d', '#e6e6e6'],

            backgroundColor: '#333333',

            xAxis: {
                type: 'datetime',
            },

            yAxis: [

                { // Primary yAxis
                    min: 0,
                    labels: {
                        
                        // style: {
                        //     color: Highcharts.Highcharts.getOptions().colors[2]
                        // }
                    },
                    title: {
                        text: 'Total Requests / Threats',
                        style: {
                            color: '#999999'
                        }
                    },
                },

                { // Secondary yAxis
                    gridLineWidth: 0,
                    title: {
                        text: 'Bandwidth (Kbps)',
                        style: {
                            color: '#999999'
                        }
                    },

                    labels: {
                        // format: '{value}',
                        // style: {
                        //     color: Highcharts.Highcharts.getOptions().colors[0]
                        // }
                    },
                    opposite: true
                },
            ],

            legend: {
                borderWidth: 0,
                align: 'center',
                verticalAlign: 'top',
                x: 0,
                y: 0
            },

            plotOptions: {
                column:{
                    pointPadding: 0,
                    groupPadding: 0,
                    borderWidth: 1,
                    shadow: false
                },
                series: {
                    lineWidth: 2,
                    marker: {
                        fillColor: '#FFFFFF',
                        lineWidth: 3,
                        lineColor: null,
                        symbol: 'circle',
                        enabled: false,
                    }
                }
            },

            tooltip: {

                // formatter: function(){
                //     console.log(this.points[0])
                    

                //     // return this.point.name + '<br/>' + this.point.series.name + ': ' + Highcharts.Highcharts.numberFormat(this.point.y,0,'',',')
                // },
                // pointFormat: '{series.name}: <b>{point.y:,.0f}</b><br/>',
                // valueSuffix: ' cm',
                // pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y}</b><br/>.',
                shared: true
            },

            series: [
                {
                    name: 'Total Requests (per minute)',
                    type: 'line',
                    data: [],
                    yAxis: 0,
                    zIndex: 2
                },

                {
                    name: 'Threats (per minute)',
                    type: 'line',
                    data: [],
                    yAxis: 0,
                    zIndex: 1
                },

                {
                    name: 'Bandwidth (Kbits per second)',
                    type: 'column',
                    data: [],
                    yAxis: 1,
                    zIndex: 0
                }
            ],
            credits: false
        };

var selected = 'PROTECTION_TRENDS_2MINS'

var TrendLineChart = React.createClass({

	getInitialState: function(){

		return { config: TrendLineConfig }
	},

	componentDidMount: function(){
        
        SiteStore.listen( this.onChange )

        var site = SiteStore.getState()

        var protection = site.protectionData[selected]

        this.renderChart( protection )
	},

    componentWillUnmount: function(){
        SiteStore.unlisten( this.onChange )
    },

    onChange: function(site){

        var protection = site.protectionData[selected]

        this.renderChart( protection )
    },

    setData: function(e){

        selected = e.target.value

        var site = SiteStore.getState()

        var protection = site.protectionData[selected]

        this.renderChart( protection )
    },

    renderChart: function( data ){

        if(!data) return

        this.refs.chart.getChart().series[0].update({ data: data.request })
        this.refs.chart.getChart().series[1].update({ data: data.totalblock })
        this.refs.chart.getChart().series[2].update({ data: data.totalbytes })
    },

	render: function() {
	    return (
            <div>
                <Highcharts ref="chart" config = {this.state.config}></Highcharts>
                <slider floor="0" ceiling="3" step="1" translate-fn="Sliders.Translate" ng-model="Sliders.BusinessTrend">
                    <div className="checkboxgroup">   
                        <input type="radio" name="trendLineChart" defaultChecked={selected === 'PROTECTION_TRENDS_2MINS'} value="PROTECTION_TRENDS_2MINS" onClick={this.setData}></input>
                        <label >12 Hours</label>
                    </div>
                    <div className="checkboxgroup">   
                        <input type="radio" name="trendLineChart" defaultChecked={selected === 'PROTECTION_TRENDS_1DAY'} value="PROTECTION_TRENDS_1DAY" onClick={this.setData}></input>
                        <label >1 Day</label>
                    </div>
                    <div className="checkboxgroup">   
                        <input type="radio" name="trendLineChart" defaultChecked={selected === 'PROTECTION_TRENDS_7DAYS'} value="PROTECTION_TRENDS_7DAYS" onClick={this.setData}></input>
                        <label >7 Days</label>
                    </div>
                    <div className="checkboxgroup">   
                        <input type="radio" name="trendLineChart" defaultChecked={selected === 'PROTECTION_TRENDS_30DAYS'} value="PROTECTION_TRENDS_30DAYS" onClick={this.setData}></input>
                        <label >30 Days</label>
                    </div>
                </slider>
            </div>
	    );
  	}

});

module.exports = TrendLineChart;
