import {BaseComponent} from '@core/BaseComponent'
import {generateTable} from '@/components/table/tableTemplate'
import {dom} from '@core/dom'
import {TableSelection} from '@/components/table/TableSelection'

export class Table extends BaseComponent {
  static className = 'table'

  constructor($root, options) {
    super($root, {
      name: 'table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    })
  }

  toHTML() {
    return generateTable(100)
  }

  init() {
    super.init()

    this.selection = new TableSelection()
    this.selectCell(this.$root.find('[data-id="1:A"]'))

    this.on('formula:input', text => this.selection.current.rewriteText(text))
        .on('formula:enter', () => this.selection.current.focus())
  }

  selectCell(cell) {
    this.selection.select(cell)
    this.emit('table:switch-selected', cell.getText())
  }

  onMousedown(event) {
    const element = dom(event.target)

    if (element.dataset.resize) {
      const isColumn = element.dataset.resize === 'column'
      const parent = dom(event.target).closest('[data-type="resizable"]')
      const coords = parent.getCoords()

      parent.addClass('blue-line')

      let size
      document.onmousemove = e => {
        if (isColumn) {
          const delta = e.pageX - coords.right
          size = coords.width + delta + 'px'

          parent.css({width: size})
        } else {
          const delta = e.pageY - coords.bottom
          parent.css({height: coords.height + delta + 'px'})
        }
      }

      document.onmouseup = () => {
        if (isColumn) {
          this.$root
              .findAll(`[data-column-name="${parent.dataset.columnName}"]`)
              .forEach(value => value.style.width = size)
        }
        parent.removeClass('blue-line')
        document.onmousemove = null
        document.onmouseup = null
      }
    } else if (element.dataset.id && event.shiftKey) {
      this.selection.selectGroup(element, this.$root)
    } else if (element.dataset.id) {
      this.selectCell(element)
    }
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'ArrowRight']
    const {key} = event
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const nextCellId = this.selection.nextSelection(key)
      const element = this.$root.find(`[data-id="${nextCellId}"]`)
      this.selectCell(element)
    }
  }

  onInput(event) {
    const element = dom(event.target)
    this.emit('table:input', element.getText())
  }
}
