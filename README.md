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
| [@futagoza/cli-utils][041] | [![release][042]][043] | [![dependencies][044]][045] | [![install size][046]][047] |
| [@futagoza/core-js][021] | [![release][022]][023] | [![dependencies][024]][025] | [![install size][026]][027] |
| [@futagoza/create-stream][051] | [![release][052]][053] | [![dependencies][054]][055] | [![install size][056]][057] |
| [@futagoza/node-run][071] | [![release][072]][073] | [![dependencies][074]][075] | [![install size][076]][077] |
| [@futagoza/publish-package][061] | [![release][062]][063] | [![dependencies][064]][065] | [![install size][066]][067] |
| [@futagoza/pump][081] | [![release][082]][083] | [![dependencies][084]][085] | [![install size][086]][087] |
| [@futagoza/sync-yarn-workspaces][091] | [![release][092]][093] | [![dependencies][094]][095] | [![install size][096]][097] |

<!-- cm -->
[011]: https://github.com/futagoza/cm/tree/master/packages/cm
[012]: https://img.shields.io/npm/v/cm.svg
[013]: https://www.npmjs.com/package/cm
[014]: https://img.shields.io/david/futagoza/cm.svg?path=packages/cm
[015]: https://david-dm.org/futagoza/cm?path=packages/cm
[016]: https://packagephobia.now.sh/badge?p=cm
[017]: https://packagephobia.now.sh/result?p=cm

<!-- @futagoza/child-process -->
[031]: https://github.com/futagoza/cm/tree/master/packages/@futagoza/child-process
[032]: https://img.shields.io/npm/v/@futagoza/child-process.svg
[033]: https://www.npmjs.com/package/@futagoza/child-process
[034]: https://img.shields.io/david/futagoza/cm.svg?path=packages/@futagoza/child-process
[035]: https://david-dm.org/futagoza/cm?path=packages/@futagoza/child-process
[036]: https://packagephobia.now.sh/badge?p=@futagoza/child-process
[037]: https://packagephobia.now.sh/result?p=@futagoza/child-process

<!-- @futagoza/cli-utils -->
[041]: https://github.com/futagoza/cm/tree/master/packages/@futagoza/cli-utils
[042]: https://img.shields.io/npm/v/@futagoza/cli-utils.svg
[043]: https://www.npmjs.com/package/@futagoza/cli-utils
[044]: https://img.shields.io/david/futagoza/cm.svg?path=packages/@futagoza/cli-utils
[045]: https://david-dm.org/futagoza/cm?path=packages/@futagoza/cli-utils
[046]: https://packagephobia.now.sh/badge?p=@futagoza/cli-utils
[047]: https://packagephobia.now.sh/result?p=@futagoza/cli-utils

<!-- @futagoza/core-js -->
[021]: https://github.com/futagoza/cm/tree/master/packages/@futagoza/core-js
[022]: https://img.shields.io/npm/v/@futagoza/core-js.svg
[023]: https://www.npmjs.com/package/@futagoza/core-js
[024]: https://img.shields.io/david/futagoza/cm.svg?path=packages/@futagoza/core-js
[025]: https://david-dm.org/futagoza/cm?path=packages/@futagoza/core-js
[026]: https://packagephobia.now.sh/badge?p=@futagoza/core-js
[027]: https://packagephobia.now.sh/result?p=@futagoza/core-js

<!-- @futagoza/create-stream -->
[051]: https://github.com/futagoza/cm/tree/master/packages/@futagoza/create-stream
[052]: https://img.shields.io/npm/v/@futagoza/create-stream.svg
[053]: https://www.npmjs.com/package/@futagoza/create-stream
[054]: https://img.shields.io/david/futagoza/cm.svg?path=packages/@futagoza/create-stream
[055]: https://david-dm.org/futagoza/cm?path=packages/@futagoza/create-stream
[056]: https://packagephobia.now.sh/badge?p=@futagoza/create-stream
[057]: https://packagephobia.now.sh/result?p=@futagoza/create-stream

<!-- @futagoza/node-run -->
[071]: https://github.com/futagoza/cm/tree/master/packages/@futagoza/node-run
[072]: https://img.shields.io/npm/v/@futagoza/node-run.svg
[073]: https://www.npmjs.com/package/@futagoza/node-run
[074]: https://img.shields.io/david/futagoza/cm.svg?path=packages/@futagoza/node-run
[075]: https://david-dm.org/futagoza/cm?path=packages/@futagoza/node-run
[076]: https://packagephobia.now.sh/badge?p=@futagoza/node-run
[077]: https://packagephobia.now.sh/result?p=@futagoza/node-run

<!-- @futagoza/publish-package -->
[061]: https://github.com/futagoza/cm/tree/master/packages/@futagoza/publish-package
[062]: https://img.shields.io/npm/v/@futagoza/publish-package.svg
[063]: https://www.npmjs.com/package/@futagoza/publish-package
[064]: https://img.shields.io/david/futagoza/cm.svg?path=packages/@futagoza/publish-package
[065]: https://david-dm.org/futagoza/cm?path=packages/@futagoza/publish-package
[066]: https://packagephobia.now.sh/badge?p=@futagoza/publish-package
[067]: https://packagephobia.now.sh/result?p=@futagoza/publish-package

<!-- @futagoza/pump -->
[081]: https://github.com/futagoza/cm/tree/master/packages/@futagoza/pump
[082]: https://img.shields.io/npm/v/@futagoza/pump.svg
[083]: https://www.npmjs.com/package/@futagoza/pump
[084]: https://img.shields.io/david/futagoza/cm.svg?path=packages/@futagoza/pump
[085]: https://david-dm.org/futagoza/cm?path=packages/@futagoza/pump
[086]: https://packagephobia.now.sh/badge?p=@futagoza/pump
[087]: https://packagephobia.now.sh/result?p=@futagoza/pump

<!-- @futagoza/sync-yarn-workspaces -->
[101]: https://github.com/futagoza/cm/tree/master/packages/@futagoza/sync-yarn-workspaces
[102]: https://img.shields.io/npm/v/@futagoza/sync-yarn-workspaces.svg
[103]: https://www.npmjs.com/package/@futagoza/sync-yarn-workspaces
[104]: https://img.shields.io/david/futagoza/cm.svg?path=packages/@futagoza/sync-yarn-workspaces
[105]: https://david-dm.org/futagoza/cm?path=packages/@futagoza/sync-yarn-workspaces
[106]: https://packagephobia.now.sh/badge?p=@futagoza/sync-yarn-workspaces
[107]: https://packagephobia.now.sh/result?p=@futagoza/sync-yarn-workspaces

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
