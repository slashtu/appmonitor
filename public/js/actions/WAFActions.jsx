import alt from '../alt'

import Lib from '../lib/Lib.js'

class WAFActions {

  constructor() {
    this.generateActions(
      'setCddWAFTop10IP',
      'setWAFData'
    )
  }

  getWAFData() {
    const field = "waf"
    const api = Lib.getAPI( { interval: "day", field: field, length: "1" } )

    let self = this

    $.get( api, (data) => {
        self.actions.setWAFData( { data: data })
    })
    .fail( (err) => {console.log('getWAFData error')})
  }
}

module.exports = alt.createActions(WAFActions)
