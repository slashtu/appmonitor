var alt = require('../alt')
var shortId = require('shortid')

var Lib = require('../lib/Lib.js')

// action
var WAActions = require('../actions/WAActions.jsx')

var WAStore = alt.createStore(class WAStore {
  	
  	constructor() {

  		this.rank = []

  		this.visitors = { rate: {}, data: [1] }

  		this.device = { data:[ { name:'Device', y: 1 , rate: 0} ] }

  		this.browser  = { data:[ { name:'Browser', y: 1 , rate: 0} ] }

  		this.searchengine  = { data:[ { name:'Engine', y: 1 , rate: 0} ] }

  		this.traffic  = { data:[ { name:'Traffic Source', y: 1 , rate: 0} ] }

	    this.bindActions(WAActions)
	}

	setWAData(data){

		if( !Lib.getSiteSetting().bp ) return
		
		/* sort top 3 */
		var plturlArr = Lib.objectToArray( data.plturlc[0][1], function( key, value ){

			if( key == '' )
				return null

			return [ key, value ]
		})

		plturlArr.sort( function( a, b ){
			return  b[1] - a[1]
		})

		this.rank = plturlArr

		/* vistors */
		var allvisitors = data['visitors'][0][1];
		
		var newvisitors = data['newvisitors'][0][1];
		var returnvisitors = allvisitors - newvisitors;

		var newvisitors_rate = Math.ceil(newvisitors / allvisitors * 100 );

		if( data['visitors'][0][1] != 0 || data['newvisitors'][0][1] != 0 ){
			this.visitors.data = [ 
				{ name: 'New', y: newvisitors, rate: newvisitors_rate },
				{ name: 'Return', y: returnvisitors, rate: 100 - newvisitors_rate }
			];
		}else{
			this.visitors = { rate: {}, data: [1] }
		}
		
		/* device */
		var total = 0 

		var deviceData = Lib.objectToArray( data.platform[0][1], function( key, value ){

			total += value

			return { name: key, y: value }

		}).sort( function( a, b ){
			return  b.y - a.y
		})

		deviceData.forEach( function(device){
			device.rate = Math.round( device.y / total * 100 )
			device.id = shortId.generate()
		})

		if( !Lib.isEmpty(data.platform[0][1]) ){
			this.device.data = deviceData
		}else{
			this.device = { data:[ { name:'Device', y: 1 , rate: 0} ] }
		}
		
		/* browser */
		total = 0

		var browserData = Lib.objectToArray( data.browser[0][1], function( key, value ){

			total += value

			return { name:key, y: value }

		}).sort( function( a, b ){
			return  b.y - a.y
		})

		browserData.forEach( function(browser){

			browser.rate = Math.round( browser.y / total * 100 )

			browser.id = shortId.generate()

			if(browser.name === 'Internet Explorer')
				browser.name = 'IE'
		})


		if( !Lib.isEmpty( data.browser[0][1]) ){
			this.browser.data = browserData
		}else{
			this.browser  = { data:[ { name:'Browser', y: 1 , rate: 0} ] }
		}

		/* search engine */
		total = 0

		var searchengine = Lib.objectToArray( data.searchengine[0][1], function( key, value ){

			total += value

			return { name:key, y: value }

		}).sort( function( a, b ){
			return  b.y - a.y
		})

		searchengine.forEach( function(engine){

			engine.rate = Math.round( engine.y / total * 100 )

			engine.id = shortId.generate()
		})

		if( !Lib.isEmpty( data.searchengine[0][1])){
			this.searchengine.data = searchengine
		}else{
			this.searchengine  = { data:[ { name:'Engine', y: 1 , rate: 0} ] }
		}

		/* traffic source */
		var searchengine_toal = total
		var direct = 0
		var referral = 0

		var domain = Lib.getDomain()

		// caculate direct count 
		for(var source in data.referrer[0][1]){
			
			var cnt = data.referrer[0][1][source]

			if( source === domain || source === domain.substring(5) )
				direct += cnt
			else
				referral += cnt
		}

		total = referral + searchengine_toal + direct

		var direct_rate = Math.round( direct / total * 100 )
		var referral_rate = Math.round( referral / total * 100 )
		var searchengine_rate = Math.round( direct / total * 100 )

		var trafficSource = [ 
			{ 
				name: 'Direct', 
				y: direct, 
				rate: direct_rate,
				id: shortId.generate()
			},

			{ 
				name: 'Referral', 
				y: referral, 
				rate: referral_rate,
				id: shortId.generate()
			},

			{ 
				name: 'Search', 
				y: searchengine_toal, 
				rate: 100 - direct_rate - referral_rate,
				// rate: (Math.round( searchengine_toal / total * 100 ) === 0)? 1 : Math.round( searchengine_toal / total * 100 ),
				id: shortId.generate()
			},
		].sort( function( a, b ){
			return  b.y - a.y
		})


		if( !Lib.isEmpty( data.referrer[0][1])){
			this.traffic.data = trafficSource
		}else{
			this.traffic  = { data:[ { name:'Traffic Source', y: 1 , rate: 0} ] }
		}
	}
})

module.exports = WAStore
