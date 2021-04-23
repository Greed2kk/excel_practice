import { updateDate } from '@/redux/actions'
import { $ } from '@core/dom'
import { Emitter } from '@core/Emitter'
import { CurrentStorage } from '@core/Storage'
import { StoreSubscriber } from '@core/StoreSubscriber'
import { preventDefault } from '@core/utils'

export class Excel {
  constructor(options) {
    this.components = options.components || []
    this.store = options.store
    this.emitter = new Emitter()
    this.subscriber = new StoreSubscriber(this.store)
  }

  getRoot() {
    const $root = $.create('div', 'excel')
    const currentPage = new CurrentStorage(
      this.store.getState().storage
    )
    const componentOptions = {
      emitter: this.emitter,
      store: this.store,
      currentPage,
    }
    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className)
      const component = new Component($el, componentOptions)
      // if (component.name) {
      //   window[`c${component.name}`] = component
      // }
      $el.html(component.toHTML())
      $root.append($el)
      return component
    })
    return $root
  }

  init() {
    if (process.env.NODE_ENV === 'production') {
      document.addEventListener(
        'contextmenu',
        preventDefault
      )
    }
    this.store.dispatch(updateDate())
    this.subscriber.subscribeComponents(this.components)
    this.components.forEach(Component => Component.init())
  }

  destroy() {
    this.subscriber.unsubscribeFromStore()
    this.components.forEach(component =>
      component.destroy()
    )
    document.removeEventListener(
      'contextmenu',
      preventDefault
    )
  }
}
