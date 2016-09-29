var alt = require('../alt')

var Lib = require('../lib/Lib.js')

class SiteActions {

    constructor() {
        this.generateActions(
          'setProtectionData'
        )
    }

    ajax( api, type, intervalMins){

        var self = this

        $.get( api, function(data){
            self.actions.setProtectionData( { type: type, intervalMins: intervalMins, data: data })
        })
        .fail(function(){console.log('ajax error')})
    }

    getProtectionData( type ){

        var api = ''

        const mitigation = 'badip,badgeo,authquote,badscan,badbot,badhead,duphead,emptyhead,authlevel,spiderquote,rdnsquote'

        var field = 'request,threat,totalbytes,pageviews,visitors,legitimated,cachehit,upstream,clearproxy,totalblock' + ',' + mitigation

        // for value "per minute"
        var intervalMins = 0

        switch(type){

            case 'PROTECTION_TRENDS_2MINS':

                intervalMins = 5     
                api = Lib.getAPI( { interval: '5min', field: field, length: 12 * 60 / intervalMins } )
                
                break

            case 'PROTECTION_TRENDS_1DAY':

                intervalMins = 5     
                api = Lib.getAPI( { interval: "5min", field: field, length: 24 * 60 / intervalMins } )

                break

            case 'PROTECTION_TRENDS_7DAYS':

                intervalMins = 60     
                api = Lib.getAPI( { interval: "hour", field: field, length: 7 * 24 * 60 / intervalMins } )

                break

            case 'PROTECTION_TRENDS_30DAYS':

                intervalMins = 1440   
                api = Lib.getAPI( { interval: "day", field: field, length: 30 * 24 * 60 / intervalMins } )

                break
        }

        this.actions.ajax(api, type, intervalMins)
    }
}

module.exports = alt.createActions(SiteActions)
