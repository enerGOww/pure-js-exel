export class Emitter {
  constructor() {
    this.listeners = {}
  }

  emit(eventName, ...args) {
    if (!Array.isArray(this.listeners[eventName])) {
      return
    }
    this.listeners[eventName].forEach(listener => listener(...args))
  }

  subscribe(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || []
    this.listeners[eventName].push(fn)
    return () => this.unsubscribe(eventName, fn)
  }

  unsubscribe(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName].filter(listener => listener !== fn)
  }
}
