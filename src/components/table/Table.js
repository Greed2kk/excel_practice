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
      const sideProp = type === 'col' ? 'bottom' : 'right'
      const sideOffset =
        type === 'col'
          ? this.$root.$el.offsetHeight
          : this.$root.$el.offsetWidth
      $resizer.css({
        opacity: 1,
        [sideProp]: `${-sideOffset}px`,
      })
      let value
      document.onmousemove = event => {
        if (type === 'col') {
          const delta = Math.floor(
            event.pageX - coords.right
          )
          value = coords.width + delta
          $resizer.css({ right: `${-delta}px` })
        } else {
          const delta = Math.floor(
            event.pageY - coords.bottom
          )
          value = coords.height + delta
          $resizer.css({ bottom: `${-delta}px` })
        }
      }

      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
        if (type === 'col') {
          $parent.css({ width: `${value}px` })
          this.$root
            .findAll(`[data-col="${$parent.data.col}"]`)
            .forEach(el => (el.style.width = `${value}px`))
        } else {
          $parent.css({ height: `${value}px` })
        }

        $resizer.css({
          opacity: 0,
          bottom: 0,
          right: 0,
        })
      }
    }
  }
}
