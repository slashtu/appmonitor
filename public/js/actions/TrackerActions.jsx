var alt = require('../alt')
var W3CWebSocket = require('websocket').w3cwebsocket;

var trackerWS = require('../setting.js').trackerWS

var currentWS;

var randomCountry = require('random-country');

class TrackerActions {

    constructor() {
        this.generateActions(
        	'setData',
            'resetData'
        )
    }      

    subscribeWS(){
        var self = this;

        setInterval(function(){
          var data = {
            site_id: 'dummy',
            onlineusercount: 69 + Math.round(Math.random()*5),
            latitude: Math.floor(Math.random() * 181) - 90,
            longitude: Math.floor(Math.random() * 361) - 180,
            ip: Math.floor(Math.random() * 255) + '.' + Math.floor(Math.random() * 255) + '.' + Math.floor(Math.random() * 255) + '.' + Math.floor(Math.random() * 255),
            country: randomCountry({ full: true }),
            gt_ms: Math.floor(Math.random() * 500),
            url: 'https://example.com'
          }
          self.actions.setData(data)
        }, 300)

    }
}

module.exports = alt.createActions(TrackerActions)