Will sync the version of any dependency that is also a workspace package.

### example

On the CLI (optionally pass root directories):

```sh
$ sync-yarn-workspaces
```

Through the API (optionally pass a single root directory):

```js
const sync = require( "@futagoza/sync-yarn-workspaces" );

sync();
```

### things to note

* Format of each _package.json_ is kept
* The dependency version is only updated if it is lower then the workspace version
* This module is synchronous

-----

[![History](https://img.shields.io/badge/github.com/futagoza/cm-changelog-yellow.svg)](https://github.com/futagoza/cm/blob/master/CHANGELOG.md)
[![license](https://img.shields.io/badge/license-mit-blue.svg)](https://opensource.org/licenses/MIT)

_@futagoza/sync-yarn-workspaces_ is Copyright (c) 2018+ Futago-za Ryuu
