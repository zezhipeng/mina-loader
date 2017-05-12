const loaderUtils = require('loader-utils')
const pug = require('pug')
const fs = require('fs-extra')
const url = require('../util/url')
const { resolve } = require('path')

module.exports = function (content) {
  this.cacheable()

  const options = loaderUtils.getOptions(this)

  let html = pug.render(content)
  html = html.replace(/(div)+/g, 'view')

  const output = url(this, options)

  fs.outputFile(resolve(output.path, `./${output.name}.wxml`), html, 'utf8')

  return ``
}

// module.exports.raw = true