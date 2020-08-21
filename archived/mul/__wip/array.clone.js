"use strict";

const cloneArrayLike = require( "./internal/cloneArrayLike" );
const isArrayLike = require( "./isArrayLike" );
const __slice = Array.prototype.slice;

/**
 * Produce's a shallow clone of the given array or array-like object.
 *
 * @since 1.0.0-alpha.0
 * @param {Array|{}} source An array or array-like object.
 * @returns {Array|{}} A copy of `source`.
 */
function clone( source ) {

    if ( source == null ) return void 0;

    return Array.isArray( source ) ? __slice.call( source, 0 )
        : isArrayLike( source ) ? cloneArrayLike( source )
        : void 0;

}

module.exports = clone;
