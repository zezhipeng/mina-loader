const loaderUtils = require('loader-utils')
const renderWxml = require('./lib/render-wxml')
const renderWxss = require('./lib/render-wxss')
const renderScript = require('./lib/render-script')
const { parseComponent } = require('vue-template-compiler')

module.exports = function (content) {
  this.cacheable()
  var cb = this.async()

  const parts = parseComponent(content)

  renderWxml.call(this, parts.template)
  renderWxss.call(this, parts.styles[0])
  renderScript.call(this, parts.script, cb)
}

