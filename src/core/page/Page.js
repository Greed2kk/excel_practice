/**
 * Pseudo interface
 */
export class Page {
  constructor(params = '') {
    this.params = params || Date.now().toString()
  }

  getRoot() {
    throw new Error('Not Implemented "getRoot" method')
  }

  afterRender() {}

  destroy() {}
}
