var alt = require('../alt')

var Lib = require('../lib/Lib.js')

class WAActions {

    constructor() {
        this.generateActions(
          'setWAData'
        )
    }


    getWAData( type ){

        var self = this

        var field = "plt,pltc,plturl,plturlc,browser,platform,searchengine,referrer,pageviews,visitors,newvisitors"
                
        var api = Lib.getAPI( { interval: "day", field: field, length: "1" } )
           

        $.get( api, function(data){
            self.actions.setWAData( data )
        })
        .fail(function(){console.log('ajax error')})
    }
}

module.exports = alt.createActions(WAActions)
