export function capitalize(str) {
  if (typeof str !== 'string') {
    return ''
  }
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function range(start, end) {
  if (start > end) {
    // eslint-disable-next-line no-param-reassign
    ;[end, start] = [start, end]
  }
  return new Array(end - start + 1)
    .fill('')
    .map((_, index) => start + index)
}

export function storage(key, data = null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key))
  }
  localStorage.setItem(key, JSON.stringify(data))
  return `Данные успешно записаны`
}

export function isEqual(a, b) {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b)
  }
  return a === b
}

export function camelToDash(str) {
  return str.replace(
    /([A-Z])/g,
    g => `-${g[0].toLowerCase()}`
  )
}

export function linearStyles(styles = {}) {
  return Object.keys(styles)
    .map(key => `${camelToDash(key)}: ${styles[key]}`)
    .join(';')
}

export function debounce(fn, wait) {
  let timeout
  // eslint-disable-next-line func-names
  return function (...args) {
    const later = () => {
      clearTimeout(timeout)
      fn.apply(this, args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export function clone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

export function localeDateTime(dataDate) {
  const date = new Date(dataDate)
  return `${date.toLocaleDateString()} -
    ${date.toLocaleTimeString('Russia', {
      hour: 'numeric',
      minute: 'numeric',
    })}`
}

export function preventDefault(e) {
  e.preventDefault()
}
