const CODES = {
  A: 65,
  Z: 90,
}

function createCell() {
  return `
    <div class="table__cell" contenteditable="true"></div>
  `
}

function createColumn(content) {
  return `
    <div class="table__column">${content}</div>
  `
}

function createRow(content, rowNumber = null) {
  return `
    <div class="table__row">
      <div class="table__row--info">${rowNumber ? rowNumber : ''}</div>
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
    const cells = new Array(columnsCount)
        .fill('')
        .map(createCell)
        .join('')

    rows.push(createRow(cells, i))
  }

  return rows.join('')
}
