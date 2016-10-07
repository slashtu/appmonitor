var alt = require('../alt')
var config = require('../setting.js')
var Lib = require('../lib/Lib.js')
var dummy_me = require('./dummy/me.json')

class CustomerActions {
  	constructor() {
	    this.generateActions(
	    	'setCustomer',
            'setMonitorCustomer'
	    )
  	}

    monitorCustomer( customer ){
        this.actions.setMonitorCustomer(customer)
    }

	getAccountInfo(){

		var self = this

        var token = Lib.loadToken()

        this.actions.setCustomer(dummy_me);

        //  $.ajax({
        //         dataType: "json",
        //         url: config.sso + "/me",
        //         beforeSend: function(xhr) {
        //             //xhr.setRequestHeader("Authorization", "Bearer " + token);
        //         },


        //         xhrFields: {
        //           withCredentials: true
        //         },

        //         success: function( data ) {
        //             if(data.user)
        //                 self.actions.setCustomer( data ) 
        //         },

        //         error: function(jqXHR){
        //             if(jqXHR.status === 401 || jqXHR.status === 400)
        //                 window.location.replace(config.sso + '?redirect_uri=' + config.host) 
        //         }
        // })

        // $.ajax({
        //     dataType: "json",
        //     url: config.sso + "/me",
        //     crossDomain: true,
        //     // xhrFields: {
        //     //     withCredentials: true
        //     // },
            
        //     success: function( data ) { self.actions.setCustomer( data ) },

        //     error: function() { 

        //          console.log("[CustomerActions] -> getAccountInfo()")

        //          //  401 error 
        //          //window.location.replace(config.sso) 
        //     }     
        // })
	}
}

module.exports = alt.createActions(CustomerActions)
