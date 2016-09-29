let React = require('react');
let shortId = require('shortid')

let DataTableItem = require('./DataTableItem')

let dataTableStyle = {
  left: '372px',
  bottom: '-60px'
}

let trStyle = {
  textAlign: 'left',
  padding: '5px',
  color: '#989898',
}

let column1Style = {
  display: 'inline-block',
  width: '85%',
}

let column2Style = {
  display: 'inline-block',
}

let MitigationDataTable = React.createClass({

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
    let arr = []
    let map = this.props.data

    // remove useless property
    delete map.renameProperty 

    for( let country in map ){
      let total = map[country]['count']
      let name = map[country]['country']
      let ip = map[country]['ip']
      let key = map[country]['key']

      arr.push( 
        <DataTableItem key={key} threat={{count: total, country: name, ip: ip}}/> 
      )
    }

    // let components = this.props.data.map(function( threat ){

    //   return ( 
    //     <DataTableItem threat={threat} />
    //   )
    // })
    return arr          
  },

  render: function() {

    let toggleClass = ""
    let tableStyle = {}

    if(!this.state.isOpened){
      toggleClass = "DatatablesSmallOpen"
      tableStyle = { display: 'none' }
    }

    return (
      <div className="Threats Datatables attack-country" >
        <div>
          <div className="clearfix" onClick={this.toggleDatatable}>
            <label>Attack Country</label>
            <span className= {"DatatablesSmall " + toggleClass }></span>
          </div>
        </div>
        <div className="DatatablesTable" style={tableStyle}>
          <div className="head">
              <div style={trStyle}>
                <div style={column1Style}>Country</div>
                <div style={column2Style}>Threats</div>
              </div>
              <div className="body">
                {this.renderData()}
              </div>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = MitigationDataTable;