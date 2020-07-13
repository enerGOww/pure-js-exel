import {BaseComponent} from '@core/BaseComponent'

export class Toolbar extends BaseComponent {
  static className = 'toolbar'

  constructor($root, options) {
    super($root, {
      name: 'header',
      ...options,
    });
  }

  toHTML() {
    return `
      <div class="toolbar__button">
        <i class="material-icons">format_align_left</i>
      </div>
      <div class="toolbar__button">
        <i class="material-icons">format_align_center</i>
      </div>
      <div class="toolbar__button">
        <i class="material-icons">format_align_right</i>
      </div>
      <div class="toolbar__button">
        <i class="material-icons">format_bold</i>
      </div>
      <div class="toolbar__button">
        <i class="material-icons">format_italic</i>
      </div>
      <div class="toolbar__button">
        <i class="material-icons">format_underline</i>
      </div>
    `
  }
}
