import React from 'react'

import PercentBar from '../PercentBar'
import {VelocityTransitionGroup} from 'velocity-react'

// svg
import Plus from 'svg/protect_icon_plus.svg'
import Minus from 'svg/protect_icon_minus.svg'

const activeStyle = {
  fill: '#e15829'
}

let Panel = React.createClass({

  getInitialState: function(){
    return {}
  },

  getContent: function(){
    if(this.props.active) 
      return <PercentBar protections={this.props.barData} barMaxWidth={150} />
  },

  render: function() {
    const Icon = this.props.active ? Minus : Plus
    return (
      <div onClick={this.props.onClick} className={this.props.className}>
        {this.props.children}
        <Icon style={ this.props.selected ? activeStyle : {}} className={this.props.iconClassName} onClick={this.props.onClickIcon} />
        <VelocityTransitionGroup enter={{animation: "slideDown"}} leave={{animation: "slideUp"}}>
          {this.getContent()}
        </VelocityTransitionGroup>
      </div>
    )
  }
})

Panel.propTypes = {
  onClick: React.PropTypes.func,
  style: React.PropTypes.object,
  barData: React.PropTypes.array,
}

module.exports = Panel