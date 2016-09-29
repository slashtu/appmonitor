import React from 'react'
import Scroll from 'react-scroll' 

const Link = Scroll.Link;

// components
import MitigationContainer from './Mitigation'
import WAFContainer from './WAF';
import ProtectionSideBar from './ProtectionSideBar'

// css
import css from './Protection.css'

var MainProtection = React.createClass({

  getInitialState: function(){
    return { type: 'mitigation' }
  },

  renderContainer: function(){

    let component = null

    switch(this.state.type){
      
      case 'mitigation':
        component = <MitigationContainer />
        break;

      case 'waf':
        component = <WAFContainer />
        break;

      default:
        component = <MitigationContainer /> 
    }
    return component
  },

  selectType: function(type){
    this.setState({ type: type })
  },

  render: function() {

    return (
      <section id="MainViews-Protection" className={css.protection}>
        <ProtectionSideBar selectType={ this.selectType }/>
        <div className={css.content}>
          {this.renderContainer()}
        </div>
      </section>
    );
  }
});

module.exports = MainProtection;