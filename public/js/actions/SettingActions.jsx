var alt = require('../alt')

class SettingActions {
  constructor() {
    this.generateActions(
    	'setSite'
    )
  }
}

module.exports = alt.createActions(SettingActions)
