"use strict";

const represents = require( "./object.represents" );

/**
 * Checks if the given `value` is a Set object.
 * 
 * @param {*} value The object to check.
 */

function isSet( value ) {

    return represents( value, "[object Set]" );

}

module.exports = isSet;
