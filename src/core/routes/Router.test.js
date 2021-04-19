import { $ } from '@core/dom'
import { Page } from '@core/page/Page'
import { Router } from '@core/routes/Router'

class DashboardPage extends Page {
  async getRoot() {
    return $.create('div').text('dashboard')
  }
}
class ExcelPage extends Page {}

describe('Router:', () => {
  let router, $root

  beforeEach(() => {
    $root = document.createElement('div')
    router = new Router($root, {
      dashboard: DashboardPage,
      excel: ExcelPage,
    })
  })

  test('should be defined', () => {
    expect(router).toBeDefined()
  })

  test('should render dashboard Page', () => {
    expect($root.innerHTML).toBe('<div>dashboard</div>')
  })
})
