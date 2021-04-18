import { rootReducer } from '@/redux/rootReducer'
import { Excel } from '@components/excel/Excel'
import { Formula } from '@components/formula/Formula'
import { Header } from '@components/header/Header'
import { Table } from '@components/table/Table'
import { Toolbar } from '@components/toolbar/Toolbar'
import { createStore } from '@core/store/createStore'
import { Page } from '@core/Page'
import { debounce, storage } from '@core/utils'
import { normalizeInitialState } from '@/redux/initialState'

function storageName(param) {
  return `excel-${param}`
}

export class ExcelPage extends Page {
  getRoot() {
    const state = storage(storageName(this.params[1]))
    const param = this.params[1]
      ? this.params[1]
      : Date.now().toString()
    // eslint-disable-next-line no-undef
    const store = createStore(
      rootReducer,
      normalizeInitialState(state)
    )
    const stateListener = debounce(curState => {
      storage(storageName(param), curState)
    }, 300)

    store.subscribe(stateListener)

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
  }
}
