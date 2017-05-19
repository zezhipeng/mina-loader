const loaderUtils = require('loader-utils')
const renderWxml = require('./lib/render-wxml')
const renderWxss = require('./lib/render-wxss')
const renderScript = require('./lib/render-script')
const { parseComponent } = require('vue-template-compiler')

module.exports = function (content) {
  this.cacheable()
  var cb = this.async()

  const parts = parseComponent(content)
  if (parts.template) {
    renderWxml.call(this, parts.template)  
  }
  if (parts.styles && parts.styles.length) {
    renderWxss.call(this, parts.styles[0])  
  }
  if (parts.script) {
    renderScript.call(this, parts.script, cb)
  } else {
    cb(null, '')
  }
}

