"use strict";

const represents = require( "./object.represents" );

/**
 * Will confirm if the given `value` is a plain JavaScript RegExp.
 * 
 * @param {*} value The object to check.
 */

function isRegExp( value ) {

    return represents( value, "[object RegExp]" );

}

module.exports = isRegExp;
