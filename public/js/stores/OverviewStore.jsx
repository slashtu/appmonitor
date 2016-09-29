var alt = require('../alt')

// action
var OverviewActions = require('../actions/OverviewActions.jsx')

var OverviewStore = alt.createStore(class OverviewStore {
  	
  	constructor() {

  		this.sites = {}

	    this.bindActions(OverviewActions)
	}

	setData( data ){
		this.sites = data
	}
})

module.exports = OverviewStore
