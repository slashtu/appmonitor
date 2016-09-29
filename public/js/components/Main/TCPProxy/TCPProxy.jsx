var React = require('react');
var Scroll = require('react-scroll'); 

var Link = Scroll.Link;

// views
var TCPProxyTrend = require('./TCPProxyTrend.jsx')

var style = {

    left: '112.5px',
    display: 'block'
}

var MainTCPProxy = React.createClass({

    componentDidMount: function(){
        $('.simple').hide()
        $('#full').fadeIn('slow')
    },

    componentWillUnmount: function() {
        $('.simple').fadeIn('slow')
        $('#full').hide()
    },

    onScroll: function(event){

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

    render: function() {

        return (
          <section id="MainViews-TCPProxy" >   
            <TCPProxyTrend />
          </section>
        );
    }

});

module.exports = MainTCPProxy;