import { createRecordsTable } from '@/pages/dashboard.functions'
import { $ } from '@core/dom'
import { Page } from '@core/Page'

export class DashboardPage extends Page {
  getRoot() {
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
      <div class="db__list-header">
       ${createRecordsTable()}
    </div>`)
  }
}
