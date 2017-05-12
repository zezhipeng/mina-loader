const path = require('path')
const loaderUtils = require('loader-utils')

module.exports = function (ctx, options) {
  let srcUrl = loaderUtils.interpolateName(ctx, `[path]`, options)
  let srcUrlReg = options.path.replace(/\//, '\/') 

  let name = ctx.resourcePath
  name = name.split(srcUrlReg).pop()
  name = name.split('.mina').shift()

  let newPath = path.resolve(options.path, options.dist)

  return {
    name: name,
    path: newPath
  }
}