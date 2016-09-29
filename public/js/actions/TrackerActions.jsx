var alt = require('../alt')
var W3CWebSocket = require('websocket').w3cwebsocket;

var trackerWS = require('../setting.js').trackerWS

var currentWS;

class TrackerActions {

    constructor() {
        this.generateActions(
        	'setData',
            'resetData'
        )
    }      

    subscribeWS(){

        // if a websocket already connected, close it.
        if(typeof currentWS !== 'undefined')
            currentWS.close();

    	var self = this

        //setInterval( this.actions.setData.bind(this, {site_id:'S-81375fec-fe24-4518-8ae6-6b1530be8671', latitude:20, longitude: 120 }) , 1000)

        var CustomerStore = require('../stores/CustomerStore.jsx')
        var SettingStore = require('../stores/SettingStore.jsx')
        var WAFLogActions = require('./WAFLogActions.jsx')

        var cid = CustomerStore.getState().user.cid || ""

        var wb = trackerWS + '?custid=' + cid

        // var wb = 'wss://sso.nxg.me/ws?custid=C-31148721-4285-4198-ad58-33844586165d'

    	var client = new W3CWebSocket( wb, 'echo-protocol');

        currentWS = client;

    	client.onopen = function() {
            console.log('WebSocket Client Connected');
        };

        client.onmessage = function(e) {

            if (typeof e.data === 'string') {

                let data = JSON.parse(e.data)

                if( data.module )
                    WAFLogActions.setCddWAFLog(data)
                else
                    self.actions.setData(data)
            }
        };
    }
}

module.exports = alt.createActions(TrackerActions)