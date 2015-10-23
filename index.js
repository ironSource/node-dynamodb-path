'use strict';

var isArray = require('isarray')

module.exports = function(path, mapFn) {
  if (!isArray(path)) throw new Error('Expected an array path')
  if (!path.length) throw new Error('Path cannot be empty')

  return path.reduce( function(prev, segment, i) {
    var num = number(segment, path, i)

    // List[segment]
    if (num !== false) {
      if (i === 0) throw new Error(illegal(path, i, 'cannot start with number'))
      if (num < 0) throw new Error(illegal(path, i, 'negative number'))
      return prev + '[' + segment + ']'
    }

    if (!segment) {
      throw new Error(illegal(path, i, 'is empty'))
    }

    // Map.#segment
    var mapped = mapFn ? mapFn(segment) : segment
    return i === 0 ? mapped : prev + '.' + mapped
  }, '')
}

function illegal(path, i, msg) {
  path = path.join(', ')
  return 'Illegal segment ('+i+') in path ['+path+']: '+msg
}

function number(segment, path, i) {
  if (typeof segment === 'number') {
    if (isNaN(segment)) throw new Error(illegal(path, i, 'cannot be NaN'))
    return segment
  }

  var num = parseInt(segment)

  if (!isNaN(num) && (num + '' === segment)) {
    return num
  }

  return false
}

