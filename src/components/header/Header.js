import { defaultTitle } from '@/constants'
import { changeTitle } from '@/redux/actions'
import { createHeader } from '@components/header/header.template'
import { $ } from '@core/dom'
import { ExcelComponent } from '@core/ExcelComponent'

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options,
    })
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
}
