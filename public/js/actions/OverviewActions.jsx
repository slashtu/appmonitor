var alt = require('../alt')
var apiv2 = require('../setting.js').apiv2

class OverviewActions {
    constructor() {
        this.generateActions(
        	'setData'
        )
    }

    getData(){

        var WAFActions = require('./WAFActions.jsx')

        var CustomerStore = require('../stores/CustomerStore.jsx')

    	var self = this;

        var id =  CustomerStore.getState().user.cid

        $.get( apiv2 + '/overview?custid=' + id, function(data){
            self.actions.setData( data )
            WAFActions.setCddWAFTop10IP(data)
        })
        .fail(function(){console.log('ajax error')})
    }
}

module.exports = alt.createActions(OverviewActions)
