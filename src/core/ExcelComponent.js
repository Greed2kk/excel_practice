import { DomListener } from '@core/DomListener'

export class ExcelComponent extends DomListener {
  /**
   * Возвращает шаблон компонента
   */
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.subscribe = options.subscribe || []
    this.unsubscribers = []
    this.store = options.store
    // this.storeSub = null
    this.prepare()
  }

  prepare() {}

  toHTML() {
    return ''
  }

  // патерн фасад
  $emit(e, ...args) {
    this.emitter.emit(e, ...args)
  }

  $on(e, fn) {
    const unsub = this.emitter.subscribe(e, fn)
    this.unsubscribers.push(unsub)
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  // updated on changes
  storeChanged() {}

  isWatching(key) {
    return this.subscribe.includes(key)
  }

  // $subscribe(fn) {
  //   this.storeSub = this.store.subscribe(fn)
  // }

  init() {
    this.initDomListeners()
  }

  destroy() {
    this.removeDomListeners()
    this.unsubscribers.forEach(unsub => unsub())
    // this.storeSub.unsubscribe()
  }
}
