var React = require('react');

var Timer = React.createClass({

    getInitialState: function(){

        var time = this.getTime()

        return { time: time }
    },

    componentDidMount: function(){

        var self = this

        this.handle = setInterval( function(){

            var time = self.getTime()

            self.setState({ time: time })
        } ,1000)
        
    },

    componentWillUnmount: function(){

        clearInterval(this.handle)
    },

    getTime: function(){

        var date = new Date()

        var year = date.getFullYear()

        var month = date.getMonth() + 1 

        var hours = date.toTimeString().split(' ')[0]

        if(month < 10)
            month = '0' + month

        var day = date.getDate()

        if(day < 10)
            day = '0' + day

        var time = hours + ' ' + month + '-' + day + '-' + year

        return time
    },

    render: function(){

        return (
            <span className="time">{this.state.time}</span>                     
       )
    },

});

module.exports = Timer;
