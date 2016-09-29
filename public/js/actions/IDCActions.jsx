var alt = require('../alt')

var Lib = require('../lib/Lib.js')

class IDCActions {

    constructor() {
        this.generateActions(
          'setIDC'
        )
    }

    getIDCRequests(){

        var api = Lib.getAPI( { interval: "day", field: 'idcrequest', length: "1" } )

        var self = this

        $.get( api, function(data){
            self.actions.setIDC( data )
        })
        .fail(function(){console.log('ajax error')})
    }
}

module.exports = alt.createActions(IDCActions)
