import {BaseComponent} from '@core/BaseComponent'

export class Header extends BaseComponent {
  static className = 'header'

  constructor($root, options) {
    super($root, {
      name: 'header',
      ...options,
    });
  }

  toHTML() {
    return `
    <input type="text" class="header__input" value="Новая таблица" />
      <div>
        <div class="header__button">
          <i class="material-icons">delete</i>
        </div>
        <div class="header__button">
          <i class="material-icons">exit_to_app</i>
        </div>
      </div>
    `
  }
}
