"use strict";

/* eslint-disable no-self-compare */

const isNaN = require( "./std/number.isNaN" );
const __toString = Object.prototype.toString;

/**
 * An alternative to `typeof` that uses `Object.prototype.toString` to get a string
 * representation, therefore can get a wider selection of native object types.
 *
 * @since 1.0.0-alpha.0
 * @param {*} value An object to check
 * @param {String} [target] A string representation to compare with (Optional).
 * @returns {String|Boolean} A string representation or a boolean if `target` is provided.
 */
function nameof( value, target ) {

    const typename = isNaN( value ) ? "nan"
                   : __toString.call( value ).slice( 8, -1 ).toLowerCase();

    if ( target == null ) return typename;
    if ( typeof target !== "string" ) return false;
    return typename === target.toLowerCase();

}

module.exports = nameof;
