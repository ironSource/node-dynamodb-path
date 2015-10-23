# dynamodb-path

**Convert an array path like `['x', '291', '2', 'beep', 283]` to a string path like `#x[291][2].#beep[283]` suitable for DynamoDB UpdateExpressions.**

[![npm status](http://img.shields.io/npm/v/dynamodb-path.svg?style=flat-square)](https://www.npmjs.org/package/dynamodb-path) [![Dependency status](https://img.shields.io/david/vweevers/node-dynamodb-path.svg?style=flat-square)](https://david-dm.org/vweevers/node-dynamodb-path)

## example

```js
var ddbPath = require('dynamodb-path')
var escape = (s) => '#' + s

var arr = ['x', '291', '2', 'beep', 283]
var str = ddbPath(arr, escape)

console.log(str) // #x[291][2].#beep[283]
```

## api

### `ddbPath(path[, map])`

Takes an array, returns a string. Will throw if `path` is invalid. If a `map` function is provided, it will be called for every string segment. You can use this mapper to escape segments and collect names for ExpressionAttributeNames.

## install

With [npm](https://npmjs.org) do:

```
npm install dynamodb-path
```

## license

[MIT](http://opensource.org/licenses/MIT) © ironSource
