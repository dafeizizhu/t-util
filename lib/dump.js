exports.binary = array => {
  let i
  let b = []
  for (i = 0; i < array.length; i++) {
    let h = array[i].toString(2)
    while (h.length < 8) {
      h = '0' + h
    }
    b.push(h)
  }
  return t(b)
}

exports.hex = (array, sep) => {
  let i
  let b = []
  for (i = 0; i < array.length; i++) {
    let h = array[i].toString(16)
    while (h.length < 2) {
      h = '0' + h
    }
    b.push('0x' + h)
  }
  return t(b, sep)
}

var t = (array, sep) => {
  sep = sep || ' '
  let l = array.length
  let mll = (String(l).length % 2) ? (String(l).length + 1) : String(l).length

  return array.map((a, i) => {
    if (i % 8 === 0) {
      var row = String(i)
      while (row.length < mll) row = ' ' + row
      return row + '  ' + a + sep + ' '
    } else if (i % 8 === 7) {
      return a + sep + '\n'
    } else {
      return a + sep + ' '
    }
  }).join('')
}
