import { Loader } from '@components/Loader'
import { $ } from '@core/dom'
import { ActiveRoute } from '@core/routes/ActiveRoute'

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('No selector!')
    }
    this.$placeholder = $(selector)
    this.routes = routes
    this.loader = new Loader()
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

  async changePageHandler() {
    if (this.page) {
      this.page.destroy()
    }
    this.$placeholder.clear().append(this.loader)

    const Page = ActiveRoute.path.includes('excel')
      ? this.routes.excel
      : this.routes.dashboard
    this.page = new Page(ActiveRoute.params)

    const root = await this.page.getRoot()

    this.$placeholder.clear().append(root)
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
