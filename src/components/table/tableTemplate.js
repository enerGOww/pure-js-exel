const CODES = {
  A: 65,
  Z: 90,
}

function createCell(columnName, rowName) {
  return `
    <div class="table__cell" contenteditable="true" data-column-name="${columnName}" data-row-name="${rowName}"></div>
  `
}

function createColumn(content) {
  return `
    <div class="table__column" data-type="resizable" data-column-name="${content}">
      ${content}
      <div class="table__column-resize" data-resize="column"></div>
    </div>
  `
}

function createRow(content, rowNumber = null) {
  const resizer = rowNumber ? `<div class="table__row-resize" data-resize="row"></div>` : ''
  return `
    <div class="table__row" data-type="resizable" data-row-name="${rowNumber}">
      <div class="table__row--info">
      ${rowNumber ? rowNumber : ''}
      ${resizer}
    </div>
      <div class="table__row--data">${content}</div>
    </div>
  `
}

export function generateTable(rowsCount = 15) {
  const rows = []
  const columnsCount = CODES.Z - CODES.A + 1

  const columns = new Array(columnsCount)
      .fill('')
      .map(((value, index) => String.fromCharCode(CODES.A + index)))
      .map(createColumn)
      .join('')

  rows.push(createRow(columns))

  for (let i = 1; i <= rowsCount; i++) {
    const cells = Array.from(
        {length: columnsCount},
        (value, index) => String.fromCharCode(CODES.A + index)
    )
        .map(((value) => createCell(value, i)))
        .join('')
    rows.push(createRow(cells, i))
  }

  return rows.join('')
}
