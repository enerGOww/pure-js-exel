import {BaseComponent} from '@core/BaseComponent'

export class StateComponent extends BaseComponent {
  constructor(...args) {
    super(...args)
  }

  initState(initialState = {}) {
    this.state = {...initialState}
  }
  get template() {
    return JSON.stringify(this.state, null, 2)
  }

  setState(newState) {
    this.state = {...this.state, ...newState}
    this.$root.setHtml(this.template)
  }
}
