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
      const cells = this.$root.findAll(
        `[data-col="${$parent.data.col}"]`
      )

      document.onmousemove = event => {
        console.log('onmousemove')
        const delta = Math.floor(event.pageX - coords.right)
        const value = coords.width + delta
        $parent.$el.style.width = `${value}px`
        cells.forEach(el => (el.style.width = `${value}px`))
      }

      document.onmouseup = () => {
        document.onmousemove = null
      }
    }
  }
}
