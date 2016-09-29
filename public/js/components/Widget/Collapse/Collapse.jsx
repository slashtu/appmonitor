import React from 'react'

import Panel from './Panel' 

let Collapse = React.createClass({

  getInitialState: function(){

    return { activeKey: '' }
  },

  onClickIcon: function( key, event ){
    event.stopPropagation()
    this.setState({ activeKey: key === this.state.activeKey ? '' : key })
  },

  getPanels: function(){

    let self = this;

    const panels = this.props.children.map(function( panel ){

      const active = panel.key === self.state.activeKey ? true : false

      const props = {
        children: panel.props.children,
        active: active,
        key: panel.key,
        style: panel.props.style,
        onClickIcon: self.onClickIcon.bind( self, panel.key),
        onClick: panel.props.onClick,
        barData: panel.props.barData,
        className: panel.props.className,
        iconClassName: panel.props.iconClassName,
        selected: panel.props.selected,
      }

      return <Panel {...props} />
    })

    return panels
  },

  render: function() {
    return (
      <div className={this.props.className}>
        {this.getPanels()}
      </div>
    )
  }
})

Collapse.propTypes = {
  css: React.PropTypes.object,
}

module.exports = Collapse