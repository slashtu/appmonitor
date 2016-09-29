import alt from '../alt'
import shortId from 'shortid'

import MitigationActions from 'action/MitigationActions.js';

// ------------------------- dummy data for testing-----------------------------
let dummyData = 
    [
      { label: 'Suspected Threat', count: 241},
      { label: 'Rate Limit Exceeded Request', count: 21},
      { label: 'Bad Ip', count: 10},
      { label: 'Bad Geolocation', count: 422},
      { label: 'Bad Sacnner', count: 3},
      { label: 'Bad Bot', count: 31},
      { label: 'Malformed request', count: 44},
      { label: 'Challenged Request', count: 13},
      { label: 'Spoofed Search Engine', count: 77},
    ]

//---------------------------------------------------------------------

let MitigationStore = alt.createStore(class MitigationStore {
    
  constructor() {

    this.bindActions(MitigationActions)

    // initial 
    this.mitigationData = 
    [
      { label: 'Suspected Threat', count: 0},
      { label: 'Rate Limit Exceeded Request', count: 0},
      { label: 'Bad Ip', count: 0},
      { label: 'Bad Geolocation', count: 0},
      { label: 'Bad Sacnner', count: 0},
      { label: 'Bad Bot', count: 0},
      { label: 'Malformed request', count: 0},
      { label: 'Challenged Request', count: 0},
      { label: 'Spoofed Search Engine', count: 0},
    ]
  }

  setMitigationData( object ){

    // dummy data
    if(__test) return this.mitigationData = dummyData


    this.mitigationData.forEach(( threat ) => {

      switch(threat.label){

        case 'Suspected Threat':
          let authquote = object.data['authquote']? object.data['authquote'][0][1] : 0
          let authlevel = object.data['authlevel']? object.data['authlevel'][0][1] : 0

          threat.count = authquote + authlevel
        break

        case 'Rate Limit Exceeded Request':
          threat.count = object.data['authquote']? object.data['authquote'][0][1] : 0
          break

        case 'Bad Ip':
          threat.count = object.data['badip']? object.data['badip'][0][1] : 0
          break

        case 'Bad Geolocation':
          threat.count = object.data['badgeo']? object.data['badgeo'][0][1] : 0
          break

        case 'Bad Sacnner':
          threat.count = object.data['badscan']? object.data['badscan'][0][1] : 0
          break

        case 'Bad Bot':
          threat.count = object.data['badbot']? object.data['badbot'][0][1] : 0
          break

        case 'Malformed request':
          let badhead = object.data['badhead']? object.data['badhead'][0][1] : 0
          let emptyhead = object.data['emptyhead']? object.data['emptyhead'][0][1] : 0
          let duphead = object.data['duphead']? object.data['duphead'][0][1] : 0

          threat.count = badhead + emptyhead + duphead
          break

        case 'Challenged Request':
          threat.count = object.data['authlevel']? object.data['authlevel'][0][1] : 0
          break

        case 'Spoofed Search Engine':
          let spiderquote = object.data['spiderquote']? object.data['spiderquote'][0][1] : 0
          let rdnsquote = object.data['rdnsquote']? object.data['rdnsquote'][0][1] : 0

          threat.count = spiderquote + rdnsquote
          break
      }
    })
  }
})

export default MitigationStore
