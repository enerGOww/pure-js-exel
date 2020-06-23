import {BaseComponent} from '@core/BaseComponent'

export class Formula extends BaseComponent {
  static className = 'formula'

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
}
