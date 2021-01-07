import { $ } from '@core/dom'
import { ExcelComponent } from '@core/ExcelComponent'

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options,
    })
  }

  toHTML() {
    return `
      <div class="formula-info">fx</div>
      <div id="formula" class="formula-input" contenteditable="true" spellcheck="false"></div>
    `
  }

  onInput(event) {
    // eslint-disable-next-line no-console
    this.$emit('formula:input', $(event.target).text())
  }

  init() {
    super.init()
    this.$formula = this.$root.find('#formula')
    this.$on('table:select', $cell => {
      this.$formula.text($cell.text())
    })

    this.$on('table:input', $cell => {
      this.$formula.text($cell.text())
    })
  }

  onKeydown(e) {
    const keys = ['Enter', 'Tab']
    if (keys.includes(e)) {
      e.preventDefault()
      this.$emit('formula:done')
    }
  }
}
