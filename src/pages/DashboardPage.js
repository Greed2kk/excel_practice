import { normalizeInitialState } from '@/redux/initialState'
import { rootReducer } from '@/redux/rootReducer'
import {
  createRecordsTable,
  createSwitcher,
} from '@/shared/dashboard.functions'
import { LocalStorageClient } from '@/shared/LocalStorageClient'
import { $ } from '@core/dom'
import { Page } from '@core/page/Page'
import { StateProcessor } from '@core/page/StateProcessor'
import { CurrentStorage } from '@core/Storage'
import { createStore } from '@core/store/createStore'

export class DashboardPage extends Page {
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
    const currentStorage = new CurrentStorage(
      store.getState().storage
    )
    const now =
      Date.now().toString() + Math.floor(Math.random())
    return $.create('div', 'db').html(`
    <div class="db__header">
      <h1>Excel</h1>
    </div>

    <div class="db__new">
      <div class="db__view">
        <a href="#excel/${now}" class="db__create">Создать <br> Новую Таблицу</a>
      </div>
    </div>

    <div class="db__table db__view">
       ${createSwitcher()}
      <div class="db__list-header">
       ${createRecordsTable(currentStorage)}
    </div>`)
  }

  destroy() {
    this.storeSub.unsubscribe()
  }
}
