import {BaseComponent} from '@core/BaseComponent'
import {generateTable} from '@/components/table/tableTemplate'
import {dom} from '@core/dom'

export class Table extends BaseComponent {
  static className = 'table'

  constructor($root) {
    super($root, {
      name: 'table',
      listeners: ['mousedown'],
    })
  }

  toHTML() {
    return generateTable(20)
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      const element = event.target.dataset.resize
      const parent = dom(event.target).closest('[data-type="resizable"]')
      const coords = parent.getCoords()

      parent.addClass('blue-line')
      const cells = this.$root.findAll(`[data-column-name="${parent.dataset.columnName}"]`)

      document.onmousemove = e => {
        if (element === 'column') {
          const delta = e.pageX - coords.right
          const size = coords.width + delta + 'px'

          parent.$el.style.width = size
          cells.forEach(value => value.style.width = size)
        } else {
          const delta = e.pageY - coords.bottom
          parent.$el.style.height = coords.height + delta + 'px'
        }
      }

      document.onmouseup = () => {
        parent.removeClass('blue-line')
        document.onmousemove = null
      }
    }
  }
}
