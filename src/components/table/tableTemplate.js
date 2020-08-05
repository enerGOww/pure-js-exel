// import {camelToKebab} from '@core/utils'

import {camelToKebab} from '@core/utils'

const CODES = {
  A: 65,
  Z: 90,
}

const DEFAULT_WIDTH = '120px'
const DEFAULT_HEIGHT = '20px'
const DEFAULT_VALUE = ''

function createCell(columnName, rowName, state) {
  const id = `${rowName}:${columnName}`
  const cellValue = state.dataState[id] || DEFAULT_VALUE
  return `
    <div
      class="table__cell"
      contenteditable="true"
      data-column-name="${columnName}"
      data-id="${id}"
      style="width: ${getWidth(state, columnName)};${getStyles(state, id)}"
    >${cellValue}</div>
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
  return state.tableState[value] || DEFAULT_WIDTH
}

function getHeight(state, value) {
  return state.tableState[value] || DEFAULT_HEIGHT
}

function getStyles(state, id) {
  let styles = ''
  // eslint-disable-next-line guard-for-in
  for (const style in state.styleState[id]) {
    const styleName = camelToKebab(style)
    styles += ` ${styleName}:${state.styleState[id][style]};`
  }

  return styles
}

export function generateTable(rowsCount = 100, state = {}) {
  const rows = []
  const columnsCount = CODES.Z - CODES.A + 1

  const columns = new Array(columnsCount)
      .fill('')
      .map(((value, index) => String.fromCharCode(CODES.A + index)))
      .map(value => createColumn(value, getWidth(state, value)))
      .join('')

  rows.push(createRow(columns, DEFAULT_HEIGHT))

  for (let i = 1; i <= rowsCount; i++) {
    const cells = Array.from(
        {length: columnsCount},
        (value, index) => String.fromCharCode(CODES.A + index)
    )
        .map(value => createCell(value, i, state))
        .join('')
    rows.push(createRow(cells, getHeight(state, i), i))
  }

  return rows.join('')
}
