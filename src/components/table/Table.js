import {BaseComponent} from '@core/BaseComponent'

export class Table extends BaseComponent {
  static className = 'table'

  toHTML() {
    return `
      <div class="table__row">
        <div class="table__row--info"></div>
        <div class="table__row--data">
          <div class="table__column">A</div>
        </div>
      </div>
      <div class="table__row">
        <div class="table__row--info">1</div>
        <div class="table__row--data">
          <div class="table__cell" contenteditable="true"></div>
        </div>
      </div>
    `
  }
}
