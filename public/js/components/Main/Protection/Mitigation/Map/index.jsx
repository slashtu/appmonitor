var React = require('react');
import {Helpers} from 'react-scroll'
// const Helpers = Scroll.Helpers

// mixin
let AppMixin = require('../../../../Mixins/AppMixin.jsx')

// store
var WAFStore = require('../../../../../stores/WAFStore.jsx')

// views
import MitigationMap from'../Chart/ThreatsMap'
import DataTable from './DataTable'

const container = {
  position: 'relative'
}


var MitigationContainer = React.createClass({

  mixins: [AppMixin], 

  getInitialState: function(){

    var siteId = this.getSiteId()

    if( siteId === "" ){
      return {
        selectedTab: 'map', 
        data: [], 
        map: {},
      }
    }else{
      return { 
        selectedTab: 'map', 
        data: WAFStore.getState().cddWAFTop10IP[siteId]['data'], 
        map: WAFStore.getState().cddWAFTop10IP[siteId]['map'], 
      }
    }
  },

  componentDidMount: function(){
    WAFStore.listen( this.onChange )
  },

  componentWillUnmount: function(){
    WAFStore.unlisten( this.onChange )
  },

  onChange: function(state){

    var siteId = this.getSiteId()

    if( siteId === "" ) return

    this.setState( { data: state.cddWAFTop10IP[siteId]['data'], map: state.cddWAFTop10IP[siteId]['map'] } )
  },

  render: function() {

    return (

      <div style={container}>
        <h1>Threats</h1>
        <MitigationMap data={this.state.map || [] } />,
        <DataTable data={this.state.map || [] }/>
      </div>

    );
  }
});

module.exports = Helpers.Element(MitigationContainer);