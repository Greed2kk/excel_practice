import { TableSelection } from '@components/table/TableSelection'
import { $ } from '@core/dom'
import { ExcelComponent } from '@core/ExcelComponent'
import { resizeHandler } from '@components/table/table.resize'
import {
  isCell,
  matrix,
  shouldResize,
} from '@components/table/table.functions'
import { createTable } from './table.template'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
    })
  }

  toHTML() {
    return createTable(20)
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()
    const $cell = this.$root.find('[data-id="0:0"]')
    this.selection.select($cell)
  }

  onMousedown(e) {
    if (shouldResize(e)) {
      resizeHandler(this.$root, e)
    } else if (isCell(e)) {
      const $target = $(e.target)
      if (e.shiftKey) {
        const $cells = matrix(
          $target,
          this.selection.current
        ).map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else {
        this.selection.select($target)
      }
    }
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
