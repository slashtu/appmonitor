var alt = require('../alt')

var Lib = require('../lib/Lib.js')

// 12hours
var twelve_hours_cachehit = require('./dummy/12hours/cachehit.json')
var twelve_hours_legitimated = require('./dummy/12hours/legitimated.json')
var twelve_hours_upstream = require('./dummy/12hours/upstream.json')
var twelve_hours_request = require('./dummy/12hours/request.json')
var twelve_hours_totalbytes = require('./dummy/12hours/totalbytes.json')

// 1day
var aday_cachehit = require('./dummy/1day/cachehit.json')
var aday_legitimated = require('./dummy/1day/legitimated.json')
var aday_upstream = require('./dummy/1day/upstream.json')
var aday_request = require('./dummy/1day/request.json')
var aday_totalbytes = require('./dummy/1day/totalbytes.json')

// 7days
var sevendays_cachehit = require('./dummy/7days/cachehit.json')
var sevendays_legitimated = require('./dummy/7days/legitimated.json')
var sevendays_upstream = require('./dummy/7days/upstream.json')
var sevendays_request = require('./dummy/7days/request.json')
var sevendays_totalbytes = require('./dummy/7days/totalbytes.json')

// 30days
var thirtydays_cachehit = require('./dummy/30days/cachehit.json')
var thirtydays_legitimated = require('./dummy/30days/legitimated.json')
var thirtydays_upstream = require('./dummy/30days/upstream.json')
var thirtydays_request = require('./dummy/30days/request.json')
var thirtydays_totalbytes = require('./dummy/30days/totalbytes.json')

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

        var now = Math.floor( new Date().getTime() / 1000);

        var self = this

        var api = ''

        const mitigation = 'badip,badgeo,authquote,badscan,badbot,badhead,duphead,emptyhead,authlevel,spiderquote,rdnsquote'

        var field = 'request,threat,totalbytes,pageviews,visitors,legitimated,cachehit,upstream,clearproxy,totalblock' + ',' + mitigation

        // for value "per minute"
        var intervalMins = 0

        switch(type){

          case 'PROTECTION_TRENDS_2MINS':

            intervalMins = 5     
            api = Lib.getAPI( { interval: '5min', field: field, length: 12 * 60 / intervalMins } )

            var data = {
              "authlevel": [],
              "authquote": [],
              "badbot": [],
              "badgeo": [],
              "badhead": [],
              "badip": [],
              "badscan": [],
              cachehit: twelve_hours_cachehit.cachehit,
              "clearproxy": [],
              "duphead": [],
              "emptyhead": [],
              legitimated: twelve_hours_legitimated.legitimated,
              "pageviews": [],
              "rdnsquote": [],
              "request": twelve_hours_request.request,
              "spiderquote": [],
              "threat": [],
              "totalbytes": twelve_hours_totalbytes.totalbytes,
              upstream: twelve_hours_upstream.upstream,
              "visitors": []
            }

            for(var pro in data){
              var twelveHoursAgo = now - 144 * 300;

              for( var index = 0 ; index < 144 ; index++ ){
                if(data[pro].length < 144){
                  data[pro].push([twelveHoursAgo, Math.floor(Math.random()*100)])
                }
                else{
                  data[pro][index][0] = twelveHoursAgo;
                }
                twelveHoursAgo = twelveHoursAgo + 300
              }
            }

            setTimeout(function(){
              self.actions.setProtectionData( { type: type, intervalMins: intervalMins, data: data })
            },0)
            
            break

          case 'PROTECTION_TRENDS_1DAY':

            intervalMins = 5     
            api = Lib.getAPI( { interval: "5min", field: field, length: 24 * 60 / intervalMins } )

            var data = {
              "authlevel": [],
              "authquote": [],
              "badbot": [],
              "badgeo": [],
              "badhead": [],
              "badip": [],
              "badscan": [],
              cachehit: aday_cachehit.cachehit,
              "clearproxy": [],
              "duphead": [],
              "emptyhead": [],
              legitimated: aday_legitimated.legitimated,
              "pageviews": [],
              "rdnsquote": [],
              "request": aday_request.request,
              "spiderquote": [],
              "threat": [],
              "totalbytes": aday_totalbytes.totalbytes,
              upstream: aday_upstream.upstream,
              "visitors": []
            }

            for(var pro in data){
              var twelveHoursAgo = now - 288 * 300;

              for( var index = 0 ; index < 288 ; index++ ){
                if(data[pro].length < 288){
                  data[pro].push([twelveHoursAgo, Math.floor(Math.random()*100)])
                }
                else{
                  data[pro][index][0] = twelveHoursAgo;
                }
                twelveHoursAgo = twelveHoursAgo + 300
              }
            }

            setTimeout(function(){
              self.actions.setProtectionData( { type: type, intervalMins: intervalMins, data: data })
            },0)

            break

          case 'PROTECTION_TRENDS_7DAYS':

            intervalMins = 60     
            api = Lib.getAPI( { interval: "hour", field: field, length: 7 * 24 * 60 / intervalMins } )

            var data = {
              "authlevel": [],
              "authquote": [],
              "badbot": [],
              "badgeo": [],
              "badhead": [],
              "badip": [],
              "badscan": [],
              cachehit: sevendays_cachehit.cachehit,
              "clearproxy": [],
              "duphead": [],
              "emptyhead": [],
              legitimated: sevendays_legitimated.legitimated,
              "pageviews": [],
              "rdnsquote": [],
              "request": sevendays_request.request,
              "spiderquote": [],
              "threat": [],
              "totalbytes": sevendays_totalbytes.totalbytes,
              upstream: sevendays_upstream.upstream,
              "visitors": []
            }

            for(var pro in data){
              var twelveHoursAgo = now - 168 * 3600;

              for( var index = 0 ; index < 168 ; index++ ){
                if(data[pro].length < 168){
                  data[pro].push([twelveHoursAgo, Math.floor(Math.random()*100)])
                }
                else{
                  data[pro][index][0] = twelveHoursAgo;
                }
                twelveHoursAgo = twelveHoursAgo + 3600
              }
            }

            setTimeout(function(){
                self.actions.setProtectionData( { type: type, intervalMins: intervalMins, data: data })
            },0)

            break

          case 'PROTECTION_TRENDS_30DAYS':

            intervalMins = 1440   
            api = Lib.getAPI( { interval: "day", field: field, length: 30 * 24 * 60 / intervalMins } )

            var data = {
              "authlevel": [],
              "authquote": [],
              "badbot": [],
              "badgeo": [],
              "badhead": [],
              "badip": [],
              "badscan": [],
              cachehit: thirtydays_cachehit.cachehit,
              "clearproxy": [],
              "duphead": [],
              "emptyhead": [],
              legitimated: thirtydays_legitimated.legitimated,
              "pageviews": [],
              "rdnsquote": [],
              "request": thirtydays_request.request,
              "spiderquote": [],
              "threat": [],
              "totalbytes": thirtydays_totalbytes.totalbytes,
              upstream: thirtydays_upstream.upstream,
              "visitors": []
            }

            for(var pro in data){
              var twelveHoursAgo = now - 30 * 86400;

              for( var index = 0 ; index < 30 ; index++ ){
                if(data[pro].length < 30){
                  data[pro].push([twelveHoursAgo, Math.floor(Math.random()*100)])
                }
                else{
                  data[pro][index][0] = twelveHoursAgo;
                }
                twelveHoursAgo = twelveHoursAgo + 86400
              }
            }
            
            setTimeout(function(){
                self.actions.setProtectionData( { type: type, intervalMins: intervalMins, data: data })
            },0)    

            break
        }

        //this.actions.ajax(api, type, intervalMins)
    }
}

module.exports = alt.createActions(SiteActions)
