import { ExcelComponent } from '@core/ExcelComponent'

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      ...options,
    })
  }

  toHTML() {
    return `
    <input class="header__input" type="text" value="Название таблицы"></input>
    <div class="header__buttons">
      <div class="button-delete">
        <span class="material-icons">delete</span>
      </div>
      <div class="button-exit">
        <span class="material-icons">exit_to_app</span>
      </div>
    </div>
    `
  }
}
