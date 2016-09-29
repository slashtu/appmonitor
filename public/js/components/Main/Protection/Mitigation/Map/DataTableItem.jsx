import React from 'react';
import {VelocityTransitionGroup} from 'velocity-react';

// svg
import Plus from 'svg/protect_icon_plus.svg';
import Minus from 'svg/protect_icon_minus.svg'

// css
import css from './DataTableItem.css'

let presets = {
  noWobble: {stiffness: 170, damping: 26}, // the default, if nothing provided
  gentle: {stiffness: 120, damping: 14},
  wobbly: {stiffness: 180, damping: 12},
  stiff: {stiffness: 210, damping: 20},
};
/* --------------------------- CSS --------------------------------------*/ 

const trStyle = {
  textAlign: 'left',
}

const column1Style = {
  display: 'inline-block',
  width: '85%',
  lineHeight: '36px',
  height: '100%',
  paddingLeft: '5px',
}

const column2Style = {
  display: 'inline-block',
  width: '10%',
}

const column3Style = {
  display: 'inline-block',
  cursor: 'pointer',
}

const itemDisplayStyle = {
  height: '36px',

}

const fullDisplayStyle = {
  backgroundColor: 'rgb(153, 153, 153)',
}

/* --------------------------- CSS --------------------------------------*/ 

const dummyThreats = [

  {key: 't1', data:{ip: '1.1.1.1', count: 3}},
  {key: 't2', data:{ip: '3.1.1.1', count: 44}},
  {key: 't3', data:{ip: '2.1.2.1', count: 143}},
  {key: 't4', data:{ip: '5.1.1.1', count: 5}},

]

let inProcess = false;
const processTime = 500;

let MitigationCountryItem = React.createClass({

  getInitialState: function(){
    return { 
      isOpened: false,
      data: [],
    }
  },

  componentDidMount: function(){
  
  },

  componentWillUnmount: function(){
    
  },

  onChange: function(state){

  },

  toggle: function(){

    if( inProcess ) return;

    inProcess = true;

    setTimeout( () => {
      inProcess = false;
    }, processTime);

    let open = this.state.isOpened

    if(open){
      this.setState({ isOpened: !open , data:[]})
    }else{
      this.setState({ isOpened: !open , data: this.props.threat.ip})
    }
  },

  willEnter() {
    return {
      height: 0,
      opacity: 0,
    }
  },

  willLeave() {
    return {
      height: spring(0),
      opacity: 0,
    }
  },

  renderDetail: function(){
    let arr = this.state.data.map(( threat, i) => {
      console.log(threat)
      return (
        <div key={threat.key} style={fullDisplayStyle}>
          <div>
            <div style={column1Style} >{threat.data.addr}</div>
            <div style={column2Style} >{threat.data.count}</div>
          </div>
        </div>
      )
    });

    return arr;
  },

  render: function() {

    let threat = this.props.threat

    let Icon, iconClassName;

    if( this.state.isOpened ){
      Icon = Minus;
      iconClassName = `${css.icon} ${css.active}`
    }else{
      Icon = Plus;
      iconClassName = `${css.icon}`
    }

    return (
      <div style={trStyle}>
        <div className="item" style={itemDisplayStyle}>
          <div style={column1Style} >{threat.country}</div>
          <div style={column2Style} >{threat.count}</div>
          <div style={column3Style} className={css.iconContainer} onClick={this.toggle}><Icon className={iconClassName} /></div>
        </div>
        <VelocityTransitionGroup  enter={{animation: "slideDown", duration: 300}} leave={{animation: "slideUp", duration: 300}}>
        { this.renderDetail() }
        </VelocityTransitionGroup>
      </div> 
    )
  }

});

module.exports = MitigationCountryItem;