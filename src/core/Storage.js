import { FireBase } from '@core/storages/FireBase'
import { LocalStorage } from '@core/storages/LocalStorage'

export class CurrentStorage {
  constructor(type = 'localStorage') {
    switch (type) {
      case 'localStorage':
        this.StorageType = new LocalStorage()
        break
      case 'FireBase':
        this.StorageType = new FireBase()
    }
  }

  getItem(key) {
    return this.StorageType.getItem(key)
  }

  removeItem(key) {
    this.StorageType.removeItem(key)
  }

  get length() {
    return this.StorageType.length
  }

  setItem(key, data) {
    this.StorageType.setItem(key, data)
  }

  key(key) {
    return this.StorageType.key(key)
  }
}
