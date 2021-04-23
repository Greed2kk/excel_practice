import { localeDateTime, storage } from '@core/utils'

function toHtml(key) {
  const model = storage(key)
  const id = key.split('-')[1]
  const date = model.openedDate
  return `
        <li class="db__record">
          <a href="#excel/${id}" class="record">
            ${model.currentTitle}</a>
          <strong>${localeDateTime(date)}</strong>
        </li>
  `
}

function getAllKeys(store) {
  const keys = []
  for (let i = 0; i < store.length; i++) {
    const key = store.key(i)
    if (key.includes('excel')) {
      keys.push(key)
    }
  }
  return keys
}

export function createRecordsTable(store) {
  const keys = getAllKeys(store)
  if (!keys.length) {
    return `<p> Созданных записей нет</p>`
  }
  return ` <span>Название</span>
        <span style="position: relative; right: 3%">Дата</span>
      </div>
      <ul class="db__list">
        ${keys.map(toHtml).join('')}
      </ul>`
}

export function createSwitcher() {
  return `
  <label class="switch">
    <input type="checkbox">
    <span class="slider"></span>
  </label>`
}
