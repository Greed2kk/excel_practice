import { $ } from '@core/dom'
import { ActiveRoute } from '@core/routes/ActiveRoute'

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('No selector!')
    }
    this.$placeholder = $(selector)
    this.routes = routes
    this.page = null
    this.changePageHandler = this.changePageHandler.bind(
      this
    )
    this.init()
  }

  init() {
    window.addEventListener(
      'hashchange',
      this.changePageHandler
    )
    this.changePageHandler()
  }

  changePageHandler() {
    if (this.page) {
      this.page.destroy()
    }
    const Page = ActiveRoute.path.includes('excel')
      ? this.routes.excel
      : this.routes.dashboard
    this.page = new Page(ActiveRoute.params)
    this.$placeholder.clear().append(this.page.getRoot())
    this.page.afterRender()
  }

  // TODO: разобраться с отпиской событий
  destroy() {
    window.removeEventListener(
      'hashchange',
      this.changePageHandler
    )
  }
}
