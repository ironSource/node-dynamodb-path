var test = require('tape')
  , ddbPath = require('./')

test('ddbPath', function(t) {
  function escape(name) {
    return '#' + name
  }

  function expect(path, escape, res) {
    try {
      t.equal(ddbPath(path, escape), res, res)
    } catch (e) {
      t.fail(e.message)
    }
  }

  expect(['a'], null, 'a')
  expect(['a'], escape, '#a')
  expect(['a', 'b'], escape, '#a.#b')
  expect(['a', 0], escape, '#a[0]')
  expect(['a', 0, 'x_2', '291'], escape, '#a[0].#x_2[291]')
  expect(['a', 0], null, 'a[0]')
  expect(['a', 'b', 0], escape, '#a.#b[0]')
  expect(['a', 'b', '0'], escape, '#a.#b[0]')
  expect(['x', '291', '2', 'beep', 283], escape, '#x[291][2].#beep[283]')

  t.throws(ddbPath.bind(null), 'requires path')
  t.throws(ddbPath.bind(null, ''), 'requires array path')
  t.throws(ddbPath.bind(null, []), 'requires non-empty array path')

  t.throws(ddbPath.bind(null, [0]), 'cannot start with number (1)')
  t.throws(ddbPath.bind(null, [1]), 'cannot start with number (2)')
  t.throws(ddbPath.bind(null, ['10']), 'cannot start with number (3)')

  t.throws(ddbPath.bind(null, [-1]), 'cannot contain negative number (1)')
  t.throws(ddbPath.bind(null, ['a', -1]), 'cannot contain negative number (2)')
  t.throws(ddbPath.bind(null, ['-291']), 'cannot contain negative number (3)')

  t.throws(ddbPath.bind(null, [2, NaN]), 'cannot contain NaN (1)')
  t.throws(ddbPath.bind(null, ['a', NaN]), 'cannot contain NaN (2)')

  t.throws(ddbPath.bind(null, ['a', '']), 'cannot contain empty string (1)')
  t.throws(ddbPath.bind(null, ['']), 'cannot contain empty string (2)')
  t.throws(ddbPath.bind(null, ['a', 23, '', 'x']), 'cannot contain empty string (3)')

  t.end()
})
