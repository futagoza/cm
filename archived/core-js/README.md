This module contains [ponyfill's](https://ponyfill.com/) for some native ES2017+ built-in methods, and are meant to be used with packages on Node.js v6 or higher, but can also be used in the browser via [Babel](https://babeljs.io/) and a package (or if you prefer, _web application_) bundler.

## api

- ES2017
  * [@futagoza/core-js/object.entries](./object.entries.js)
  * [@futagoza/core-js/object.values](./object.values.js)
- Stage 3
  * [@futagoza/core-js/array.flat](./array.flat.js)
  * [@futagoza/core-js/array.flatMap](./array.flatMap.js)
  * [@futagoza/core-js/object.fromEntries](./object.fromEntries.js)
- Stage 1
  * [@futagoza/core-js/array.lastIndex](./array.lastIndex.js)
  * [@futagoza/core-js/array.lastItem](./array.lastItem.js)
  * [@futagoza/core-js/math.clamp](./math.clamp.js)
  * [@futagoza/core-js/math.DEG_PER_RAD](./math.DEG_PER_RAD.js)
  * [@futagoza/core-js/math.degrees](./math.degrees.js)
  * [@futagoza/core-js/math.fscale](./math.fscale.js)
  * [@futagoza/core-js/math.RAD_PER_DEG](./math.RAD_PER_DEG.js)
  * [@futagoza/core-js/math.radians](./math.radians.js)
  * [@futagoza/core-js/math.scale](./math.scale.js)

## resources

Some of the code and/or documentation in these files is based on the following resources:

- https://github.com/es-shims/Array.prototype.flat/
- https://github.com/es-shims/Array.prototype.flatMap/
- https://github.com/rwaldron/proposal-math-extensions/tree/master/reference-implementation
- https://github.com/tc39/proposal-object-values-entries
- https://github.com/es-shims/Object.entries
- https://github.com/tc39/proposal-object-from-entries
- https://github.com/ljharb/es-abstract/
- https://github.com/zloirock/core-js/tree/master/packages/core-js/modules
- https://developer.mozilla.org/
- TypeScript's [lib.es6.d.ts](https://github.com/Microsoft/TypeScript/tree/master/src/lib) file

## copyright

Copyright © 2018+ Futago-za Ryuu<br />
Released under the MIT License
