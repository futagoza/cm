"use strict";

const represents = require( "./object.represents" );

/**
 * Will confirm if the given `value` is a plain JavaScript Error value.
 * 
 * @param {*} value The object to check.
 */

function isError( value ) {

    return represents( value, "[object Error]" );

}

module.exports = isError;
