export class TableSelection {
  constructor() {
    this.group = []
    this.current = null
  }

  select(element) {
    this.clear()
    this.group.push(element)
    this.current = element
    element.focus().addClass('table__cell--selected')
  }

  clear() {
    this.group.forEach(selectedElement => selectedElement.removeClass('table__cell--selected'))
    this.group = []
  }

  selectGroup(element, $root) {
    if (!this.current) {
      this.group.push(element)
      element.addClass('table__cell--selected')
      return
    }
    this.clear()

    const cells = this._matrix(element, $root)
    this.group = cells
    for (const cell of cells) {
      cell.addClass('table__cell--selected')
    }
  }

  nextSelection(key) {
    const id = this._parseCellId(this.current)

    switch (key) {
      case 'Enter':
      case 'ArrowDown':
        id.row++
        break
      case 'Tab':
      case 'ArrowRight':
        id.column = String.fromCharCode(id.column.charCodeAt(0) + 1)
        break
      case 'ArrowLeft':
        id.column = id.column === 'A' ? 'A' : String.fromCharCode(id.column.charCodeAt(0) - 1)
        break
      case 'ArrowUp':
        id.row = id.row === 1 ? 1 : id.row - 1
        break
    }

    return `${id.row}:${id.column}`
  }

  applyStyle(style) {
    this.group.forEach(el => el.css(style))
  }

  _matrix(element, $root) {
    const current = this._parseCellId(this.current)
    const target = this._parseCellId(element)

    const rows = this._getRowRange(current.row, target.row)
    const columns = this._getColumnRange(current.column, target.column)

    const ids = columns.reduce((accumulator, column) => {
      rows.forEach(row => accumulator.push(`${row}:${column}`))
      return accumulator
    }, [])

    return ids.map(id => $root.find(`[data-id="${id}"]`))
  }

  _parseCellId(cell) {
    const id = cell.dataset.id.split(':')
    return {
      row: +id[0],
      column: id[1],
    }
  }

  _getRowRange(start, end) {
    if (start > end) {
      [end, start] = [start, end]
    }
    return Array.from({length: end - start + 1}, (value, key) => key + start)
  }

  _getColumnRange(start, end) {
    if (start.charCodeAt(0) > end.charCodeAt(0)) {
      [end, start] = [start, end]
    }

    return Array.from(
        {length: end.charCodeAt(0) - start.charCodeAt(0) + 1},
        (value, key) => String.fromCharCode(key + start.charCodeAt(0))
    )
  }
}
