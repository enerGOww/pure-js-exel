import {BaseComponent} from '@core/BaseComponent'
import {generateTable} from '@/components/table/tableTemplate'

export class Table extends BaseComponent {
  static className = 'table'

  toHTML() {
    return generateTable(20)
  }
}
