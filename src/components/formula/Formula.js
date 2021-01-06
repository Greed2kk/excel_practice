import { ExcelComponent } from '@core/ExcelComponent'

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input'],
      ...options,
    })
  }

  toHTML() {
    return `
      <div class="formula-info">fx</div>
      <div class="formula-input" contenteditable="true" spellcheck="false"></div>
    `
  }

  onInput(event) {
    // eslint-disable-next-line no-console
    const text = event.target.textContent.trim()
    this.emitter.emit('it is working', text)
  }
}
