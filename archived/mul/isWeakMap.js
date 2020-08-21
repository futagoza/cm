"use strict";

const represents = require( "./object.represents" );

/**
 * Checks if the given `value` is a WeakMap object.
 * 
 * @param {*} value The object to check.
 */

function isWeakMap( value ) {

    return represents( value, "[object WeakMap]" );

}

module.exports = isWeakMap;
