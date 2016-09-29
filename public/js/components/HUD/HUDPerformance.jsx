var React = require('react')

// component
var CountTo = require('../Widget/CountTo.jsx');

// mixin
var AppMixin = require('../Mixins/AppMixin.jsx')

// stores
var OverviewStore = require('../../stores/OverviewStore.jsx')

var HUDPerformance = React.createClass({

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

        this.refs.cacheratio.to(data.cacheratio)
        this.refs.cachehit.to(data.cachehit)
        this.refs.legitimated.to(data.legitimated)
    },

    render: function() {

        var classString = ""

        if(this.props.selected)
            classString = "HUD-Performance active"
        else
            classString = "HUD-Performance"

        return (
          	<li className={classString} onClick={this.props.onClick}>
                <h2>PERFORMANCE</h2>
                <div>
                    <section>
                        <CountTo ref="cacheratio" type="%" end={0} begin={0} time={3000} easing="inoutSine" />
                        <label>Cache Ratio</label>
                    </section>
                </div>
                <div>
                    <section className="clearfix">
                        <label>Cache Hits</label>
                        <CountTo ref="cachehit" end={0} begin={0} time={3000} easing="inoutSine" />
                    </section>
                    <section className="clearfix">
                        <label>Legitimate</label>
                        <CountTo ref="legitimated" end={0} begin={0} time={3000} easing="inoutSine" />
                    </section>
                </div>
            </li>
        );
     }

});

module.exports = HUDPerformance;