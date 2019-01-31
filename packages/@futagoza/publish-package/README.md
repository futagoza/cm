A 'npm/yarn publish' API wrapper with my preferred defaults that returns a promise.

* api based, so you can call from your scripts, but spawns the actual commands
* run either Yarn (`option.yarn = true`) or NPM (default)
* perfect for embedding into your build scripts (Gulp anyone?)
* `--access public` by default (publishing scoped packages is simpler)
* optionally checks if package version is already on NPM

### example

```js
const publish = require( "@futagoza/publish-package" );

publish( __dirname, { checkVersion: true } )
    .catch( details => {

        console.error( details.stderr );
        process.exit( 1 );

    } )
    .then( () => console.log( "Yahoo!" ) );
```

### options

```ts
function publish( path?: string, options: {} ): Promise;
```

| api option | npm/yarn cli option | description |
| ---------- | ------------------- | ---------------- |
| access | --access _scope_ | See [https://docs.npmjs.com/cli/publish][1] |
| checkVersion | | Will check on NPM before publishing |
| dir | | Alternative to the _path_ argument<sub>1</sub> |
| dry-run | --dry-run | See [https://docs.npmjs.com/cli/publish][1] |
| dry | --dry-run | Alias for _dry-run_ |
| dryRun | --dry-run | Alias for _dry-run_ |
| folder | | Alternative to the _path_ argument<sub>1</sub> |
| log | | An optional logging function<sub>2</sub> |
| new-version | --new-version _value_ | See [https://yarnpkg.com/lang/en/docs/cli/publish/][2] |
| newVersion | --new-version _value_ | Alias for _new-version_ |
| otp | --otp _value_ | See [https://docs.npmjs.com/cli/publish][1] |
| otpcode | --otp _value_ | Alias for _otp_ |
| path | | Alternative to the _path_ argument<sub>1</sub> |
| private | --access _restricted_ | If `true`, uses `--access restricted` |
| public | --access _public_ | If `true`, uses `--access public` (default) |
| scoped | --access _public_ | If `true`, uses `--access public` |
| registry | --registry _url_ | See [https://docs.npmjs.com/misc/registry][3] |
| reg | --registry _url_ | Alias for _registry_ |
| restricted | --access _restricted_ | If `true`, uses `--access restricted` |
| runOpts | | Option's to send to [@futagoza/node-run](https://www.npmjs.com/package/@futagoza/node-run) |
| tag | --tag _name_ | See [https://docs.npmjs.com/cli/publish][1] |
| version | --new-version _value_ | Alias for _new-version_ |
| yarn | | Will use `yarn publish` instead of `npm publish` |

1. Can be used in place of path (e.g. `publish( { dir: ... } )`)
2. Check `defaultLogger` in [@futagoza/gulp-publish-package/index.js](https://github.com/futagoza/gulp/blob/master/plugins/gulp-publish-package/index.js) for an example

**NOTE:** To circumvent an issue with running `npm publish` from a `yarn run ...` command, the registry option is set to _https://registry.npmjs.org/_ by default when running `npm publish` only, otherwise it is only included when specified.

-----

[![History](https://img.shields.io/badge/github.com/futagoza/cm-changelog-yellow.svg)](https://github.com/futagoza/cm/blob/master/CHANGELOG.md)
[![license](https://img.shields.io/badge/license-mit-blue.svg)](https://opensource.org/licenses/MIT)

_@futagoza/publish-package_ is Copyright (c) 2018+ Futago-za Ryuu

[1]: https://docs.npmjs.com/cli/publish
[2]: https://yarnpkg.com/lang/en/docs/cli/publish/
[3]: https://docs.npmjs.com/misc/registry
