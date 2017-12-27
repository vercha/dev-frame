var Configuration = {}

Configuration.install = function (Vue, options) {
  Vue.debug = false

  // Vue.prototype.$serverUrl = !Vue.debug ? window.location.origin + '/api/' : 'http://me.domain/apis/'
  Vue.prototype.$serverUrl = 'http://me.domain/apis/'
}

export default Configuration
