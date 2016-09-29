var React = require('react');
var shortId = require('shortid')

var DataTable = React.createClass({

  getInitialState: function(){
    return { isOpened: true }
  },

  componentDidMount: function(){
  
  },

  componentWillUnmount: function(){
    
  },

  onChange: function(state){

  },

  toggleDatatable: function(){

    this.setState({ isOpened: !this.state.isOpened })
  },

  renderData: function(){
    var components = this.props.data.map(function( threat ){

      return ( 
        <tr key={shortId.generate()}>
          <td>{threat.ip}</td>
          <td>{threat.country}</td>
          <td>{threat.count}</td>
        </tr> )
    })
    return components           
  },

  render: function() {

    var toggleClass = ""
    var tableStyle = {}

    if(!this.state.isOpened){
      toggleClass = "DatatablesSmallOpen"
      tableStyle = { display: 'none' }
    }

    return (
      <div className="Threats Datatables">
        <div>
          <div className="clearfix" onClick={this.toggleDatatable}>
            <label>Threat Source IPs</label>
            <span className= {"DatatablesSmall " + toggleClass }></span>
          </div>
        </div>
        <div className="DatatablesTable" style={tableStyle}>
          <table ng-show="Datatables.Threats">
            <thead>
              <tr>
                <th>IP Address</th>
                <th>Country</th>
                <th>Threats</th>
              </tr>
            </thead>
            <tbody>
              {this.renderData()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

});

module.exports = DataTable;