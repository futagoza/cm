"use strict";

const represents = require( "./object.represents" );

/**
 * Will confirm if the given `value` is a plain JavaScript object.
 * 
 * @param {*} value The object to check.
 */

function isObject( value ) {

    return represents( value, "[object Object]" );

}

module.exports = isObject;
