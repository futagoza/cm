"use strict";

const represents = require( "./object.represents" );

/**
 * Checks if the given `value` is a Map object.
 * 
 * @param {*} value The object to check.
 */

function isMap( value ) {

    return represents( value, "[object Map]" );

}

module.exports = isMap;
