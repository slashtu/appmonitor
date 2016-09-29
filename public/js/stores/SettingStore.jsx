var alt = require('../alt')

// action
var SettingActions = require('../actions/SettingActions.jsx')

var SettingStore = alt.createStore(class SettingStore {
  	
  	constructor() {

  		this.site = {}

	    this.bindActions(SettingActions)
	}

	setSite( data ){
		this.site = data
	}
})

module.exports = SettingStore
