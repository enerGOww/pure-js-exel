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

  rewriteText(text) {
    this.$el.textContent = text
    return this
  }

  getText() {
    return this.$el.textContent !== null ? this.$el.textContent : ''
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

  addClass(...classNames) {
    for (const className of classNames) {
      this.$el.classList.add(className)
    }
  }

  toggleClass(...classNames) {
    for (const className of classNames) {
      if (this.$el.classList.value.includes(className)) {
        this.$el.classList.remove(className)
      } else {
        this.$el.classList.add(className)
      }
    }
  }

  removeClass(...classNames) {
    for (const className of classNames) {
      this.$el.classList.remove(className)
    }
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }

  find(select) {
    return dom(this.$el.querySelector(select))
  }

  focus() {
    this.$el.focus()
    return this
  }

  setAttribute(name, value) {
    this.$el.setAttribute(name, value)
    return this
  }

  getAttribute(name) {
    return this.$el.getAttribute(name)
  }

  css(styles = {}) {
    Object.keys(styles).forEach(key => {
      this.$el.style[key] = styles[key]
    })
  }

  getStyles(styles = []) {
    // console.log(this.$el.getComputedStyle())
    return styles.reduce((res, s) => {
      res[s] = this.$el.style[s]
      return res
    }, {})
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
