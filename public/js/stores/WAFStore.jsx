import alt from '../alt'

import merge from 'object-assign'
import shortId from 'shortid'

// action
import WAFActions from '../actions/WAFActions.jsx'

// ------------------------- dummy data for testing-----------------------------
let dummyData = 
    [
      { label: 'SQL Injection', count: 12},
      { label: 'Cross Site Scripting', count: 3},
      { label: 'Illegal Resource Access', count: 5},
    ]

//---------------------------------------------------------------------

function getMap( data ){
	// map data
	var map = {}

	// cointry rename -> [[ 'CN', 'CHN' ], [ 'old name', 'new name' ], ...]
	map.renameProperty = function( rename ){

		var self = this

		rename.forEach( function( arr ){
			if( arr[0] in self ){
				self[arr[1]] = self[arr[0]]
				delete self[arr[0]] 
			}
		})

		return self
	}

	var arr = data

	// aggretate the treats of country
	for( let i = 0; i < arr.length; i++ ){

		let threat = arr[i]

		threat.ip = [ threat.ip ]

		if( threat['country'] in map ) continue

		for( let y = i + 1; y < arr.length; y++){

			let nextTreat = arr[y]

			if( threat['country'] === nextTreat['country'] ){
				threat['count'] += nextTreat['count'] 
				threat['ip'].push( nextTreat['ip']) 
			}
		}

		threat['key'] = shortId.generate()

		map[threat['country']] = threat
	}

	//merge 'CN' and 'HK' into 'CN'

	if( map['HK'] ){
		if( map['CN'] )
			map['CN'].count += map['HK'].count
		else
			map['CN'] = map['HK']
	}

	map = map.renameProperty(
		[
			['CN', 'CHN'],
			['US', 'USA'],
			['GB', 'GBR'],
			['CA', 'CAN'],
			['AX', 'ALA'],
			['AF', 'AFG'],
			['AL', 'ALB'],
			['DZ', 'DZA'],
			['AS', 'ASM'],
			['AD', 'AND'],
			['AO', 'AGO'],
			['AI', 'AIA'],
			['AQ', 'ATA'],
			['AG', 'ATG'],
			['AR', 'ARG'],
			['AU', 'AUS'],
			['BR', 'BRA'],
			['RU', 'RUS'],
			['JP', 'JPN'],
			['FR', 'FRA'],
			['TW', 'TWN'],
			['DE', 'DEU'],
			['MY', 'MYS'],
			['NZ', 'NZL'],
			['SG', 'SGP'],
			['IE', 'IRL'],
			['Unknow', 'Unknow'],
		]
	)

	return map
}

var WAFStore = alt.createStore(class WAFStore {
  	
  	constructor() {
	    this.bindActions(WAFActions)
	    
	    // initial
	    this.cddWAFTop10IP = {}
	    this.wafData =  
	    [
	      { label: 'SQL Injection', count: 0},
	      { label: 'Cross Site Scripting', count: 0},
	      { label: 'Illegal Resource Access', count: 0},
	    ]

	}

	setCddWAFTop10IP( data ){
		var self = this
		
		// clone object
		// this.cddWAFTop10IP['data'] = JSON.parse(JSON.stringify(data))

		for( var site in data ){

			this.cddWAFTop10IP[site] = { data: [] }
			// this.cddWAFTop10IP[site]['remote_addr'] = JSON.parse(JSON.stringify(data[site]['remote_addr']))		
		
			data[site]['remote_addr'].forEach( function( obj ){

				for( var key in obj ){
					
					var country = key.split('|')[1]
					var count = obj[key]
					var ip = { data: {addr: key.split('|')[0], count: count }, key: shortId.generate()}

					self.cddWAFTop10IP[site]['data'].push({ ip: ip, country: country === '' ? 'Unknow' : country, count: count})
				}
			})

			this.cddWAFTop10IP[site]['map'] = getMap( JSON.parse( JSON.stringify(this.cddWAFTop10IP[site]['data'])))
		}
	}

	setWAFData(data){
		// dummy data
    if(true) return this.wafData = dummyData
	}
})

module.exports = WAFStore
