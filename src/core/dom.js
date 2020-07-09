class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector
  }

  setHtml(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
  }

  getHtml() {
    return this.$el.outerHTML.trim()
  }

  clear() {
    this.setHtml('')
    return this
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }

  append(node) {
    if (node instanceof Dom) {
      this.$el.append(node.$el)
      console.log(node.$el)
    } else {
      this.$el.append(node)
    }

    return this
  }
}

export function dom(selector) {
  return new Dom(selector)
}

dom.create = (tagName, classes = '') => {
  const $el = document.createElement(tagName)
  if (classes) {
    $el.classList.add(classes)
  }

  return dom($el)
}
