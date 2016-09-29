var alt = require('../alt');
var shortId = require('shortid');

// action
var WAFLogActions = require('../actions/WAFLogActions.jsx');


var WAFLogStore = alt.createStore(class WAFLogStore {
  	
  	constructor() {

	    this.bindActions(WAFLogActions);
	    this.cddWAFLog = [];
	}

	setCddWAFLog( data ){

		var log = {};

		log['id'] = shortId.generate();
		log['client'] = data.info.client;
		log['time'] = new Date().toLocaleString();
		log['url'] = data.info.host;

		log['category'] = data.info.data[0].split('/').pop();

		this.cddWAFLog.push(log);

		if( this.cddWAFLog.length > 200 ) this.cddWAFLog.shift();
	}

	resetData(){

		this.cddWAFLog = [];
	}

})

module.exports = WAFLogStore
