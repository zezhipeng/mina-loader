const loaderUtils = require('loader-utils')
const fs = require('fs-extra')
const url = require('../util/url')
const { resolve } = require('path')

module.exports = function (content) {
  this.cacheable()

  const options = loaderUtils.getOptions(this)
  const output = url(this, options)

  fs.outputFile(resolve(output.path, `./${output.name}.wxss`), content, 'utf8')

  return ``
}

// module.exports.raw = true