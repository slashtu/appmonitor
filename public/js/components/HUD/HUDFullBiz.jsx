var React = require('react')

var CountTo = require('../Widget/CountTo.jsx')

var AppMixin = require('../Mixins/AppMixin.jsx')

// stores
var OverviewStore = require('../../stores/OverviewStore.jsx')
var TrackerStore = require('../../stores/TrackerStore.jsx')

var HUD = React.createClass({

    mixins:[AppMixin],

    getInitialState: function() {
        return {};
    },

    componentDidMount: function() {
        OverviewStore.listen(this.onOverviewChange)
        TrackerStore.listen(this.onTrackerChange)
    },

    componentWillUnmount: function() {
        OverviewStore.unlisten(this.onOverviewChange)
        TrackerStore.unlisten(this.onTrackerChange)  
    },

    onTrackerChange: function(state){

        var siteId = this.getSiteId()

        if( state.onlineUser[siteId] ){
            this.refs.onlineUser.to(state.onlineUser[siteId])
        }
    },

    onOverviewChange: function( state ){

        var siteId = this.getSiteId()

        if( siteId === "" ) return

        // console.log(state)

        var data = state.sites[siteId];

        if(!data) return

        this.refs.pageviews.to(data.pageviews)
        this.refs.pageviewAvg.to(data.pageviewAvg)
        this.refs.pageviewPeak.to(data.pageviewPeak)

        this.refs.visitors.to(data.visitors)
        this.refs.visitorAvg.to(data.visitorAvg)
        this.refs.visitorPeak.to(data.visitorPeak)

        var avgPages = data.pageviews / data.visitors

        this.refs.avgPages.to( isNaN(avgPages)? 0 : avgPages )
    },

    render: function() {

        var classString = ""
        // console.log(this.props.selected)
        if(this.props.selected)
            classString = "HUD-Biz active"
        else
            classString = "HUD-Biz"
        
        return (
            <li className={classString} >
                <div className="clearfix">
                    <a href="" className="ReturnTop" onClick={this.returnTop}></a>
                    <section className="OnlineUsers clearfix">
                        <CountTo ref="onlineUser" end={0} begin={0} time={100} easing="inoutSine" />
                        <label>Online Users</label>
                    </section>
                    <section className="Pageviews clearfix">
                        <div>
                            <label>Page Views</label>
                            <CountTo ref="pageviews" end={0} begin={0} time={5000} easing="inoutSine" />
                        </div>
                        <div className="smallCharts">
                            <canvas id="scharts_pageviews" height="35" width="68" ></canvas>
                        </div>
                        <div>
                            <div className="clearfix">
                                <label>Avg.</label>
                                <CountTo ref="pageviewAvg" end={0} begin={0} time={5000} easing="inoutSine" />
                            </div>
                            <div className="clearfix">
                                <label>Peak</label>
                                <CountTo ref="pageviewPeak" end={0} begin={0} time={5000} easing="inoutSine" />
                            </div>
                        </div>
                    </section>
                    <section className="Visitors clearfix">
                        <div>
                            <label>Visitors</label>
                            <CountTo ref="visitors" end={0} begin={0} time={5000} easing="inoutSine" />
                        </div>
                        <div className="smallCharts">
                            <canvas id="scharts_visitors" height="35" width="68"  ></canvas>
                        </div>
                        <div>
                            <div className="clearfix">
                                <label>Avg.</label>
                                <CountTo ref="visitorAvg" end={0} begin={0} time={5000} easing="inoutSine" />
                            </div>
                            <div className="clearfix">
                                <label>Peak</label>
                                <CountTo ref="visitorPeak" end={0} begin={0} time={5000} easing="inoutSine" />
                            </div>
                        </div>
                    </section>
                    <section className="AvgPages clearfix">
                        <label>Avg. Pages</label>
                        <CountTo ref="avgPages" end={0} begin={0} time={5000} easing="inoutSine" />
                    </section>
                </div>
            </li>
        )
    }

});

module.exports = HUD;