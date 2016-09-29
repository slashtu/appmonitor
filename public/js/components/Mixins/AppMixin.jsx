

// store
var SettingStore = require('../../stores/SettingStore.jsx')

var AppMixin = {

	getSiteId: function(){
		return SettingStore.getState().site.siteid || ""
	},

	returnTop: function(e){
        if(e) e.preventDefault();
        $('html,body').scrollTop(0);
    },

	immediateAndInterval: function( fn, time ){
		
		fn()

		return setInterval( fn, time )
	},

  format: function( number ){

    if(number > 1000)
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return number
  },
}

module.exports = AppMixin
