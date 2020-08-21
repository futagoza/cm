"use strict";

const isArrayLike = require( "./isArrayLike" );
const isObject = require( "./isObject" );

/**
 * Will confirm if the given `value` is:
 * 
 * - an array
 * - an array-like object
 * - a plain JavaScript object.
 * 
 * @param {*} value The object to check.
 */

function isIterable( value ) {

    return Array.isArray( value )
        || isArrayLike( value )
        || isObject( value );

}

module.exports = isIterable;
