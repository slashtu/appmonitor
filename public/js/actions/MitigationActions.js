import alt from '../alt'

import Lib from'../lib/Lib.js'

class MitigationActions {

  constructor() {
    this.generateActions(
      'setMitigationData'
    )
  }

  getMitigationData(){
    const field = "badip,badgeo,authquote,badscan,badbot,badhead,duphead,emptyhead,authlevel,spiderquote,rdnsquote"
    const api = Lib.getAPI( { interval: "day", field: field, length: "1" } )

    let self = this

    setTimeout(function(){
      self.actions.setMitigationData({})
    },0)

    // $.get( api, (data) => {
    //     self.actions.setMitigationData( { data: data })
    // })
    // .fail( (err) => {console.log('getMitigationData error')})
  }
}

module.exports = alt.createActions(MitigationActions)
