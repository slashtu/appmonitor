var alt = require('../alt')
var shortId = require('shortid')

// action
var MonitorActions = require('../actions/MonitorActions.jsx')

var MonitorStore = alt.createStore(class MonitorStore {
  	
  	constructor() {

  		//action
  		this.bindActions(MonitorActions)

  		this.customers = []
        this.sites = []
	}

	setCustomerList(data){

		this.customers = data

        var sites = []

        data.forEach( function( customer ){
            
            customer.sites.forEach( function(site){
                site['customername'] = customer.name
                site['key'] = shortId.generate()
                sites.push( site )
            })
        })

        this.sites = sites
	}

    static getSites( id ){

        var sites = []

        var {customers} = this.getState()

        customers.forEach(function( customer ){

            if(id === customer.id){
                sites = customer.sites
            }
        })

        return sites
    }
})

module.exports = MonitorStore
