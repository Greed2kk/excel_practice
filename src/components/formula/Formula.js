import { ExcelComponent } from '@core/ExcelComponent'

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click'],
    })
  }

  toHTML() {
    return `
      <div class="formula-info">fx</div>
      <div class="formula-input" contenteditable="true" spellcheck="false"></div>
    `
  }

  onInput(event, callback) {
    // eslint-disable-next-line no-console
    console.log('Formula in input', event, callback)
  }

  onClick() {
    // eslint-disable-next-line no-console
    console.log('mc')
  }
}
