var alt = require('../alt')
var merge = require('object-assign')

// action
var CustomerActions = require('../actions/CustomerActions.jsx')

/*  data structure

{
	cid: "C-1ad0f960-5c11-4f80-9131-b318dab9e9c3",
    name: "HTB", 
    username: "slash.tu@nexusguard.com",
    
    sites:{
       'S-81375fec-fe24-4518-8ae6-6b1530be8671':{
        	name: 'www.high.com',
        	siteId: 'S-81375fec-fe24-4518-8ae6-6b1530be8671'
        }
    }
}
*/

// get sites list by servicetype
function generateSites( sites ){

  // becuase there are two type service. if servicetype is 'tcp', then clone a site that servicetype is 'web'.
  let new_sites = []

  sites.forEach(function(site, index){

    // clone servicetype 'web'
    if( site.servicetype.indexOf('web') >= 0 ){

      let clone_web = Object.assign({}, site)

      clone_web.servicetype = 'web'

      new_sites.push( clone_web )
    }

    // clone service 'tcp'
    if( site.servicetype.indexOf('tcp') >= 0 ){
      let clone_tcp = Object.assign({}, site)

      clone_tcp.servicetype = 'tcp'

      new_sites.push( clone_tcp )
    }
  })

  return new_sites
}

var CustomerStore = alt.createStore(class CustomerStore {
  	
  constructor() {

  		//action
  		this.bindActions(CustomerActions)

  		this.user = {}
  		this.customer = {}
  		this.sites = []
      this.monitorMode = false
	}

  setMonitorCustomer(data){
    this.monitorMode = true
    this.user['cid'] = data.cid

    this.sites = generateSites(data.sites);
  }

	setCustomer(data){

		if( data.user.cid != '' ){
		
			this.user['cid'] = data.user.cid;
			this.user['name'] = data.customer.name;
      this.user['username'] = data.user.email;
			this.user['roles'] = data.user.roles;
      
			this.customer = data.customer;

      this.sites = generateSites( data.customer.sites );
		}
	}
})

module.exports = CustomerStore
