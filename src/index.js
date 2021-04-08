import { rootReducer } from '@/redux/rootReducer'
import { Excel } from '@components/excel/Excel'
import { Formula } from '@components/formula/Formula'
import { Header } from '@components/header/Header'
import { Table } from '@components/table/Table'
import { Toolbar } from '@components/toolbar/Toolbar'
import './scss/index.scss'
import { createStore } from '@core/createStore'

const store = createStore(rootReducer, {
  colState: {},
})
const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
})

excel.render()
