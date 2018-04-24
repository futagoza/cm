"use strict";

/*
    $ node scripts/crlf-to-lf <dir>

        <dir> directory to fix (defaults to ".")

    1. Confirm `<dir>` is a directory
    2. Read content of `<dir>` into `Array<String, fs.Stat>`
    3. Filter out any root files and the `node_modules` folder
    4. On each: generate full path
    5. On each: run `linefix ...`
*/
