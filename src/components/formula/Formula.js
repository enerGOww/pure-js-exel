import {BaseComponent} from '@core/BaseComponent'

export class Formula extends BaseComponent {
  static className = 'formula'

  constructor($root, options) {
    super($root, {
      name: Formula.className,
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
      ...options,
    })
  }

  toHTML() {
    return `
      <div class="formula__info">fx</div>
      <div 
        class="formula__input" 
        contenteditable="true" 
        spellcheck="false"
        data-input="formula"
      ></div>
    `
  }

  init() {
    super.init()
    this._input = this.$root.find(`[data-input="formula"]`)
    this.on('table:switch-selected', cell => this._input.rewriteText(cell.dataset.value))
  }

  storeChanged({currentText}) {
    this._input.rewriteText(currentText)
  }

  onInput(event) {
    const text = event.target.textContent.trim()
    this.emit('formula:input', text)
  }

  onKeydown(event) {
    if (event.key === 'Enter' || event.key === 'Tab') {
      event.preventDefault()
      this.emit('formula:enter')
    }
  }
}
