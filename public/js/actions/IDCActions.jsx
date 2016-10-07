var alt = require('../alt')
var Lib = require('../lib/Lib.js')
var dummy_idc = require('./dummy/idcrequest.json')

class IDCActions {

    constructor() {
        this.generateActions(
          'setIDC'
        )
    }

    getIDCRequests(){

      var api = Lib.getAPI( { interval: "day", field: 'idcrequest', length: "1" } )

      var self = this

      setTimeout(function(){
        self.actions.setIDC( dummy_idc )       
      })


      // $.get( api, function(data){
      //     self.actions.setIDC( data )
      // })
      // .fail(function(){console.log('ajax error')})
    }
}

module.exports = alt.createActions(IDCActions)
