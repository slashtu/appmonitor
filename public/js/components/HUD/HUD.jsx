var React = require('react')
// var { Navigation, State }= require('react-router')


// views
var HUDBiz = require('./HUDBiz.jsx')
var HUDProtection = require('./HUDProtection.jsx')
var HUDPerformance = require('./HUDPerformance.jsx')
var HUDApps = require('./HUDApps.jsx')

var HUDFullProtection = require('./HUDFullProtection.jsx')
var HUDFullBiz = require('./HUDFullBiz.jsx')
var HUDFullPerformance = require('./HUDFullPerformance.jsx')
var HUDFullTCPProxy = require('./HUDFullTCPProxy.jsx')

// store
var SettingStore = require('../../stores/SettingStore.jsx')

var HUD = React.createClass({
    getInitialState: function(){

        this.HUDstate = "simple"

        return {}
    },

    componentDidMount: function(){

        // show different HUD by scroll top 
        window.addEventListener('scroll', this.onScroll, false);
    },

    componentWillUpdate: function(){

    },

    onScroll: function(event){

        if( this.props.path === "/MainTCPProxy" ) return;

        var scrollTop = $(document).scrollTop()
        
        // show simple HUD
        if(this.HUDstate === "simple" && scrollTop != 0){

            $('.simple').hide()
            $('#full').fadeIn('slow')


            this.HUDstate = "full"
        }else if(this.HUDstate === "full" && scrollTop === 0){

            $('.simple').fadeIn('slow')
            $('#full').hide()

            this.HUDstate = "simple"
        }else{
            return
        }

        this.setState({HUDstate:this.HUDstate})
    },

    goTo: function( view ){
        if( view === "/MainBP" && !SettingStore.getState().site.bp)
            return false
        this.props.push(view);
    },

    render: function() {
        var fullStyle = {}
        fullStyle.display = "none"
        return (
          <div id="HUD" className="HUD">
          	<ul className="simple clearfix">
                <HUDBiz selected={this.props.path === "MainBP"} onClick={this.goTo.bind(this, "/MainBP")} push={this.props.push}/>
                <HUDProtection selected={this.props.path === "dashboard"} onClick={this.goTo.bind(this, "/")} />
                <HUDPerformance selected={this.props.path === "MainPerformance"} onClick={this.goTo.bind(this, '/MainPerformance')} />
          	</ul>
            <ul id="full" className="full clearfix" style={fullStyle} >
                <HUDFullBiz selected={this.props.path === "MainBP" && this.HUDstate === "full" } />
                <HUDFullProtection selected={this.props.path === "dashboard" && this.HUDstate === "full"}/>
                <HUDFullPerformance selected={this.props.path === "MainPerformance" && this.HUDstate === "full"}/>
                <HUDFullTCPProxy selected={this.props.path === "MainTCPProxy"}/>
            </ul>
          </div>
        );
    }

});

module.exports = HUD;