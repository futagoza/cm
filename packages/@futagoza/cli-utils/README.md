A set of function's for use in scripts that interact with the CLI.

### api

```js
const cliutil = require( "@futagoza/cli-utils" );

// https://www.npmjs.com/package/chalk
cliutil.color || cliutil.log.color

// Append either the given time, or if none provided, the current time.
cliutil.log.appendTime( time, color )

// Prettily log information to the console.
cliutil.log.info( ...data )

// Prettily log a warning to the console.
cliutil.log.warning( ...data )

// Prettily log an error to the console.
cliutil.log.error( ...data )

// Iterate over `args` while calling `cb(arg, nextArg)`.
cliutil.visitArgv( args, ( arg, nextArg ) => {

    // The current argument
    arg

    // Get's the next argument without moving the visitor forward
    nextArg()

    // Get's the next argument and moves the visitor forward
    nextArg.consume()

    // Without moving the visitor, will get a copy of the remaining arguments
    nextArg.rest()

} )

// If this is returned by `cb`, `visitArgv` will end it's iteration.
cliutil.visitArgv.BREAK

```

* The arguments for `cliutil.log.appendTime` are completely optional.
* The `cb` for `cliutil.visitArgv` can be an object of known arguments (e.g. `{ "-e": evalNextArg }`)

### license

[![History](https://img.shields.io/badge/github.com/futagoza/cm-changelog-yellow.svg)](https://github.com/futagoza/cm/blob/master/CHANGELOG.md)
[![license](https://img.shields.io/badge/license-mit-blue.svg)](https://opensource.org/licenses/MIT)

_@futagoza/cli-utils_ is Copyright (c) 2018+ Futago-za Ryuu
