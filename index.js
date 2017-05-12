const parse = require('./util/parse')
const loaderUtils = require('loader-utils')
const renderWxml = require('./lib/renderWxml')
const renderWxss = require('./lib/renderWxss')
const renderJs = require('./lib/renderJs')

module.exports = function (content) {
  this.cacheable()

  const str = parse(content)

  renderWxml.call(this, str.html)
  renderWxss.call(this, str.style)
  renderJs.call(this, str.script)

  return ``
}