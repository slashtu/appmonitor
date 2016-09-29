var React = require('react')
import {RouterContext} from 'react-router';
// var { Navigation, State }= require('react-router')
var CountTo = require('../Widget/CountTo.jsx')

var AppMixin = require('../Mixins/AppMixin.jsx')

// stores
var OverviewStore = require('../../stores/OverviewStore.jsx')
var TrackerStore = require('../../stores/TrackerStore.jsx')
var SettingStore = require('../../stores/SettingStore.jsx')

var HUDBiz = React.createClass({

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
        }else{
            this.refs.onlineUser.to(0)
        }
    },

    onOverviewChange: function( state ){

        // bp disable or enable
        var bp = SettingStore.getState().site.bp
        
        this.forceUpdate();

        if(bp === false ){
            this.refs.onlineUser.to(0)
            this.refs.pageviews.to(0)
            this.refs.visitors.to(0)
            return;
        }
    
        // set state
        var siteId = this.getSiteId()

        if( siteId === "" ) return

        var data = state.sites[siteId];

        if( !data ) return

        this.refs.pageviews.to(data.pageviews? data.pageviews: 0)
        this.refs.visitors.to(data.visitors)

        TrackerStore.emitChange()
    },

    render: function() {

        var bp = SettingStore.getState().site.bp

        var classString = "HUD-Biz"

        if(bp === true){
            if(this.props.selected)
                classString = "HUD-Biz active"
            else
                classString = "HUD-Biz"

        }else if( bp === false){
            classString = "HUD-Biz disabled"

            if(this.props.selected)
                this.props.push('/');
        }

        return (
          	<li id="HUD-Biz" className={classString} onClick={this.props.onClick}>
    			<h2>ANALYTICS</h2>
    			<div>
    				<section>
    	                <CountTo ref="onlineUser" end={0} begin={0} time={100} easing="inoutSine" />
    					<label >Online Users</label>
    				</section>
    			</div>
    			<div>
    				<section className="clearfix">
    					<label >Page Views</label>
    					<CountTo ref="pageviews" end={0} begin={0} time={5000} easing="inoutSine" />
    				</section>
    				<section className="clearfix">
    					<label >Visitors</label>
    					<CountTo ref="visitors" end={0} begin={0} time={5000} easing="inoutSine" />
    				</section>
    			</div>
    		</li>
        );
    } 

})

module.exports = HUDBiz