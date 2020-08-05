import {createToolbar} from '@/components/toolbar/toolbar.template'
import {dom} from '@core/dom'
import {StateComponent} from '@core/StateComponent'
import {defaultStyles} from '@/components/defaultStyles'

export class Toolbar extends StateComponent {
  static className = 'toolbar'

  constructor($root, options) {
    super($root, {
      name: 'header',
      ...options,
      listeners: ['click'],
    });
  }

  prepare() {
    this.initState(defaultStyles)
  }

  init() {
    super.init()

    this.on('table:switch-selected', (_, state) => {
      this.setState(state)
    })
  }

  get template() {
    return createToolbar(this.state)
  }

  toHTML() {
    return this.template
  }

  onClick(event) {
    const target = dom(event.target)
    if (target.dataset.type === 'button') {
      const value = JSON.parse(target.dataset.value)
      this.emit('toolbar:applyStyle', value)

      this.setState(value)
    }
  }
}
