import { ExcelComponent } from '@core/ExcelComponent'
import { $ } from '@core/dom'
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

  onMousedown(e) {
    if (e.target.dataset.resize) {
      const $resizer = $(e.target)
      // const $parent = $resizer.$el.parentNode //bad
      // const $parent = $resizer.$el.closest('.column') //better
      const $parent = $resizer.closest(
        '[data-type="resizable"]'
      )
      const coords = $parent.getCoords()
      const type = $resizer.data.resize
      const cells = this.$root.findAll(
        `[data-col="${$parent.data.col}"]`
      )
      document.onmousemove = event => {
        if (type === 'col') {
          const delta = Math.floor(
            event.pageX - coords.right
          )
          const value = coords.width + delta
          $parent.css({ width: `${value}px` })
          cells.forEach(
            el => (el.style.width = `${value}px`)
          )
        } else {
          const delta = event.pageY - coords.bottom
          const value = coords.height + delta
          $parent.css({ height: `${value}px` })
        }
      }

      document.onmouseup = () => {
        document.onmousemove = null
      }
    }
  }
}
