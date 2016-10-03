import React from 'react'
import withRouter from 'react-router/lib/withRouter';

// mixins
var AppMixin = require('./Mixins/AppMixin.jsx');

// views
var Header = require('./Header.jsx');
var HUD = require('./HUD/HUD.jsx');
var Overview = require('./Overview/Overview.jsx');
// var MainView = require('./MainView.jsx');
var Footer = require('./Footer.jsx');
var Menu = require('./Widget/Menu.jsx');
var Tab = require('./Tab.jsx');

// store
var CustomerStore = require('../stores/CustomerStore.jsx');
var SettingStore = require('../stores/SettingStore.jsx');

// actions
import TrackerActions from '../actions/TrackerActions.jsx'
import WAFLogActions from '../actions/WAFLogActions.jsx'
import OverviewActions from '../actions/OverviewActions.jsx'
import SiteActions from '../actions/SiteActions.jsx'
import WAFActions from '../actions/WAFActions.jsx'
import IDCActions from '../actions/IDCActions.jsx'
import WAActions from '../actions/WAActions.jsx'
import Mitigation from 'action/MitigationActions.js'

// actions
var CustomerActions = require('../actions/CustomerActions.jsx');


var App = React.createClass({

    mixins:[AppMixin],

    getInitialState: function(){
        return {
            customerStore: { customer:{}, user:{}}
        };
    },

    componentWillMount: function(){
        CustomerStore.listen(this.onChange);
        SettingStore.listen(this.onSettingChange);
    },

    componentDidMount: function() {

        // get account info
        CustomerActions.getAccountInfo();
    },

    componentWillUnmount: function() {

    },

    // triggered by choose a site  
    onSettingChange: function(){

        // reset all data from store
        OverviewActions.getData();

        // get Site Data
        this.getSiteData();

        // reset tracker
        setTimeout( TrackerActions.resetData, 100 );

        // rest waflog
        setTimeout( WAFLogActions.resetData, 100 );

        // IDC   
        IDCActions.getIDCRequests();

        // WA
        WAActions.getWAData();
    },

    getSiteData: function(){

        // call once, mitigation 
        Mitigation.getMitigationData()

        // call once, WAF
        WAFActions.getWAFData()

        // call once ( 7 days, 30 days )
        SiteActions.getProtectionData('PROTECTION_TRENDS_7DAYS');
        SiteActions.getProtectionData('PROTECTION_TRENDS_30DAYS');

        // get data interval 
        this.immediateAndInterval( SiteActions.getProtectionData.bind(this, 'PROTECTION_TRENDS_2MINS'), 120000);
        this.immediateAndInterval( SiteActions.getProtectionData.bind(this, 'PROTECTION_TRENDS_1DAY'), 3600000);
    },

    // regist websocket and call v2 api interval
    init: function(){

        // get Overview Data every 2 mins
        this.immediateAndInterval( OverviewActions.getData, 120000);

        // Tracker websocket
        TrackerActions.subscribeWS();
    },

    onChange: function(state){

        // console.log(state)

        this.setState({ customerStore: state });

        this.init();
    },

    onScroll: function(event){

        var node = React.findDOMNode(this);

        // show complete HUD
        if(this.state.HUDstate === "all" && document.body.scrollTop != 0){
            this.setState({ HUDstate: "partial" });
        }

        // show partial HUD
        if(this.state.HUDstate === "partial" && document.body.scrollTop === 0){
            this.setState({ HUDstate: "all" });
        }
    },

    toggleOverview: function(e){
        e.preventDefault();
        this.refs.overview.toggleOverview();
    },

    render: function() {
        
        return (
            <div>
                <Header user={this.state.customerStore.user} toggleOverview={this.toggleOverview}/>
                <HUD path={this.props.location.pathname} push={this.props.router.push}/>
                <Tab />
                <Overview ref="overview" path={this.props.location.pathname} push={this.props.router.push} />
                <div id="MainViews" className="clearfix">
                    <div id="MainViews-content">
                        <div>
                          {this.props.children}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

});

module.exports = withRouter(App);