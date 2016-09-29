var React = require('react');
var Highcharts = require('react-highcharts');

// Store
var SiteStore = require('app/stores/SiteStore.jsx');

var Setting = require('app/setting.js');

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
                width: '700',
                height: '350',
                marginTop: 100
            },
            title: {
                text: ''
            },
            
            colors: [
                      // total requests
                      '#e15829', 
                      // mitigation 
                      '#EDE16F', 
                      '#EABE5E', 
                      '#E97D62', 
                      '#CF4F4F', 
                      '#AF577D', 
                      '#904D7F', 
                      '#6C416F', 
                      '#483761', 
                      '#2E3564', 
                      // bandwidth
                      '#e6e6e6'
                    ],

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
                        text: 'Total Requests',
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
              y: 0,
              itemWidth: 210,
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
                    name: 'Suspected Threat',
                    type: 'line',
                    data: [],
                    yAxis: 0,
                    zIndex: 1
                },

                {
                    name: 'Rate Limit Exceeded Request',
                    type: 'line',
                    data: [],
                    yAxis: 0,
                    zIndex: 1
                },

                {
                    name: 'Bad Ip',
                    type: 'line',
                    data: [],
                    yAxis: 0,
                    zIndex: 1
                },

                {
                    name: 'Bad Geolocation',
                    type: 'line',
                    data: [],
                    yAxis: 0,
                    zIndex: 1
                },

                {
                    name: 'Bad Sacnner',
                    type: 'line',
                    data: [],
                    yAxis: 0,
                    zIndex: 1
                },

                {
                    name: 'Bad Bot',
                    type: 'line',
                    data: [],
                    yAxis: 0,
                    zIndex: 1
                },

                {
                    name: 'Malformed Request',
                    type: 'line',
                    data: [],
                    yAxis: 0,
                    zIndex: 1
                },

                {
                    name: 'Challenged Request',
                    type: 'line',
                    data: [],
                    yAxis: 0,
                    zIndex: 1
                },

                {
                    name: 'Spoofed Search Engine',
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
        var mitigation = site.mitigationData[selected]

        this.renderChart( protection, mitigation )
	},

  componentWillUnmount: function(){
      SiteStore.unlisten( this.onChange )
  },

  onChange: function(site){

      var protection = site.protectionData[selected]
      var mitigation = site.mitigationData[selected]

      this.renderChart( protection, mitigation )
  },

  setData: function(e){

      selected = e.target.value

      var site = SiteStore.getState()

      var protection = site.protectionData[selected]
      var mitigation = site.mitigationData[selected]

      this.renderChart( protection, mitigation )
  },

  renderChart: function( protection, mitigation ){

      if(!protection) return
      if(!mitigation) return

      // console.log(protection)
      // console.log(mitigation)

      this.refs.chart.getChart().series[0].update({ data: protection.request })
      this.refs.chart.getChart().series[1].update({ data: mitigation.SuspectedThreat })
      this.refs.chart.getChart().series[2].update({ data: mitigation.RatelLimitExceededRequest })
      this.refs.chart.getChart().series[3].update({ data: mitigation.BadIp })
      this.refs.chart.getChart().series[4].update({ data: mitigation.BadGeolocation })
      this.refs.chart.getChart().series[5].update({ data: mitigation.BadSacnner })
      this.refs.chart.getChart().series[6].update({ data: mitigation.BadBot })
      this.refs.chart.getChart().series[7].update({ data: mitigation.MalformedRequest })
      this.refs.chart.getChart().series[8].update({ data: mitigation.ChallengedRequest })
      this.refs.chart.getChart().series[9].update({ data: mitigation.SpoofedSearchEngine })
      this.refs.chart.getChart().series[10].update({ data: protection.totalbytes })
  },

	render: function() {
	    return (
        <div>
          <Highcharts ref="chart" config = {this.state.config}></Highcharts>
          <slider>
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
