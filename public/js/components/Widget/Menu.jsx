var React = require('react');

var Conf = require('../../setting.js')

var menu_contents = {

    display: 'block',
    right: '-200px'
}

var Menu = React.createClass({

    getInitialState: function(){

        return { }
    },

    componentDidMount: function(){
        
    },

    componentWillUnmount: function(){
    },

    showMenu: function(){
        $("#menu_contents").animate({right:'0'},"slow");

        document.addEventListener("click", this.hideMenu);
    },

    hideMenu: function(){
        
        document.removeEventListener("click", this.hideMenu);

        $("#menu_contents").animate({right:'-200'},"slow");
    },

    render: function(){

        return (
            <div id="menu">
                <button id="menu_btn" className="menu_btn" onClick={this.showMenu}></button>
                <div id="menu_contents" style={menu_contents}>
                    <li className="menu_hr"><a href="#"  className="menu_a">Application Protection</a></li>
                    <li className="menu_hr"><a href={Conf['myop_host']} className="menu_a">Origin Protection</a></li>
                    <li className="menu_hr"><a href={Conf['gdns_host']} className="menu_a">DNS Protection</a></li>
                </div>
            </div>   
       )
    },

});

module.exports = Menu;
