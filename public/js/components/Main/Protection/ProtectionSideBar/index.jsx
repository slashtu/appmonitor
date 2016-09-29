// modules
import React from 'react'

// mixin
import AppMixin from 'app/components/Mixins/AppMixin.jsx'

// components
import Collapse from 'app/components/Widget/Collapse/Collapse'
import Panel from 'app/components/Widget/Collapse/Panel'
import CountTo from 'app/components/Widget/CountTo.jsx'

// stores
import MitigationStore from 'store/MitigationStore.js'
import WAFStore from 'store/WAFStore.jsx'

// css
import css from './ProtectionSideBar.css'

// utility
import Utility from 'app/lib/Lib' 

let ProtectionSideBar = React.createClass({

  mixins: [AppMixin], 

  getInitialState: function(){

    var siteId = this.getSiteId()

    if( siteId === "" ){
      return { 
        activeKey: 'mitigation', 
        mitigation: [],
        waf: []
      }
    }else{
      return { 
        activeKey: 'mitigation', 
        mitigation: MitigationStore.getState().mitigationData, 
        waf: WAFStore.getState().wafData, 
      }
    }

    
  },

  componentDidMount: function() {
    MitigationStore.listen(this.onMitigationChange)
    WAFStore.listen(this.onWAFStoreChange)
  },

  componentWillUnmount: function() {
    MitigationStore.unlisten(this.onMitigationChange)
    WAFStore.unlisten(this.onWAFStoreChange)
  },

  onMitigationChange: function( data ){
    this.setState( {mitigation: data.mitigationData})

    // calculate mitigation total
    let mitigation = data.mitigationData.reduce((pre, cur) => {
      return { count: pre.count + cur.count }
    })
    this.refs.mitigation.to(mitigation.count)
  },

  onWAFStoreChange: function(data) {
    this.setState( {waf: data.wafData})

    // calculate mitigation total
    let waf = data.wafData.reduce((pre, cur) => {
      return { count: pre.count + cur.count }
    })
    this.refs.waf.to(waf.count)
  },

  selectHandler: function( key ) {
    if( key === this.state.activeKey) return;

    this.props.selectType( key )
    this.setState({ activeKey: key })
  },

  render: function() {
    return (
      <div className={css.ProtectionSideBar}>
        <Collapse className={css.collapse} >
          <Panel 
            barData={this.state.mitigation} 
            onClick={this.selectHandler.bind(this, 'mitigation')} 
            className={css.panel}
            iconClassName={css.icon}
            selected={(this.state.activeKey === 'mitigation')}
            key="mitigation"
          >
            <div className={ css.item + ' ' + ((this.state.activeKey === 'mitigation') ? css.active : '')}>
              <div>DDoS PROTECTION</div>
              <div className={css.panelTotal}><CountTo ref="mitigation" end={0} begin={0} time={5000} easing="inoutSine" /></div>
              <span className={css.panelUnit}>threats</span>
            </div>
          </Panel>
          <Panel 
            barData={this.state.waf} 
            onClick={this.selectHandler.bind(this, 'waf')} 
            className={css.panel}
            iconClassName={css.icon}
            selected={(this.state.activeKey === 'waf')}
            key="waf"
          >
            <div className={ css.item + ' ' + ((this.state.activeKey === 'waf') ? css.active : '')}>
              <div>WAF PROTECTION</div>
              <div className={css.panelTotal}><CountTo ref="waf" end={0} begin={0} time={5000} easing="inoutSine" /></div>
              <span className={css.panelUnit}>threats</span>
            </div>
          </Panel>
        </Collapse>
      </div>
    );
  }

});

module.exports = ProtectionSideBar;