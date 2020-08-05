import {isEqual} from '@core/utils'

export class StoreSubscriber {
  constructor(store) {
    this._store = store
    this.sub = null
    this._prevState = []
  }

  subscribeComponents(components) {
    this._prevState = this._store.getState()
    this.sub = this._store.subscribe(state => {
      Object.keys(state).forEach(key => {
        if (!isEqual(this._prevState[key], state[key])) {
          components.forEach(component => {
            if (component.isWatching(key)) {
              const changes = {[key]: state[key]}
              component.storeChanged(changes)
            }
          })
        }
      })

      this._prevState = this._store.getState()
    })
  }

  unsubscribeFromStore() {
    this.sub.unsubscribe()
  }
}
