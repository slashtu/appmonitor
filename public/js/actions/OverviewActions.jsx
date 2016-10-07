var alt = require('../alt')
var apiv2 = require('../setting.js').apiv2　
var dummy_overview = require('./dummy/overview.json')

class OverviewActions {
    constructor() {
        this.generateActions(
        	'setData'
        )
    }

    getData(){
        var self = this;
        var WAFActions = require('./WAFActions.jsx')

        setTimeout(
          function(){
            self.actions.setData(dummy_overview)
            WAFActions.setCddWAFTop10IP(dummy_overview)
          }
        ,0)

     //    var CustomerStore = require('../stores/CustomerStore.jsx')

    	// var self = this;

     //    var id =  CustomerStore.getState().user.cid

     //    $.get( apiv2 + '/overview?custid=' + id, function(data){
     //        self.actions.setData( data )
     //        WAFActions.setCddWAFTop10IP(data)
     //    })
     //    .fail(function(){console.log('ajax error')})
    }
}

module.exports = alt.createActions(OverviewActions)
