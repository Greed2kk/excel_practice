import { defaultTitle } from '@/constants'
import { changeTitle } from '@/redux/actions'
import { createHeader } from '@components/header/header.template'
import { $ } from '@core/dom'
import { ExcelComponent } from '@core/ExcelComponent'
import { ActiveRoute } from '@core/routes/ActiveRoute'
import { debounce } from '@core/utils'

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options,
    })
    this.pageBase = options.currentPage
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300)
  }

  toHTML() {
    const { currentTitle } =
      this.store.getState() || defaultTitle
    return createHeader(currentTitle)
  }

  onInput(e) {
    const $target = $(e.target)
    this.$dispatch(changeTitle($target.text()))
  }

  /**
   * todo: переписать этот кусок
   */
  onClick(e) {
    const $target = $(e.target)
    switch ($target.data.button) {
      case 'remove':
        // eslint-disable-next-line no-restricted-globals,no-case-declarations,no-alert
        const decision = confirm(
          'Are you sure you want to remove this table?'
        )
        if (decision) {
          this.pageBase.removeItem(
            `excel-${ActiveRoute.params[1]}`
          )
        } else {
          break
        }
      // eslint-disable-next-line no-fallthrough
      case 'exit':
        ActiveRoute.navigate('')
    }
  }
}
