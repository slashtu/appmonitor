var React = require('react')

// component
var CountTo = require('../Widget/CountTo.jsx')

// mixin
var AppMixin = require('../Mixins/AppMixin.jsx')

// stores
var OverviewStore = require('../../stores/OverviewStore.jsx')

var labelStyle = {
    serverdByOrign: { width: '60px' },
    cacheHits: { width: '70px' },
}

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

        this.refs.cacheratio.to(data.cacheratio)
        this.refs.legitimated.to(data.legitimated)
        this.refs.cachehit.to(data.cachehit)
        this.refs.upstream.to(data.upstream)
    },

    componentWillUpdate: function(){

    },

    render: function() {

        var classString = ""
        
        if(this.props.selected)
            classString = "HUD-Performance active"
        else
            classString = "HUD-Performance"
        
        return (
            <li className={classString} >
                <div className="clearfix">
                <a href="" className="ReturnTop" onClick={this.returnTop}></a>
                <section className="CacheRate clearfix">
                    <CountTo ref="cacheratio" end={0} begin={0} time={3000} easing="inoutSine" />
                    <label>Cache Ratio</label>
                </section>
                <section className="Legitimated clearfix">
                    <label>Legitimate</label>
                    <label>Total/</label>
                    <CountTo ref="legitimated" end={0} begin={0} time={3000} easing="inoutSine" />
                    <label>Web Crawlers/</label>
                    <div>N/A</div>
                    
                </section>
                <section className="Cache clearfix">
                    <label style={labelStyle.cacheHits}>Cache Hits</label>
                    <CountTo ref="cachehit" end={0} begin={0} time={3000} easing="inoutSine" />
                </section>
                <section className="Request clearfix">
                    <label style={labelStyle.serverdByOrign} >Served<br/>by Origin</label>
                    <CountTo ref="upstream" end={0} begin={0} time={3000} easing="inoutSine" />
                </section>
            </div>
            </li>
        )
    }

});

module.exports = HUD;