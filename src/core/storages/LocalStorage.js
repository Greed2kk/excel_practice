export class LocalStorage {
  getItem(key) {
    return localStorage.getItem(key)
  }

  removeItem(key) {
    localStorage.removeItem(key)
  }

  get length() {
    return localStorage.length
  }

  setItem(key, data) {
    localStorage.setItem(key, data)
  }

  key(key) {
    return localStorage.key(key)
  }
}
