var React = require('react')

// component
var CountTo = require('../Widget/CountTo.jsx')

// mixin
var AppMixin = require('../Mixins/AppMixin.jsx')

// stores
var OverviewStore = require('../../stores/OverviewStore.jsx')

var HUD = React.createClass({

    mixins:[AppMixin],

    getInitialState: function(){
        // init state
        return {}
    },

    componentDidMount: function() {
        OverviewStore.listen(this.onOverviewChange)
    },

    componentWillUnmount: function() {
        OverviewStore.unlisten(this.onOverviewChange)
    },

    onOverviewChange: function( state ){
        
        var siteId = this.getSiteId()

        if( siteId === "" ) return

        // console.log(state)

        var data = state.sites[siteId];

        if(!data) return

        this.refs.threats.to(data.threat)
        this.refs.bandwidthCurrent.to(data.bandwidthCurrent)
        this.refs.bandwidthPeak.to(data.bandwidthPeak)
        this.refs.request.to(data.request)
    },

    componentWillUpdate: function(){

    },

    render: function() {

        var classString = ""

        if(this.props.selected)
            classString = "HUD-Protection active"
        else
            classString = "HUD-Protection"
        
        return (
            <li className={classString} >
                <div className="clearfix">
                    <a href="" className="ReturnTop" onClick={this.returnTop}></a>
                    <section className="Threats clearfix">
                        <CountTo ref="threats" end={0} begin={0} time={3000} easing="inoutSine" />
                        <label>Threats</label>
                    </section>
                    <section className="Requests clearfix">
                        <label>Total Requests</label>
                        <CountTo ref="request" end={0} begin={0} time={3000} easing="inoutSine" />
                    </section>
                    <section className="Bandwidth clearfix">
                        <label>Bandwidth</label>
                        <label>Current/</label>
                        <CountTo ref="bandwidthCurrent" end={0} begin={0} time={3000} easing="inoutSine" />
                        <label>Peak/</label>
                        <CountTo ref="bandwidthPeak" end={0} begin={0} time={3000} easing="inoutSine" />
                    </section>
                </div>
            </li>
        )
    }

});

module.exports = HUD;