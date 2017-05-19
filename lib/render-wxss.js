const loaderUtils = require('loader-utils')
const fs = require('fs-extra')
const { resolve } = require('path')
const sass = require('node-sass')

const con = {
  stylus: (file, data) => new Promise(resolve => {
    require('stylus').render(data, { filename: file }, (err, css) => {
      if (err) throw err
        
      resolve(css)
    }) 
  }),
  less: (file, data) => new Promise(resolve => {
    require('less').render(data, {}, (err, result) => {
      if (err) throw err

      resolve(result.css)
    }) 
  }),
  scss: (file, data) => new Promise(resolve => {
    require('node-sass').render({
      file, 
      data,
      outputStyle: 'compressed'
    }, (err, result) => {
      if (err) throw err

      resolve(result.css)
    }) 
  }),
  sass: (file, data) => new Promise(resolve => {
    require('node-sass').render({
      file, 
      data,
      outputStyle: 'compressed',
      indentedSyntax: true
    }, (err, result) => {
      if (err) throw err

      resolve(result.css)
    }) 
  })
}


module.exports = async function (style) {
  this.cacheable()

  const options = loaderUtils.getOptions(this)
  const pullPath = loaderUtils.interpolateName(this, `[path][name].mina`, options)
  const filename = loaderUtils.interpolateName(this, `[name].wxss`, options)
  const folder = loaderUtils.interpolateName(this, `[folder]`, options)

  let stylesheet = style.content
  let lang = style.lang

  if (lang) {
    const render = con[style.lang]

    stylesheet = await render(pullPath, stylesheet)
  }

  fs.outputFileSync(resolve(process.cwd(), `dist/pages/${folder}/${filename}`), stylesheet)

  return ``
}

