import {BaseComponent} from '@core/BaseComponent'

export class Formula extends BaseComponent {
  static className = 'formula'

  constructor($root) {
    super($root, {
      name: Formula.className,
      listeners: ['input'],
    })
  }

  toHTML() {
    return `
      <div class="formula__info">fx</div>
      <div 
        class="formula__input" 
        contenteditable="true" 
        spellcheck="false">
      </div>
    `
  }

  onInput(event) {
    console.log('Formula:', event.target.textContent.trim())
  }
}
