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
    return generateTable(1000)
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      const element = event.target.dataset.resize
      const parent = dom(event.target).closest('[data-type="resizable"]')
      const coords = parent.getCoords()

      parent.addClass('blue-line')

      let size
      document.onmousemove = e => {
        if (element === 'column') {
          const delta = e.pageX - coords.right
          size = coords.width + delta + 'px'

          parent.css({width: size})
        } else {
          const delta = e.pageY - coords.bottom
          parent.css({height: coords.height + delta + 'px'})
        }
      }

      document.onmouseup = () => {
        if (element === 'column') {
          this.$root
              .findAll(`[data-column-name="${parent.dataset.columnName}"]`)
              .forEach(value => value.style.width = size)
        }
        parent.removeClass('blue-line')
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
}
