import { rootReducer } from '@/redux/rootReducer'
import { LocalStorageClient } from '@/shared/LocalStorageClient'
import { Excel } from '@components/excel/Excel'
import { Formula } from '@components/formula/Formula'
import { Header } from '@components/header/Header'
import { Table } from '@components/table/Table'
import { Toolbar } from '@components/toolbar/Toolbar'
import { StateProcessor } from '@core/page/StateProcessor'
import { createStore } from '@core/store/createStore'
import { Page } from '@core/page/Page'
import { normalizeInitialState } from '@/redux/initialState'

export class ExcelPage extends Page {
  constructor(param) {
    super(param)
    this.storeSub = null
    this.processor = new StateProcessor(
      new LocalStorageClient(this.params[1])
    )
  }

  async getRoot() {
    const state = await this.processor.get()
    const store = createStore(
      rootReducer,
      normalizeInitialState(state)
    )
    this.storeSub = store.subscribe(this.processor.listen)

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store,
    })

    return this.excel.getRoot()
  }

  afterRender() {
    this.excel.init()
  }

  destroy() {
    this.excel.destroy()
    this.storeSub.unsubscribe()
  }
}
