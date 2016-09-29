var alt = require('../alt')

class WAFLogActions {

    constructor() {
        this.generateActions(
          'setCddWAFLog',
          'resetData'
        )
    }
}

module.exports = alt.createActions(WAFLogActions)
