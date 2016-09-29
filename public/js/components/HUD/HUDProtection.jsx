var React = require('react')

// component
var CountTo = require('../Widget/CountTo.jsx');

// mixin
var AppMixin = require('../Mixins/AppMixin.jsx')

// stores
var OverviewStore = require('../../stores/OverviewStore.jsx')

var HUDProtection = React.createClass({

    mixins:[AppMixin],

    getInitialState: function() {
        return {};
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
        this.refs.bandwidth.to(data.bandwidthPeak)
        this.refs.request.to(data.request)
    },

    render: function() {

        var classString = ""

        if(this.props.selected)
            classString = "HUD-Protection active"
        else
            classString = "HUD-Protection"

        return (
          	<li className={classString} onClick={this.props.onClick}>
                <h2>PROTECTION</h2>
                <div>
                    <section>
                        <CountTo ref="threats" end={0} begin={0} time={3000} easing="inoutSine" />
                        <label>Threats</label>
                    </section>
                </div>
                <div>
                    <section className="clearfix">
                        <label>Bandwidth Peak</label>
                        <CountTo ref="bandwidth" end={0} begin={0} time={3000} easing="inoutSine" />
                    </section>
                    <section className="clearfix">
                        <label>Total Requests</label>
                        <CountTo ref="request" end={0} begin={0} time={3000} easing="inoutSine" />
                    </section>
                </div>
            </li>
        );
     }

});

module.exports = HUDProtection;