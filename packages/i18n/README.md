> module only package for native ES2022+ use

A simple and easy way to use language internationalization; developed for use in library (api) packages but should work without problems for other use cases (e.g. console, frontends).

## Usage

```js
import i18n from "@futagoza/i18n"

// or with utils

import * as i18n from "@futagoza/i18n"
import { i18n, /* see utils API below for what is available */ } from "@futagoza/i18n"

// simple example

import enLocale from "@futagoza/i18n/locales/en.js"
// export default {
//     // ...
//     "ARGUMENT_MUST_BE_A_STRING": "The $0 argument passed to `$1` must be a valid string",
//     // ...
// }

const _t = i18n( "@futagoza/i18n", {
    en: enLocale,
    eng: enLocale,
    // ...etc
} )

_t( "ARGUMENT_MUST_BE_A_STRING", "1st", "@futagoza/i18n#i18n" )
// The 1st argument passed to `@futagoza/i18n#i18n` must be a valid string
```

## Main API

> i18n( library, locales )

Register many locales (e.g. `{ en: { ...engMessages }, jp: { ...jpnMessages } }`) all at once for `library`

A function will be returned (with the type signature of `(id: string | number | symbol, ...args?: string[]) => string`) that retrieves (and formats) the requested message from `library/locale` with the locale being the synced locale language for all libraries (assigned at `i18n.language`); to get a message from a specific language locale use the utility method `ResolveMessage`

> i18n.language

Synced locale language for all libraries that use `i18n()( ...args )`; by default this is `en`

## Utils API

> isLibrary( library )

Checks if `library` is registered

> isLocale( library, language )

Checks if `library/language` is registered

> GetLocale( library, language )

Ensures the `library/language` locale exists in the shared locale store, then returns it

> SetLocale( library, language, messages )

Add's messages to the given `library/language` locale.

```js
SetLocale( "@futagoza/i18n", "en", enLocale )
```

_**NOTE:** This basically performs a merge, SO IT WILL OVERWRITE ANY PREVIOUSLY STORED MESSAGE(s) THAT HAVE THE SAME ID/KEY_

> FormatMessage( message, replacements )

Will perform `message.replaceAll` for each property in `replacements`:

```js
const message = "{greeting} there _NAME_"
const replacements = {
    "{greeting}": "Hi",
    "_NAME_": "😊",
}
FormatMessage( message, replacements ) // Hi there 😊
```

If `replacements` is an array, will auto-generate keys based on array index prefixed with `$`:

```js
FormatMessage( "$0 there", [ "Hi" ] ) // Hi there
```

> ResolveMessage( library, language, id, defaultValue? )

Retrive message from the asked `library/language` locale; otherwise return `defaultValue` if provided.
