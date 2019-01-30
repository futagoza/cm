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
| [cm][011] | [![release][012]][013] | [![dependencies][014]][015] | [![install size][016]][017] |
| [@futagoza/child-process][031] | [![release][032]][033] | [![dependencies][034]][035] | [![install size][036]][037] |
| [@futagoza/core-js][021] | [![release][022]][023] | [![dependencies][024]][025] | [![install size][026]][027] |

<!-- cm -->
[011]: https://github.com/futagoza/cm/tree/master/packages/cm
[012]: https://img.shields.io/npm/v/cm.svg
[013]: https://www.npmjs.com/package/cm
[014]: https://img.shields.io/david/futagoza/cm.svg?path=packages/cm
[015]: https://david-dm.org/futagoza/cm?path=packages/cm
[016]: https://packagephobia.now.sh/badge?p=cm
[017]: https://packagephobia.now.sh/result?p=cm

<!-- @futagoza/child-process -->
[031]: https://github.com/futagoza/cm/tree/master/packages/child-process
[032]: https://img.shields.io/npm/v/@futagoza/child-process.svg
[033]: https://www.npmjs.com/package/@futagoza/child-process
[034]: https://img.shields.io/david/futagoza/cm.svg?path=packages/child-process
[035]: https://david-dm.org/futagoza/cm?path=packages/child-process
[036]: https://packagephobia.now.sh/badge?p=@futagoza/child-process
[037]: https://packagephobia.now.sh/result?p=@futagoza/child-process

<!-- @futagoza/core-js -->
[021]: https://github.com/futagoza/cm/tree/master/packages/@futagoza/core-js
[022]: https://img.shields.io/npm/v/@futagoza/core-js.svg
[023]: https://www.npmjs.com/package/@futagoza/core-js
[024]: https://img.shields.io/david/futagoza/cm.svg?path=packages/@futagoza/core-js
[025]: https://david-dm.org/futagoza/cm?path=packages/@futagoza/core-js
[026]: https://packagephobia.now.sh/badge?p=@futagoza/core-js
[027]: https://packagephobia.now.sh/result?p=@futagoza/core-js

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
