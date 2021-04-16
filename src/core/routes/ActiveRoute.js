export class ActiveRoute {
  static get path() {
    return window.location.hash.slice(1)
  }

  static get params() {
    const params = ActiveRoute.path.split('/')
    const queryParams = {}
    params.forEach(
      (param, key) => (queryParams[key] = param)
    )
    return queryParams
  }

  static navigate(path) {
    window.location.hash = path
  }
}
