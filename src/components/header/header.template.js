export function createHeader(title) {
  return `
    <input class="header__input" type="text" value="${title}"/>
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
