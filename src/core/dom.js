class Dom {
  constructor(selector) {
    this.$el =
      typeof selector === 'string'
        ? document.querySelector(selector)
        : selector
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.innerHTML.trim()
  }

  clear() {
    this.html('')
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
      this.node = node.$el
    }
    if (Element.prototype.append) {
      this.$el.append(this.node)
    } else {
      this.$el.appendChild(this.node)
    }
    return this
  }

  closest(selector) {
    // eslint-disable-next-line no-use-before-define
    return $(this.$el.closest(selector))
  }

  get data() {
    return this.$el.dataset
  }

  find(selector) {
    // eslint-disable-next-line no-use-before-define
    return $(this.$el.querySelector(selector))
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }

  getCoords() {
    return this.$el.getBoundingClientRect()
  }

  css(styles = {}) {
    Object.keys(styles).forEach(key => {
      this.$el.style[key] = styles[key]
    })
  }

  addClass(className) {
    this.$el.classList.add(className)
  }

  removeClass(className) {
    this.$el.classList.remove(className)
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, className = '') => {
  const el = document.createElement(tagName)
  if (className) {
    el.classList.add(className)
  }
  return $(el)
}
