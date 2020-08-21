"use strict";

const isArray = Array.isArray;
const isArrayLike = require( "./isArrayLike" );
const isObject = require( "./isObject" );

/**
 * Will confirm if the given `value` is:
 * 
 * - an array
 * - an array-like object
 * - a plain JavaScript object/hash.
 *
 * @since 1.0.0-alpha.0
 * @param {*} value The object to check.
 * @returns {Boolean} Will be `true` on a iterable.
 */
function isIterable( value ) {

    return isArray( value ) || isArrayLike( value ) || isObject( value );

}

module.exports = isIterable;
