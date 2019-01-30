[![Build status](https://img.shields.io/travis/futagoza/cm.svg)](https://travis-ci.org/futagoza/cm)
[![License](https://img.shields.io/badge/license-mit-blue.svg)](https://opensource.org/licenses/MIT)

This is a collection of modules usable in [Node.js v6+](https://nodejs.org/en/blog/release/v6.0.0/) environments, with a selected subset of these packages usable in most browsers via [Babel](https://babeljs.io/) and [package bundlers](#package-bundlers). 

# table of contents

- [install](#install)
  * [cm packages](#cm-packages)
  * [repository](#repository)
- [packages](#packages)
- [documentation](#documentation)
- [package bundlers](#package-bundlers)
- [history](#history)
- [links](#links)
- [license](#license)

# install

## cm packages

I recommend adding any package from this repo to your `dependencies` field in your `package.json` for most cases, but if you plan to develop a package for the browser and your using a [package bundler](#package-bundlers), add them to your `devDependencies` field instead.

## repository

Your going to need [Git](https://git-scm.com/), [Yarn](https://yarnpkg.com/) and [Node.js v6+](https://nodejs.org/)

```shell
git clone https://github.com/futagoza/cm.git
cd cm
yarn install
```

# packages

| package | npm version |
| ------- | ----------- |
| [@futagoza/core-js](https://github.com/futagoza/cm/tree/master/packages/@futagoza/core-js) | [![npm](https://img.shields.io/npm/v/@futagoza/core-js.svg)](https://www.npmjs.com/package/@futagoza/core-js) |

# documentation

You'll find the documentation (if any) for each package in their [respective directories](https://github.com/futagoza/cm/tree/master/packages) and/or `README.md` file.

# package bundlers

It is recommended to use a package (or if you prefer, _web application_) bundler in your projects build setup, so that you can cherry pick the modules you want to use from these packages via imports (that's what I made them for 😄). I recommend using one of these four:

* [Rollup](https://rollupjs.org/)
* [Browserify](http://browserify.org/)
* [Parcel](https://parceljs.org/)
* [Webpack](https://webpack.js.org/)

# history

The package's in this repository simply started as single file utility modules that I copy-pasted into other projects whenever I needed them. In 2012 I decided to make a dedicated package on NPM (first [common](https://www.npmjs.com/package/comman), then [cm](https://www.npmjs.com/package/cm)) that I would just include via the `dependencies` field in my `package.json` files, but in less then a year that became a hassle to maintain as I wasn't the type to manage multiple projects. That has changed over the last year (2018+), and I'm really starting to need a set of central utility packages, so here's for attempt 5 🍺

# links

* Release: [https://www.npmjs.com/org/futagoza](https://www.npmjs.com/org/futagoza)
* Source: [https://github.com/futagoza/cm/tree/master/packages](https://github.com/futagoza/cm/tree/master/packages)
* Issues: [https://github.com/futagoza/cm/issues](https://github.com/futagoza/cm/issues)
* Travis: [https://travis-ci.org/futagoza/cm](https://travis-ci.org/futagoza/cm)

# license

Copyright © 2019 Futago-za Ryuu, [https://github.com/futagoza](https://github.com/futagoza)<br>
Released under the MIT License, [http://opensource.org/licenses/MIT](http://opensource.org/licenses/MIT).
