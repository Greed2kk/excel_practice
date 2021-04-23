export class FireBase {
  getItem(key) {
    return localStorage.getItem(key)
  }

  set removeItem(key) {
    localStorage.removeItem(key)
  }

  get length() {
    return localStorage.length
  }
}
