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
