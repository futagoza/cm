[![Build Status](https://futagoza.visualstudio.com/cm/_apis/build/status/futagoza.cm?branchName=master)](https://futagoza.visualstudio.com/cm/_build/latest?definitionId=3?branchName=master)
[![Codecov](https://codecov.io/gh/futagoza/jcc/branch/master/graph/badge.svg)](https://codecov.io/gh/futagoza/cm)
[![License](https://img.shields.io/badge/license-mit-blue.svg)](https://opensource.org/licenses/MIT)

This is a collection of modules usable in [Node.js v6+](https://nodejs.org/en/blog/release/v6.0.0/) environments, with a selected subset of these packages usable in most browsers via a transformer (e.g. [Babel](https://babeljs.io/)) and [package bundlers](#package-bundlers). 

- [Install](#install)
  * [cm packages](#cm-packages)
  * [repository](#repository)
- [Packages](#packages)
- [Documentation](#documentation)
- [Package bundlers](#package-bundlers)
- [History](#history)
- [License](#license)

## Install

### cm packages

I recommend adding any package from this repo to your `dependencies` field in your `package.json` for most cases, but if you plan to develop a package for the browser and your using a [package bundler](#package-bundlers), add them to your `devDependencies` field instead.

### repository

Your going to need [Git](https://git-scm.com/), [Yarn](https://yarnpkg.com/) and [Node.js v6+](https://nodejs.org/)

```shell
git clone https://github.com/futagoza/cm.git
cd cm
yarn install
```

## Packages

| package | release | dependency status | weight |
| ------- | ------- | ----------------- | ------ |
| [@futagoza/child-process][12a] | [![release][12b]][12c] | [![dependencies][12d]][12e] | [![install size][12f]][12g] |
| [@futagoza/cli-utils][13a] | [![release][13b]][13c] | [![dependencies][13d]][13e] | [![install size][13f]][13g] |
| [@futagoza/core-js][11a] | [![release][11b]][11c] | [![dependencies][11d]][11e] | [![install size][11f]][11g] |
| [@futagoza/create-stream][14a] | [![release][14b]][14c] | [![dependencies][14d]][14e] | [![install size][14f]][14g] |
| [@futagoza/node-run][16a] | [![release][16b]][16c] | [![dependencies][16d]][16e] | [![install size][16f]][16g] |
| [@futagoza/publish-package][15a] | [![release][15b]][15c] | [![dependencies][15d]][15e] | [![install size][15f]][15g] |
| [@futagoza/pump][17a] | [![release][17b]][17c] | [![dependencies][17d]][17e] | [![install size][17f]][17g] |
| [@futagoza/sync-yarn-workspaces][18a] | [![release][18b]][18c] | [![dependencies][18d]][18e] | [![install size][18f]][18g] |
| [cm][01a] | [![release][01b]][01c] | [![dependencies][01d]][01e] | [![install size][01f]][01g] |
| [runasync][02a] | [![release][02b]][02c] | [![dependencies][02d]][02e] | [![install size][02f]][02g] |

<!-- @futagoza/child-process -->
[12a]: https://github.com/futagoza/cm/tree/master/packages/@futagoza/child-process
[12b]: https://img.shields.io/npm/v/@futagoza/child-process.svg
[12c]: https://www.npmjs.com/package/@futagoza/child-process
[12d]: https://img.shields.io/david/futagoza/cm.svg?path=packages/@futagoza/child-process
[12e]: https://david-dm.org/futagoza/cm?path=packages/@futagoza/child-process
[12f]: https://packagephobia.now.sh/badge?p=@futagoza/child-process
[12g]: https://packagephobia.now.sh/result?p=@futagoza/child-process

<!-- @futagoza/cli-utils -->
[13a]: https://github.com/futagoza/cm/tree/master/packages/@futagoza/cli-utils
[13b]: https://img.shields.io/npm/v/@futagoza/cli-utils.svg
[13c]: https://www.npmjs.com/package/@futagoza/cli-utils
[13d]: https://img.shields.io/david/futagoza/cm.svg?path=packages/@futagoza/cli-utils
[13e]: https://david-dm.org/futagoza/cm?path=packages/@futagoza/cli-utils
[13f]: https://packagephobia.now.sh/badge?p=@futagoza/cli-utils
[13g]: https://packagephobia.now.sh/result?p=@futagoza/cli-utils

<!-- @futagoza/core-js -->
[11a]: https://github.com/futagoza/cm/tree/master/packages/@futagoza/core-js
[11b]: https://img.shields.io/npm/v/@futagoza/core-js.svg
[11c]: https://www.npmjs.com/package/@futagoza/core-js
[11d]: https://img.shields.io/david/futagoza/cm.svg?path=packages/@futagoza/core-js
[11e]: https://david-dm.org/futagoza/cm?path=packages/@futagoza/core-js
[11f]: https://packagephobia.now.sh/badge?p=@futagoza/core-js
[11g]: https://packagephobia.now.sh/result?p=@futagoza/core-js

<!-- @futagoza/create-stream -->
[14a]: https://github.com/futagoza/cm/tree/master/packages/@futagoza/create-stream
[14b]: https://img.shields.io/npm/v/@futagoza/create-stream.svg
[14c]: https://www.npmjs.com/package/@futagoza/create-stream
[14d]: https://img.shields.io/david/futagoza/cm.svg?path=packages/@futagoza/create-stream
[14e]: https://david-dm.org/futagoza/cm?path=packages/@futagoza/create-stream
[14f]: https://packagephobia.now.sh/badge?p=@futagoza/create-stream
[14g]: https://packagephobia.now.sh/result?p=@futagoza/create-stream

<!-- @futagoza/node-run -->
[16a]: https://github.com/futagoza/cm/tree/master/packages/@futagoza/node-run
[16b]: https://img.shields.io/npm/v/@futagoza/node-run.svg
[16c]: https://www.npmjs.com/package/@futagoza/node-run
[16d]: https://img.shields.io/david/futagoza/cm.svg?path=packages/@futagoza/node-run
[16e]: https://david-dm.org/futagoza/cm?path=packages/@futagoza/node-run
[16f]: https://packagephobia.now.sh/badge?p=@futagoza/node-run
[16g]: https://packagephobia.now.sh/result?p=@futagoza/node-run

<!-- @futagoza/publish-package -->
[15a]: https://github.com/futagoza/cm/tree/master/packages/@futagoza/publish-package
[15b]: https://img.shields.io/npm/v/@futagoza/publish-package.svg
[15c]: https://www.npmjs.com/package/@futagoza/publish-package
[15d]: https://img.shields.io/david/futagoza/cm.svg?path=packages/@futagoza/publish-package
[15e]: https://david-dm.org/futagoza/cm?path=packages/@futagoza/publish-package
[15f]: https://packagephobia.now.sh/badge?p=@futagoza/publish-package
[15g]: https://packagephobia.now.sh/result?p=@futagoza/publish-package

<!-- @futagoza/pump -->
[17a]: https://github.com/futagoza/cm/tree/master/packages/@futagoza/pump
[17b]: https://img.shields.io/npm/v/@futagoza/pump.svg
[17c]: https://www.npmjs.com/package/@futagoza/pump
[17d]: https://img.shields.io/david/futagoza/cm.svg?path=packages/@futagoza/pump
[17e]: https://david-dm.org/futagoza/cm?path=packages/@futagoza/pump
[17f]: https://packagephobia.now.sh/badge?p=@futagoza/pump
[17g]: https://packagephobia.now.sh/result?p=@futagoza/pump

<!-- @futagoza/sync-yarn-workspaces -->
[18a]: https://github.com/futagoza/cm/tree/master/packages/@futagoza/sync-yarn-workspaces
[18b]: https://img.shields.io/npm/v/@futagoza/sync-yarn-workspaces.svg
[18c]: https://www.npmjs.com/package/@futagoza/sync-yarn-workspaces
[18d]: https://img.shields.io/david/futagoza/cm.svg?path=packages/@futagoza/sync-yarn-workspaces
[18e]: https://david-dm.org/futagoza/cm?path=packages/@futagoza/sync-yarn-workspaces
[18f]: https://packagephobia.now.sh/badge?p=@futagoza/sync-yarn-workspaces
[18g]: https://packagephobia.now.sh/result?p=@futagoza/sync-yarn-workspaces

<!-- cm -->
[01a]: https://github.com/futagoza/cm/tree/master/packages/cm
[01b]: https://img.shields.io/npm/v/cm.svg
[01c]: https://www.npmjs.com/package/cm
[01d]: https://img.shields.io/david/futagoza/cm.svg?path=packages/cm
[01e]: https://david-dm.org/futagoza/cm?path=packages/cm
[01f]: https://packagephobia.now.sh/badge?p=cm
[01g]: https://packagephobia.now.sh/result?p=cm

<!-- runasync -->
[02a]: https://github.com/futagoza/cm/tree/master/packages/runasync
[02b]: https://img.shields.io/npm/v/runasync.svg
[02c]: https://www.npmjs.com/package/runasync
[02d]: https://img.shields.io/david/futagoza/cm.svg?path=packages/runasync
[02e]: https://david-dm.org/futagoza/cm?path=packages/runasync
[02f]: https://packagephobia.now.sh/badge?p=runasync
[02g]: https://packagephobia.now.sh/result?p=runasync

## Documentation

You'll find the documentation (if any) for each package in their [respective directories](https://github.com/futagoza/cm/tree/master/packages) and/or `README.md` file.

## Package bundlers

It is recommended to use a package (or if you prefer, _web application_) bundler in your projects build setup, so that you can cherry pick the modules you want to use from these packages via imports (that's what I made them for 😄). I recommend using one of these three:

* [Rollup](https://rollupjs.org/)
* [Browserify](http://browserify.org/)
* [Webpack](https://webpack.js.org/)

## History

The package's in this repository simply started as single file utility modules that I copy-pasted into other projects whenever I needed them. In 2012 I decided to make a dedicated package on NPM (first [common](https://www.npmjs.com/package/comman), later [cm](https://www.npmjs.com/package/cm)) that I would just include via the `dependencies` field in my `package.json` files, but in less then a year it became a hassle to maintain as I wasn't the type to manage multiple projects. That has changed since late 2017 when I was able to give more time to some of my local projects; not to mention I'm really starting to need a set of central utility packages, so here's for attempt 5 🍺

## License

Copyright © 2019 Futago-za Ryuu, [https://github.com/futagoza](https://github.com/futagoza)<br>
Released under the MIT License, [http://opensource.org/licenses/MIT](http://opensource.org/licenses/MIT).
