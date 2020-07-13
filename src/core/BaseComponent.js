import {DomListener} from '@core/DomListener'

export class BaseComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this._emitter = options.emitter
    this._unsubscribes = []

    this.prepare()
  }

  prepare() {}

  // return component template
  toHTML() {
    return ''
  }

  emit(eventName, ...args) {
    this._emitter.emit(eventName, ...args)
    return this
  }

  on(eventName, fn) {
    const unsub = this._emitter.subscribe(eventName, fn)
    this._unsubscribes.push(unsub)
    return this
  }

  init() {
    this.initDomListeners()
  }

  destroy() {
    this.removeDomListeners()
    this._unsubscribes.forEach(unsub => unsub())
  }
}
