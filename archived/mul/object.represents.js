"use strict";

const __toString = Object.prototype.toString;

/**
 * Is a wrapper around `Object.prototype.toString` that returns `true` if:
 * 
 * - `value` is not nullish
 * - `value` has a native JavaScript string representation
 * - the string representation matches `type`
 * 
 * @param {*} value The object to check.
 * @param {string} [type] The object type's string representation.
 * @returns {boolean|string} Will return a `boolean` if _type_ is given, otherwise a `string`
 */

function represents( value, type ) {

    if ( value == null ) return false;

    if ( type == null ) return __toString.call( value );

    return __toString.call( value ) === type;

}

module.exports = represents;
