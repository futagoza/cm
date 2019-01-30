"use strict";

const ErrorSymbol = require( "./promise" ).Symbol;

/**
 * Confirm if the given error was thrown from a spawn'ed process.
 * 
 * @param {Error} object An error instance.
 */
function isSpawnError( object ) {

    if ( ! object ) return false;

    return object[ ErrorSymbol ] === true
        || ( object.spawnargs && object.syscall );

}

// Exports

module.exports = isSpawnError;
module.exports.default = isSpawnError;
module.exports.isSpawnError = isSpawnError;
