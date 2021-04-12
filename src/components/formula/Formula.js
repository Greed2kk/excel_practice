import { $ } from '@core/dom'
import { ExcelComponent } from '@core/ExcelComponent'

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
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
    // this.$subscribe(state => {
    //   this.$formula.text(state.currentText)
    // })
  }

  storeChanged({ currentText }) {
    this.$formula.text(currentText)
  }

  onKeydown(e) {
    const keys = ['Enter', 'Tab']
    if (keys.includes(e.key)) {
      e.preventDefault()
      this.$emit('formula:done')
    }
  }
}
