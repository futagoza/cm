"use strict";

/**
 * Check if the given object is a `stream`-like object.
 * 
 * @param {*} object An instance of stream.
 */
function isStream( object ) {

    const T = typeof object;

    return object
        && ( T === "function" || T === "object" )
        && typeof object.on === "function"
        && typeof object.pipe === "function";

}

module.exports = isStream;
