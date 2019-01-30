This package provides helpers to create [through2](https://www.npmjs.com/package/through2) streams from different types of functions.

```js
const cs = require( "@futagoza/create-stream" );

// Create's a through2 stream from the given Promise or Function,
// passing the extra arguments fn if it's not a Promise.
cs( fn, ...args )
cs.createStream( fn, ...args )
cs.from( fn, ...args )

// Create's a through2 stream from the given Promise, passing the
// optional options object directly to through2.
cs.fromPromise( fn, options? )

// Create's a through2.obj tranform stream using the given function,
// passing the optional array of extra arguments to fn.
cs.fromFunction( fn, args? )

// Aliases for through, so it doesn't have to be included separately.
cs.through
cs.through2
cs.ctor
cs.obj
```

-----

[![History](https://img.shields.io/badge/github.com/futagoza/cm-changelog-yellow.svg)](https://github.com/futagoza/cm/blob/master/CHANGELOG.md)
[![license](https://img.shields.io/badge/license-mit-blue.svg)](https://opensource.org/licenses/MIT)

_@futagoza/create-stream_ is Copyright (c) 2018+ Futago-za Ryuu
