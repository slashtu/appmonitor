var alt = require('../alt')
var shortId = require('shortid')
var merge = require('object-assign')

// action
var TrackerActions = require('../actions/TrackerActions.jsx')

var TrackerStore = alt.createStore(class TrackerStore {
  	
  	constructor() {
	    this.bindActions(TrackerActions)

	    this.rawData = [];

	    this.onlineUser = {}

	    // all city
		this.clusters = 
		[ 
			{ country: 'Houng_kong', city:'',        latitude: 23,  longitude: 114,    count: 0 },
			{ country: 'Japan',      city:'Tokyo',   latitude: 36,  longitude: 140,    count: 0 },
			{ country: 'China',      city:'Beijing', latitude: 40,  longitude: 116,    count: 0 },
			{ country: 'China',      city:'Urumqi',  latitude: 44,  longitude: 88,     count: 0 },
			{ country: 'EastAmerica',    city:'',  		 latitude: 37,  longitude: -85,    count: 0 },
			{ country: 'WestAmerica',    city:'',  		 latitude: 37,  longitude: -130,    count: 0 },
			{ country: 'Canada',     city:'',  		 latitude: 56,  longitude: -106,   count: 0 },
			{ country: 'Europe',     city:'',  		 latitude: 54,  longitude: 15,     count: 0 },
			{ country: 'Afica',      city:'',  		 latitude: 21,  longitude: -6,     count: 0 },
			{ country: 'MiddleEast',  city:'',  		 latitude: 31, longitude: 44,    count: 0 },
			{ country: 'SouthAmerica',  city:'',  		 latitude: 10, longitude: -70,    count: 0 },
			{ country: 'Indonesia',  city:'',  		 latitude: 0, longitude: 114,    count: 0 },
			{ country: 'Australia',  city:'',  		 latitude: -17, longitude: 140,    count: 0 },
		]

		// caculate clusters top and left
		this.clusters.forEach(function( cluster ){
			cluster['top']  = 380.6 - ( cluster['latitude'] * 3.57 )
			cluster['left'] = 482 + ( cluster['longitude'] * 2.67 )
			cluster.id = shortId.generate()
		})
	}

	resetData(){
		this.clusters.forEach(function( cluster ){
			cluster['count'] = 0
		})

		this.rawData = []
	}

	setData(location){

		// console.log(location)

		// set online user
		var SettingStore = require('../stores/SettingStore.jsx')
		var siteId = SettingStore.getState().site.siteid || ""

		this.onlineUser[location.site_id] = location.onlineusercount

		// not choose a site yet
		if( siteId !== "" && siteId === location['site_id']){

			var pre = { dist: 999999, index:0 },
				cities = this.clusters

			// caculate position and sum, then store to another array
			for( let i = 0; i < cities.length; i++ ){

				// caculate dist
				let dist = Math.pow(location.latitude - cities[i].latitude, 2) + Math.pow(location.longitude - cities[i].longitude, 2) 
				
				if( dist < pre.dist){
					pre.dist = dist
					pre.index = i
				}
			}

			this.clusters[ pre.index ]['count'] ++

			// console.log(this.clusters)

			// keep 50 records
			location['id'] = shortId.generate()
			this.rawData.push(location)

			if( this.rawData.length > 50 ) this.rawData.shift()
		}

		// console.log( this.rawData.length, this.rawData)
		// console.log(this.clusters)
	}
})

module.exports = TrackerStore
