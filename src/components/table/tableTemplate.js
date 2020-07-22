const CODES = {
  A: 65,
  Z: 90,
}

const DEFAULT_WIDTH = '120px'

const DEFAULT_HEIGHT = '20px'

function createCell(columnName, rowName, state) {
  return `
    <div
      class="table__cell"
      contenteditable="true"
      data-column-name="${columnName}"
      data-id="${rowName}:${columnName}"
      style="width: ${getWidth(state, columnName)}"
    ></div>
  `
}

function createColumn(content, width) {
  return `
    <div class="table__column" data-type="resizable" data-column-name="${content}" style="width: ${width}">
      ${content}
      <div class="table__column-resize" data-resize="column"></div>
    </div>
  `
}

function createRow(content, height, rowNumber = null) {
  const resizer = rowNumber ? `<div class="table__row-resize" data-resize="row"></div>` : ''
  return `
    <div class="table__row" data-type="resizable" data-row-name="${rowNumber}" style="height: ${height}">
      <div class="table__row--info">
        ${rowNumber ? rowNumber : ''}
        ${resizer}
      </div>
      <div class="table__row--data">${content}</div>
    </div>
  `
}

function getWidth(state, value) {
  return state[value] || DEFAULT_WIDTH
}

function getHeight(state, value) {
  return state[value] || DEFAULT_HEIGHT
}

export function generateTable(rowsCount = 100, state = {}) {
  const rows = []
  const columnsCount = CODES.Z - CODES.A + 1

  const columns = new Array(columnsCount)
      .fill('')
      .map(((value, index) => String.fromCharCode(CODES.A + index)))
      .map(value => createColumn(value, getWidth(state.tableState, value)))
      .join('')

  rows.push(createRow(columns, DEFAULT_HEIGHT))

  for (let i = 1; i <= rowsCount; i++) {
    const cells = Array.from(
        {length: columnsCount},
        (value, index) => String.fromCharCode(CODES.A + index)
    )
        .map(((value) => createCell(value, i, state.tableState)))
        .join('')
    rows.push(createRow(cells, getHeight(state.tableState, i), i))
  }

  return rows.join('')
}
