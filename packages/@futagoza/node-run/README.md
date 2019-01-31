Will run `child_process.spawn()` wrapped in a `Promise` that is only resolved when the spawned process closes. All output by default is sent to the current process via `options.stdio = "inherit"`.

> This module has been integrated into [@futagoza/child-process](https://www.npmjs.com/package/@futagoza/child-process), and this one _(@futagoza/node-run)_ exports the _run_ method exported from _@futagoza/child-process_.

### example

```js
const run = require( "@futagoza/node-run" );

run( "npm", [ "publish", "--access", "public" ] );

run( "npm", { args: [ "publish", "--access", "public" ] } );

run( "npm publish --access public" );
```

### history

This package was created to help develop wrapper tasks in Gulp (`gulpfile.js` to be more precise) that execute an external process. It was originally a simple wrapper around `child_process.spawn()`, but was rewrote to be more like [@ahmadnassri/spawn-promise](https://github.com/ahmadnassri/node-spawn-promise) and optionally support input.

-----

[![History](https://img.shields.io/badge/github.com/futagoza/cm-changelog-yellow.svg)](https://github.com/futagoza/cm/blob/master/CHANGELOG.md)
[![license](https://img.shields.io/badge/license-mit-blue.svg)](https://opensource.org/licenses/MIT)

_@futagoza/node-run_ is Copyright (c) 2018+ Futago-za Ryuu
