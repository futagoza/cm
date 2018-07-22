[![Build status](https://img.shields.io/travis/futagoza/cm.svg)](https://travis-ci.org/futagoza/cm)
[![npm version](https://img.shields.io/npm/v/cm.svg)](https://www.npmjs.com/package/cm)
[![devDependencies](https://img.shields.io/david/dev/futagoza/cm.svg)](https://david-dm.org/futagoza/cm#info=devDependencies)
[![License](https://img.shields.io/badge/license-mit-blue.svg)](https://opensource.org/licenses/MIT)

This is a collection of classes and functions usable in [Node.js v4+](https://nodejs.org/en/blog/release/v4.0.0/) enviroments,
with a selected subset of these usable in most ES5 compatible browsers.

# table of contents

<!-- toc -->

- [about cm](#about-cm)
- [install](#install)
  * [node.js module](#nodejs-module)
  * [development version](#development-version)
- [features](#features)
- [documentation](#documentation)
- [links](#links)
- [license](#license)

<!-- tocstop -->

# about cm

All source code for this module is written in ES2017+, and transpiled by [Babel 6](https://babeljs.io/) to Node.js v4 compatible JavaScript. A subset of the functions and classes are transpiled using [rollup.js](https://rollupjs.org/) to ES5 compatible JavaScript usable in most browsers availible after 2010.

# install

## node.js module

```shell
npm install --save-dev cm
```

## development version

```shell
git clone https://github.com/futagoza/cm.git
cd cm
npm install
npm run build
```

# features

After loading the module (e.g. `const cm = require( "cm" )`), you can use _(api "module" - description)_:

* cm.command `"cm/command"` - a set of functions to interact with the cli
* cm.parseArgv `"cm/command/parser"` - a simple but elegant argv parser
* cm.console `"cm/console"` - `clearLine`, `echo` and `print` functions (Node.js only)
* cm.Debugger `"cm/debug"` - a class that simplfies debugging (by default, Node.js only)
* cm.Signal `"cm/events/signal"` - a single event without any name, simple and fast
* cm.EventDispatcher `"cm/events/dispatcher"` -  a simplified but fast version of EventEmitter
* cm.EventEmitter `"cm/events"` - a Node.js complient event emitter that should be faster
* cm.filesystem `"cm/filesystem"` -  a collection of functions and classes for `fs` and `path` manipulation (Node.js only)
* cm.Walker `"cm/filesystem/walker"` - a filesystem tree walker (Node.js only)
* cm.Option `"cm/options/option"` - a class that wraps a single object for use as a option
* cm.OptManager `"cm/options"` - a option manager that simplfies interaction with multiple types of options
* cm.request `"cm/http/request"` - get a page or file from a remote server (Node.js only)
* cm.deliver `"cm/http/deliver"` - send a file to a remote server (Node.js only)
* cm.std `"cm/std"` - an extension/superset of the JavaScript standered library
* cm.system `"cm/system"` - information about the JavaScript enviroment
* cm.util `"cm/util"` - various functions for misc tasks

# documentation

The documentation for this module is automatically generated by [JSDoc v3](http://usejsdoc.org/), inlining details from both
the `dist/package.json` and `README.md`. You can find the html documentation within the published module in the `docs` folder.

# links

* Release: [https://www.npmjs.com/package/cm](https://www.npmjs.com/package/cm)<br>
* Source: [https://github.com/futagoza/cm](https://github.com/futagoza/cm)<br>
* Issues: [https://github.com/futagoza/cm/issues](https://github.com/futagoza/cm/issues)<br>
* Travis: [https://travis-ci.org/futagoza/cm](https://travis-ci.org/futagoza/cm)

# license

Copyright © 2012-2018 Futago-za Ryuu, [https://github.com/futagoza](https://github.com/futagoza)<br>
Released under the MIT License, [http://opensource.org/licenses/MIT](http://opensource.org/licenses/MIT).
