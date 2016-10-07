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

        var data = {
          plt: [0, Math.floor(Math.random() * 100)],
          pltc: [0, Math.floor(Math.random() * 100)],
          plturl: [0, Math.floor(Math.random() * 100)],
          plturlc: [0, Math.floor(Math.random() * 100)],
          browser: [0, Math.floor(Math.random() * 100)],
          platform: [0, Math.floor(Math.random() * 100)],
          searchengine: [0, Math.floor(Math.random() * 100)],
          referrer: [0, Math.floor(Math.random() * 100)],
          pageviews: [0, Math.floor(Math.random() * 100)],
          visitors: [0, Math.floor(Math.random() * 100)],
          newvisitors: [0, Math.floor(Math.random() * 100)],
        }
        
        setTimeout(function(){
          self.actions.setWAData( data )           
        }, 0)

        // $.get( api, function(data){
        //     self.actions.setWAData( data )
        // })
        // .fail(function(){console.log('ajax error')})
    }
}

module.exports = alt.createActions(WAActions)
