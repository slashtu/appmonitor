var React = require('react')
import withRouter from 'react-router/lib/withRouter';
var shortId = require('shortid')

var CountTo = require('../Widget/CountTo.jsx')

//action
// var OverviewActions = require('../../actions/OverviewActions')
var SettingActions = require('../../actions/SettingActions')

// store 
var OverviewStore = require('../../stores/OverviewStore.jsx')

var anchorStyle = {
    position: "relative"
}

var OverviewItemTCP = React.createClass({

    getInitialState: function() {
        return {}
    },

    componentWillMount: function(){

    },

    componentDidMount: function(){

    // regist 
    OverviewStore.listen(this.onOverviewChange)
    },

    componentWillUnmount: function() {
        OverviewStore.unlisten(this.onOverviewChange)
    },

    shouldComponentUpdate: function() {
        return false
    },

    setSite: function(){

        this.props.hideOverview()

        setTimeout( SettingActions.setSite.bind(this, this.props.site), 300  )

        this.props.router.push( 'MainTCPProxy' )
    },

    onOverviewChange: function(data) {

        var state = data.sites[this.props.site.siteid]

        if( !state ) return

        this.refs.totalbytes.to(state.totalbytes * 8 / (24 * 60 * 60))
        this.refs.clearproxy.to(state.clearproxy * 8 / (24 * 60 * 60))
    },

    render: function() {

    return (
    <li onClick={this.setSite}>
        <a style={anchorStyle} href="" onClick={ function(e){ e.preventDefault() } }>{this.props.site.sitename + ' (TCP Proxy)'}</a>
        <div className="clearfix">
            <div style={{width:'200px'}}>
                <CountTo ref="totalbytes" type=" bps" end={0} begin={0} time={100} easing="inoutSine" />
                <label>Raw Traffic</label>
            </div>
            <div style={{width:'200px'}}>
                <CountTo ref="clearproxy" type=" bps" end={0} begin={0} time={3000} easing="inoutSine" />
                <label>Clean Traffic</label>
            </div>  
        </div>
    </li>
    );
    }

});

module.exports = withRouter(OverviewItemTCP);
