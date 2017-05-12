  module.exports = function parse (content) {
    let html = parseComponent({ startTag: 'template lang="pug"', endTag: 'template' }, content)
    let script = parseComponent({ startTag: 'script', endTag: 'script' }, content)
    let style = parseComponent({ startTag: 'style', endTag: 'style' }, content)

    return {
      html: html,
      script: script,
      style: style
    }
  }

  function parseComponent ({ startTag, endTag }, content) {
    let reg = new RegExp(`<${startTag}>[\\\w\\W]*</${endTag}>`, 'g')
    let str = content.match(reg)

    if (str) {
      str = str[0].split(`<${startTag}>\n`).pop()
      str = str.split(`\n</${endTag}>`).shift()     
    }
    
    return str || ''
  }