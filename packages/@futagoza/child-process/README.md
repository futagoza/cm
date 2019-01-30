A set of functions based around `child_process.spawn()` that return Promises.

The arguments are the same as `child_process.spawn()`, but if the second argument isn't an array, it will try `options.args` or `options.argv`; failing that, the first argument (the string) will be split (by default " " is used, but that can be changed using `options.ws`), and all but the first element will be used as the `args` argument, setting the first element as the new command.

### example

```js
const cp = require( "@futagoza/child-process" );

// Spawns a new process.
cp.spawn( command, args?, options? )

// Spawns a shell, executing the command inside the shell and buffering any generated output.
cp.exec( command, args?, options? )

// Same as `cp.exec`, but sends any output to the current process instead.
cp.run( command, args?, options? )

// Confirm if the given error was thrown from a spawn'ed process.
cp.isSpawnError( object? )

// All arguments are optional, apart from the `command`, which can be passed as the
// first argument or as an option (either `command` or `file`)
cp.spawn( "npm", [ "publish", "--access", "public" ] );
cp.spawn( "npm", { args: [ "publish", "--access", "public" ] } );
cp.spawn( "npm publish --access public" );
cp.spawn( { command: "npm publish --access public" } );
```

### options

In addition to the options used by [child_process.spawn()](https://nodejs.org/dist/latest-v10.x/docs/api/child_process.html#child_process_child_process_spawn_command_args_options), the following options are also supported:

|   option   | description |
| ---------- | ----------- |
| args | Alternative to passing an array as the second argument |
| argv | Alternative to passing an array as the second argument |
| buffer<sub>1</sub> | On _options.pipe_ this will buffer the results from both `stdout` and `stderr` |
| command | Alternative to passing the command as the first argument |
| encoding<sub>1</sub> | Used alongside _options.buffer_, this specifies the character encoding used to decode the results |
| file | Alternative to passing the command as the first argument |
| ignore<sub>2</sub> | Will set _options.stdio_ to __ignore__ |
| inherit<sub>2</sub> | Will set _options.stdio_ to __inherit__<sub>3</sub> |
| input | passed to the child process's `stdin` |
| pipe<sub>2</sub> | Will set _options.stdio_ to __pipe__<sub>4</sub> |
| ready | A function that will be called with the child process as it's argument once the promise has started waiting |
| silent<sub>2</sub> | Will set _options.stdio_ to __pipe__ |
| ws | If there were no _args_ found, then this is used to split the _command_ string and extract the _args_ |

1. The _buffer_ option is only used in `cp.spawn` _(optional)_ and `cp.exec` _(fixed)_
2. Is ignored if the _stdio_ option is already set
3. The fixed option for _stdio_ with `cp.run`
4. The fixed option for _stdio_ with `cp.exec`, and the default for it on `cp.spawn`

-----

[![History](https://img.shields.io/badge/github.com/futagoza/cm-changelog-yellow.svg)](https://github.com/futagoza/cm/blob/master/CHANGELOG.md)
[![license](https://img.shields.io/badge/license-mit-blue.svg)](https://opensource.org/licenses/MIT)

_@futagoza/child-process_ is Copyright (c) 2018+ Futago-za Ryuu
