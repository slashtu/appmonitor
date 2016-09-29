const React = require('react');

let ProgressBar = React.createClass({

    getInitialState: function(){
        return { width: '0px'}
    },

    componentDidMount: function(){
        
    },

    componentWillUnmount: function(){
    },

    showMenu: function(){

    },

    hideMenu: function(){
        
    },

    render: function(){

      let mutatedStyle = {
        width: this.props.width === 0 ? '100%' : this.props.width,
        backgroundColor: this.props.width === 0 ? '#e6e6e6' : null,
    }

      return (
        <div style={mutatedStyle}>       
        </div>   
      )
    },
});

module.exports = ProgressBar;
