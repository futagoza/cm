"use strict";

/*
    SEMVER_NAMES: major.minor.patch(-tag(.revision)?)?
    SEMVER_REGEX: /([0-9]+)(\.[0-9]+)?(\.[0-9]+)(-[\w]+(\.[0-9]+)?)?/g

    $ node scripts/version <level> ...options

        <level>             major, minor, patch, revision or semver (defaults to "revision" or "patch")
        -s <value>          will automatically set <level> to "semver" and `-n/--value <value>` to <value>
        -n, --value <value> new value for level, ignored if `-s <value>` is given
        --tag <identifier>  an optional post-value to denote a special release

    1. If provided, confirm `<level>` is valid
    2. If `<level>` is "semver", confirm `-n/--value <value>` passes `SEMVER_REGEX` test
    3. if `-n, --value` is passed, confirm `<value>` is valid, based on what `<level>` is
    4. Create a String `const oldVersion = require( "../dist/package.json" )`
    5. Create a Object `const version = { major, minor, patch, tag, revision, value }`
    6. If `<level>` is "revision", confirm either:
        * `--tag` is set
        * `version` has a tag (with or without a revision)
    7. Update properties on `version`, then generate `version.value`
    8. Write `version.value` to `"dist/package.json"`
    9. Output `Updated version from "${ oldVersion }" to "${ version.value }"`
*/
