import {BaseComponent} from '@core/BaseComponent'
import {changeHeader} from '@/state/actions'

export class Header extends BaseComponent {
  static className = 'header'

  constructor($root, options) {
    super($root, {
      name: 'header',
      listeners: ['input'],
      ...options,
    });
  }

  init() {
    super.init()

    const headerText = this.store.getState().headerState
    const input = this.$root.find('[data-input="header"]')
    input.$el.value = headerText
  }

  toHTML() {
    return `
    <input type="text" class="header__input" data-input="header" />
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

  onInput(event) {
    const text = event.target.value
    this.dispatch(changeHeader({
      text,
    }))
  }
}
