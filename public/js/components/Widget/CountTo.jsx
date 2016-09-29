var React = require('react');
var ease = require('ease-component');

var CountTo = React.createClass({

    begin: 0,
    end: 0,

    getInitialState: function() {
        return { value: this.props.begin };
    },

    componentDidMount: function() {
        this.handle = -1;
    },

    componentWillUnmount: function(){
        clearInterval(this.handle); 
    },

    animate: function() {
        this.draw()
    },

    to: function( end ){

        if(end == this.end || end < 0) return
        
        if(this.handle > 0){
            clearInterval(this.handle)
            this.handle = -1
        }

        this.end = parseInt(end);

        this.start = Date.now();
        this.handle = setInterval(this.animate, 10);
    },

    draw: function() {
        
        if (!this.isMounted()) return;

        var time = this.props.time;
        var begin = this.begin;
        var end = this.end;
        var easing = this.props.easing;

        easing = easing && easing in ease ? easing : 'outCube';
        
        var now = Date.now()

        if (now - this.start >= time || begin === end) {

            this.begin = end;

            clearInterval(this.handle); 
            this.handle= -1;
        }
        
        var percentage = (now - this.start) / time;
        
        percentage = percentage > 1 ? 1 : percentage;
        
        var easeVal = ease[easing](percentage);
        var val = begin + (end - begin) * easeVal;

        this.setState({ value: val });
    },

    format: function( number ){

        if( number > 1000000)
            return Math.floor(number / 1000000) + " M"

        if(number > 1000)
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        return number
    },

    render: function() {
        return ( 
            <div style={this.props.style} className="counter" >{ this.format(Math.round(this.state.value)) }<span style={{fontSize: '12px'}}>{this.props.type}</span></div> 
        );
    }
});

module.exports = CountTo;