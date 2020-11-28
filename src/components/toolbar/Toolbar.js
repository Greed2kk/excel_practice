import { ExcelComponent } from '@core/ExcelComponent'

export class Toolbar extends ExcelComponent {
  static className = 'excel__toolbar'

  constructor($root) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
    })
  }

  toHTML() {
    return `
    <div class="toolbar__buttons">
          <div class="button-format">
            <span class="material-icons">format_align_left </span>
          </div>
          <div class="button-format">
            <span class="material-icons">format_align_center </span>
          </div>
          <div class="button-format">
            <span class="material-icons">format_align_right </span>
          </div>
          <div class="button-format">
            <span class="material-icons">format_bold </span>
          </div>
          <div class="button-format">
            <span class="material-icons">format_italic</span>
          </div>
          <div class="button-format">
            <span class="material-icons">format_underline </span>
          </div>
      </div>
    `
  }

  onClick(e) {
    // eslint-disable-next-line no-console
    console.log(e.target)
  }
}
