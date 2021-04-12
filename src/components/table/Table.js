import { TableSelection } from '@components/table/TableSelection'
import { $ } from '@core/dom'
import { ExcelComponent } from '@core/ExcelComponent'
import { resizeHandler } from '@components/table/table.resize'
import {
  isCell,
  matrix,
  nextSelector,
  shouldResize,
} from '@components/table/table.functions'
import * as actions from '@/redux/actions'
import { createTable } from './table.template'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    })
  }

  toHTML() {
    return createTable(20, this.store.getState())
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()
    this.selectCell(this.$root.find('[data-id="0:0"]'))
    this.$on('formula:input', text => {
      this.selection.current.text(text)
      this.updateTextStore(text)
    })
    this.$on('formula:done', () => {
      this.selection.current.focus()
    })
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
  }

  async resizeTable(e) {
    try {
      const data = await resizeHandler(this.$root, e)
      this.$dispatch(actions.tableResize(data))
    } catch (error) {
      console.warn('Resize error', error.message)
    }
  }

  onMousedown(e) {
    if (shouldResize(e)) {
      this.resizeTable(e)
    } else if (isCell(e)) {
      const $target = $(e.target)
      if (e.shiftKey) {
        const $cells = matrix(
          $target,
          this.selection.current
        ).map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else {
        this.selectCell($target)
      }
    }
  }

  onKeydown(e) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowDown',
      'ArrowUp',
    ]
    const { key } = e
    if (keys.includes(key) && !e.shiftKey) {
      e.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id))
      this.selectCell($next)
    }
  }

  updateTextStore(value) {
    this.$dispatch(
      actions.inputText({
        id: this.selection.current.id(),
        value,
      })
    )
  }

  onInput(e) {
    this.updateTextStore($(e.target).text())
  }

  // onMouseup(e) {
  //   if (isCell(e)) {
  //     const $target = $(e.target)
  //     const $cells = matrix(
  //       $target,
  //       this.selection.current
  //     ).map(id => this.$root.find(`[data-id="${id}"]`))
  //     this.selection.selectGroup($cells)
  //   }
  // }
}
