const CODES = {
  A: 65,
  Z: 90,
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function getWidth(state, index) {
  return `${state[index] || DEFAULT_WIDTH}px`
}

function getHeight(state, index) {
  return `${state[index] || DEFAULT_HEIGHT}px`
}

function toCell(state, row) {
  // eslint-disable-next-line func-names
  return function (_, col) {
    const id = `${row}:${col}`
    const width = getWidth(state.colState, col)
    const data = state.dataState[id]
    return `
  <div class="cell"
  contenteditable
  data-col="${col}"
  data-type="cell"
  data-id="${id}"
  style="width: ${width}"
  >${data || ''}</div>
  `
  }
}

function toCol({ col, index, width }) {
  return `
  <div class="column"
  data-type="resizable"
  data-col="${index}"
  style="width: ${width}">
    ${col}
    <div class="col-resize" data-resize="col"></div>
  </div>
  `
}

function createRow(content, index, state) {
  const resize = index
    ? `<div class="row-resize" data-resize="row"></div>`
    : ''
  const height = getHeight(state, index)
  return `
  <div class="row" data-type="resizable" data-row="${index}" style="height: ${height}">
    <div class="row-info">${index || ''}
    ${resize}
    </div>
    <div class="row-data">${content}</div>
  </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

function widthFrom(state) {
  return (col, index) => {
    return {
      col,
      index,
      width: getWidth(state.colState, index),
    }
  }
}

export function createTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(widthFrom(state))
    .map(toCol)
    // .map((col, index) => {
    //   const width = getWidth(state.colState, index)
    //   return toCol(col, index, width)
    // })
    .join('')

  // const rows = new Array(rowsCount).fill('').map(createCell)

  rows.push(createRow(cols, null, {}))

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
      .fill('')
      .map(toCell(state, row))
      .join('')
    rows.push(createRow(cells, row + 1, state.rowState))
  }
  return rows.join('')
}
