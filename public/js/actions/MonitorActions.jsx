var alt = require('../alt')
var config = require('../setting.js')
var Lib = require('../lib/Lib.js')

class MonitorActions {
	constructor() {
    this.generateActions(
    	'setCustomerList'
    )
	}

	getCustomerList(){

		var self = this

    // var token = Lib.loadToken()
    $.ajax({
      dataType: "json",
      url: config.sso + "/apiv1/customerlist",
      beforeSend: function(xhr) {
          //xhr.setRequestHeader("Authorization", "Bearer " + token);
      },

      xhrFields: {
        withCredentials: true
      },

      success: function( data ) {
        self.actions.setCustomerList( data ) 
      },

      error: function(jqXHR){
        if(jqXHR.status === 401){
            window.location.replace(config.sso + '?redirect_uri=' + config.host) 
        }
      }
    })
	}
}

module.exports = alt.createActions(MonitorActions)
