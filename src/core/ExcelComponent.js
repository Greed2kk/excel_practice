import { DomListener } from '@core/DomListener'

export class ExcelComponent extends DomListener {
  /**
   * Возвращает шаблон компонента
   */
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.unsubscribers = []

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

  init() {
    this.initDomListeners()
  }

  destroy() {
    this.removeDomListeners()
    this.unsubscribers.forEach(unsub => unsub())
  }
}
