import { range } from '@core/utils'

export function shouldResize(e) {
  return e.target.dataset.resize
}

export function isCell(e) {
  return e.target.dataset.type === 'cell'
}

export function matrix($target, $current) {
  const target = $target.id(true)
  const current = $current.id(true)
  const cols = range(current.col, target.col)
  const rows = range(current.row, target.row)

  return cols.reduce((acc, col) => {
    rows.forEach(row => acc.push(`${row}:${col}`))
    return acc
  }, [])
}

export function nextSelector(key, { col, row }) {
  const MIN_VALUE = 0
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      // eslint-disable-next-line no-param-reassign
      row++
      break
    case 'Tab':
    case 'ArrowRight':
      // eslint-disable-next-line no-param-reassign
      col++
      break
    case 'ArrowLeft':
      // eslint-disable-next-line no-param-reassign
      col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1
      break
    case 'ArrowUp':
      // eslint-disable-next-line no-param-reassign
      row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1
      break
  }
  return `[data-id="${row}:${col}"]`
}
