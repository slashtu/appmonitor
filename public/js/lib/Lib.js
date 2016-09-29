var apiv2 = require('../setting.js').apiv2

module.exports = {

	getAPI: function(query){

        var SettingStore = require('../stores/SettingStore.jsx')

        var siteId = SettingStore.getState().site.siteid || ""

        if( siteId === "" ){
            console.log("error, siteId is empty")
            return ""
        }

        var api = apiv2 + '?siteid=' + siteId + 
                          '&interval=' + query.interval +
                          '&field=' + query.field +
                          '&length=' + query.length

        return api
    },

    getSiteSetting: function(){
        
        var SettingStore = require('../stores/SettingStore.jsx')

        return SettingStore.getState().site
    },

    getDomain: function(query){

        var SettingStore = require('../stores/SettingStore.jsx')

        var domain

        if(SettingStore.getState().site)
            domain = SettingStore.getState().site.sitename || ""

        return domain
    },

    objectToArray: function( obj, cb ){
        
        var arr = []

        for( var key in obj ){
            
            var item = cb( key, obj[key] )
            
            if( item != null )
                arr.push( item )
        }

        return arr
    },

    loadToken: function(){

        var token = null

        document.cookie.split(';').forEach(function( cookie ){

                    var parts = cookie.split('=')

                    if(parts[0].trim() === 'token' ){
                        token = parts[1]
                    }
        })

        return token 
    },

    numberFormat: function( x ){

        if( typeof x === 'undefined')
            return ""

        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    },

    isEmpty: function(obj) {

        // null and undefined are "empty"
        if (obj == null) return true;

        // Assume if it has a length property with a non-zero value
        // that that property is correct.
        if (obj.length > 0)    return false;
        if (obj.length === 0)  return true;

        // Otherwise, does it have any properties of its own?
        // Note that this doesn't handle
        // toString and valueOf enumeration bugs in IE < 9
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop))
                return false;
        }

        return true;
    },
}