var alt = require('../alt')
var merge = require('object-assign')

import { concat } from 'lodash'

// action
var SiteActions = require('../actions/SiteActions.jsx')

const mitigation =   
 	[
    { label: 'Suspected Threat', count: 0},
    { label: 'Rate Limit Exceeded Request', count: 0},
    { label: 'Bad Ip', count: 0},
    { label: 'Bad Geolocation', count: 0},
    { label: 'Bad Sacnner', count: 0},
    { label: 'Bad Bot', count: 0},
    { label: 'Malformed Request', count: 0},
    { label: 'Challenged Request', count: 0},
    { label: 'Spoofed Search Engine', count: 0},
  ]

var SiteStore = alt.createStore(class SiteStore {
  	
	constructor() {

    this.bindActions(SiteActions)

    this.protectionData = {}
    this.cddWAFTop10IP = {}

    // mitigation log 
    this.mitigationData = {}
	}

	caculateMitigation( object ){

		let data = object.data;
		let st = [], rler = [], bi = [], bg = [], bs =[] , bb= [], mr =[], cr = [], sse = [] 
		let time = 0;

		data.authquote.forEach((item, i) => {
			time = item[0];

			// Suspected Threat
			st.push( concat(time, data.authquote[i][1] + data.authlevel[i][1]) );
			rler.push( concat(time, data.authquote[i][1]) );
			bi.push( concat(time, data.badip[i][1]) );
			bg.push( concat(time, data.badgeo[i][1] ) );
			bs.push( concat(time, data.badscan[i][1]) );
			bb.push( concat(time, data.badbot[i][1]) );
			mr.push( concat(time, data.badhead[i][1] + data.emptyhead[i][1] + data.duphead[i][1]) );
			cr.push( concat(time, data.authlevel[i][1]) );
			sse.push( concat(time, data.spiderquote[i][1] + data.rdnsquote[i][1]) );
		})

		this.mitigationData[object.type] = { 
			SuspectedThreat: st,
			RatelLimitExceededRequest: rler,
			BadIp: bi,
			BadGeolocation: bg,
			BadSacnner: bs,
      BadBot: bb,
      MalformedRequest: mr,
      ChallengedRequest: cr,
      SpoofedSearchEngine: sse,
		};
	}

	setProtectionData( object ){

		var data = object.data

		// caculate data for chart
		var intervalMins = object.intervalMins

		// remote current time data, because it is zero.
		if( object.type === "PROTECTION_TRENDS_2MINS" ){

			for( property in data ){
				data[property].pop().pop();
			}
		}

		for( var property in data ){
			switch(property) {
				case 'totalbytes':
					for( let i = 0; i < data['totalbytes'].length; i++){	
						data['totalbytes'][i][0] *= 1000; 
		        data['totalbytes'][i][1] = Math.ceil(data['totalbytes'][i][1] * 8 / 1000 / ( intervalMins * 60 )); // per second
					}
					break;

				case 'clearproxy':
					for( let i = 0; i < data['clearproxy'].length; i++){
						data['clearproxy'][i][0] *= 1000; 
		        data['clearproxy'][i][1] = Math.ceil(data['clearproxy'][i][1] * 8 / 1000 / ( intervalMins * 60 )); // per second
					}
					break;

				case 'request':
				case 'threat':
				case 'pageviews':
				case 'visitors':
				case 'legitimated':
				case 'cachehit':
				case 'upstream':
					for( let i = 0; i < data[property].length; i++){					
						data[property][i][0] *= 1000; 
		        data[property][i][1] = Math.ceil(data[property][i][1] / ( intervalMins )); // per min
					}
					break;

				default:
					for( let i = 0; i < data[property].length; i++){					
						data[property][i][0] *= 1000; 
					}
					break;
			}
		}
		this.protectionData[object.type] = data;
		this.caculateMitigation( object );
	}
})

module.exports = SiteStore
