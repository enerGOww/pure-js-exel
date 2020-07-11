class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector
  }

  get dataset() {
    return this.$el.dataset
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

  closest(selector) {
    return dom(this.$el.closest(selector))
  }

  getCoords() {
    return this.$el.getBoundingClientRect()
  }

  addClass(className) {
    this.$el.classList.add(className)
  }

  removeClass(className) {
    this.$el.classList.remove(className)
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }

  css(styles = {}) {
    Object.keys(styles).forEach(key => {
      this.$el.style[key] = styles[key]
    })
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
