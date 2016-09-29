var alt = require('../alt')
var merge = require('object-assign')

// action
var IDCActions = require('../actions/IDCActions.jsx')

var IDCStore = alt.createStore(class IDCStore {
  	
  	constructor() {

	    this.bindActions(IDCActions)
	    this.idcrequest = {}
	}

	setIDC(data){
		this.idcrequest = data.idcrequest
		// console.log(data)
	}
})

module.exports = IDCStore
