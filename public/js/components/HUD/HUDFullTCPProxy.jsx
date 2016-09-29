var React = require('react')

// component
var CountTo = require('../Widget/CountTo.jsx')

// mixin
var AppMixin = require('../Mixins/AppMixin.jsx')

// stores
var OverviewStore = require('../../stores/OverviewStore.jsx')

var HUDFullTCPProxy = React.createClass({

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

        this.refs.totalbytes.to(data.totalbytes * 8 / (24 * 60 * 60) )
        this.refs.clearproxy.to(data.clearproxy * 8 / (24 * 60 * 60) )
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
                    <section className="Bandwidth clearfix">
                        <label>Traffic</label>
                        <label>Raw/</label>
                        <CountTo ref="totalbytes" type=" bps" end={0} begin={0} time={3000} easing="inoutSine" />
                        <label>Clean/</label>
                        <CountTo ref="clearproxy" type=" bps" end={0} begin={0} time={3000} easing="inoutSine" />
                    </section>
                </div>
            </li>
        )
    }

});

module.exports = HUDFullTCPProxy;