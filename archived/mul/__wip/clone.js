"use strict";

const cloneArray = require( "./array.clone" );
const cloneObject = require( "./object.clone" );

/**
 * Produce's a shallow clone of the given array, array-like or object.
 *
 * @since 1.0.0-alpha.0
 * @param {Array|{}} source An array, array-like or object.
 * @returns {Array|{}} A copy of `source`.
 */
function clone( source ) {

    if ( source == null ) return void 0;

    return cloneArray( source ) || cloneObject( source );

}

module.exports = clone;
