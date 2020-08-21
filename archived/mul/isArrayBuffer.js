"use strict";

const represents = require( "./object.represents" );

/**
 * Will confirm if the given `value` is an ArrayBuffer value.
 * 
 * @param {*} value The object to check.
 */

function isArrayBuffer( value ) {

    return represents( value, "[object ArrayBuffer]" );

}

module.exports = isArrayBuffer;
