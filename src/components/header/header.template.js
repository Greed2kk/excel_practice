export function createHeader(title) {
  return `
    <input class="header__input" type="text" value="${title}"/>
    <div class="header__buttons">
      <div class="button-delete" data-button="remove">
        <span class="material-icons" data-button="remove">delete</span>
      </div>
      <div class="button-exit" data-button="exit">
        <span class="material-icons" data-button="exit">exit_to_app</span>
      </div>
    </div>
    `
}
