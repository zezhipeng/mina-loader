const con = require('consolidate')
const loaderUtils = require('loader-utils')
const fs = require('fs-extra')
const { resolve } = require('path')
const { transform } = require('babel-core')

module.exports = function (script, cb) {
  this.cacheable()

  const options = loaderUtils.getOptions(this)
  const fullPath = loaderUtils.interpolateName(this, `[path][name].mina`, options)
  const filename = loaderUtils.interpolateName(this, `[name].js`, options)
  const folder = loaderUtils.interpolateName(this, `[folder]`, options)
  const filePath = loaderUtils.interpolateName(this, `[path]`, options)

  let result = transform(script.content, {
    presets: [
      [
        'env', { 
          modules: false 
        }
      ]
    ]
  })

  cb(null, result.code)
  // fs.outputFileSync(resolve(options.path, `dist/pages/${folder}/${filename}`), result.code, 'utf8')

  // return ``
}