var React = require('react')
var ReactGridLayout = require('react-grid-layout')
import Link from 'react-router/lib/Link';

var config = require('../setting.js')

var HeaderMenu = require('./HeaderMenu.jsx')

var Timer = require('./Widget/Timer.jsx')
var Menu = require('./Widget/Menu.jsx')

// store 
var SettingStore = require('../stores/SettingStore.jsx')

var Header = React.createClass({
    isToggle: false,

    getInitialState: function(){
        return { name: "\u00a0", toggleStyle: { display: 'none' }}
    },

    componentDidMount: function(){
        SettingStore.listen(this.onChange)
    },

    componentWillUnmount: function(){
        SettingStore.unlisten(this.onChange)
    },

    onChange: function(state){

        let siteName = state.site.sitename

        if(state.site.servicetype === 'tcp')
            siteName += ' (TCP Proxy)'

        this.setState( { name: siteName } )
    },

    toggleAccountMenu: function(){

        var style = {}

        if(this.isToggle){
            
            style.display = 'none'
            this.isToggle = false

        }else{

            style.display = 'block'
            this.isToggle = true

            document.addEventListener("click", this.hide);
        }

        this.setState({toggleStyle: style})
    },

    hide: function(){

        document.removeEventListener("click", this.hide);

        var style = {}

        style.display = 'none'
        this.isToggle = false

        this.setState({toggleStyle: style})
    },
  
    monitorPage: function(){

        // if the user's roles boject contains "admin" string
        if( this.props.user.roles && this.props.user.roles.indexOf('admin') !== -1){
            return ( <li><Link to="Monitor" >Monitor</Link></li>    )
        }
    },

    render: function(){

        return (
            <header>
            <section className="header clearfix">
            <div className="full">
                <ReactGridLayout isDraggable={false} className="layout" cols={12} rowHeight={25} width={980}>
                    <div key={1} _grid={{x: 0, y: 0, w: 6, h: 1}}>
                        <div  className="hd_triangle hd_triangle_l"></div>
                            <Link to="/"><span className="hd_name">APPLICATION PROTECTION</span></Link>
                        <div className="hd_triangle hd_triangle_r"></div>
                    </div>
                    <div id="site-switch" key={2} _grid={{x: 0, y: 1, w: 6, h: 1}}>
                        <div href="#" target="_blank" className="website">{this.state.name}</div>
                        <span className="header-switch" onClick={this.props.toggleOverview}></span>
                    </div>
                    <div key={3} _grid={{x: 10, y: 0, w: 1, h: 1}} className="logo">
                        <a href="#"><p>NETWORKSECURITY</p></a>  
                    </div>    
                    <div key={4} _grid={{x: 6, y: 1, w: 6, h: 1}} className="account">
                        <Timer />
                        <button className="ac_drop" onClick={this.toggleAccountMenu}>
                            { this.props.user.username || ''}
                            <span className="glyphicon glyphicon-cog ac_icon"></span>
                            <span className="ac_caret"></span>
                        </button>
                        <ul className="ac_menu" style={this.state.toggleStyle}>
                            <li><a href="/" >Dashboard</a></li>          
                            <li><Link to="/MainSSLKey">SSL Key Manager</Link></li>
                            <li><a target="_blank" href="/assets/files/AP_guide.pdf" >Portal Guide</a></li>
                            <li><a href={config.sso + '/changepassword'} >Change Password</a></li>
                            {this.monitorPage()}                                
                            <li><a href={config.sso + '/logout'} >Log Out</a></li>
                        </ul>   
                    </div>      
                </ReactGridLayout>
            </div>
            </section>    
            </header>
        )
    },

});

module.exports = Header;
