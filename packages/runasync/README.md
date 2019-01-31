[![npm version](https://img.shields.io/npm/v/runasync.svg)](https://www.npmjs.com/package/runasync)
[![License](https://img.shields.io/badge/license-mit-blue.svg)](https://opensource.org/licenses/MIT)

This is a simple module to execute a JavaScript file that exports (as a default) a ES2017 `async` function (or a function that returns a ES2015 `Promise`).

To use `async` function's you must have Node.js v7.6.0 or higher, where as for native support for Promise's requires Node.js v4.0.0

## installation

```bash
$ npm i runasync
```

## usage

#### programmatically via `require()`

```js
const runAsyncFile = require( "runasync" );

async function main() {

    const run = await runAsyncFile( "./async-app"/*[, optionalArgs], optionalCallback*/ );

    run.result // the returned result, if any (as long as there was no error)
    run.error  // if there was an error, this is where you'de find it

}
```

#### via the cli

```bash
$ runasync ./async-app arg1 arg2
```

## why?

1. Simply for the ease of executing an async method via the cli and having its error thrown to the console in a cleaner manner instead of also receiving a `unhandled` error from Node.js and/or the Promise.

2. A simpler way to chain script tasks together, rather then calling `require( "child_process" ).spawn`

## license

runasync is maintained by [Futago-za Ryuu](https://futagoza.github.io/)<br />
Released under [the MIT License](http://opensource.org/licenses/MIT)
