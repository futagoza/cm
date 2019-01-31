/* eslint-disable no-unneeded-ternary */

"use strict";

const { isSpawnError, run } = require( "@futagoza/child-process" );

// Exports

module.exports = run;
module.exports.run = run;
module.exports.isSpawnError = isSpawnError;
module.exports.default = run;
