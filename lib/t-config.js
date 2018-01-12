const fs = require('fs')

const isType = type => {
  return obj => Object.prototype.toString.call(obj) === `[object ${type}]`
}

const isObject = isType('Object')

const cloneObj = (obj, filterKey) => {
  const result = {}
  if (obj && isObject(obj)) {
    Object.keys(obj).forEach(key => {
      if (filterKey !== key) {
        if (isObject(obj[key])) {
          result[key] = cloneObj(obj[key], filterKey)
        } else {
          result[key] = obj[key]
        }
      }
    })
  }
  return result
}

const TAF_CONFIG_LINE_VECTOR_VALUE = 'taf_config_line_vector_value'

let GLOBAL_TAF_CONFIG

class TConfig {
  constructor (data) {
    this._oData = data
    this._data = cloneObj(data, TAF_CONFIG_LINE_VECTOR_VALUE)
  }
  static get GLOBAL_TAF_CONFIG () {
    if (!process.env.TAF_CONFIG) return null
    if (!GLOBAL_TAF_CONFIG) {
      GLOBAL_TAF_CONFIG = this.parseFile(process.env.TAF_CONFIG)
    }
    return GLOBAL_TAF_CONFIG
  }
  static parseFile (filePath) {
    return this.parseText(fs.readFileSync(filePath, 'utf8'))
  }
  static parseText (text) {
    let data = {}
    let arr = text.split(/\r\n|\r|\n/)
    let stack = [data]

    let key = ''
    let value = ''

    for (let i = 0, len = arr.length; i < len; i++) {
      const line = arr[i].replace(/^[\s\t ]+|[\s\t ]+$/g, '')
      if (line.length === 0 || line[0] === '#') continue

      if (line[0] !== '<') {
        const index = line.indexOf('=')
        if (index === -1) {
          key = line
          value = undefined
        } else {
          key = line.slice(0, index)
          value = line.slice(index + 1)
          value = value.replace(/^[\s\t ]+|[\s\t ]+$/g, '')
        }
        key = key.replace(/^[\s\t ]+|[\s\t ]+$/g, '')

        stack[stack.length - 1][key] = value
        if (!stack[stack.length - 1][TAF_CONFIG_LINE_VECTOR_VALUE]) {
          stack[stack.length - 1][TAF_CONFIG_LINE_VECTOR_VALUE] = []
        }
        stack[stack.length - 1][TAF_CONFIG_LINE_VECTOR_VALUE].push(line)
        continue
      }

      if (line[line.length - 1] !== '>') {
        data = {}
        return false
      }

      if (line[1] === '/') {
        stack.pop()
        continue
      }

      key = line.substring(1, line.length - 1)
      const p = stack[stack.length - 1]

      if (p.hasOwnProperty(key)) {
        stack.push(p[key])
      } else {
        p[key] = {}
        stack.push(p[key])
      }
    }
    return new TConfig(data)
  }
  get data () {
    return this._data
  }
}

module.exports = TConfig
