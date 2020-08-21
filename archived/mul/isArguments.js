"use strict";

const represents = require( "./object.represents" );

/**
 * Will confirm if the given `value` is an arguments object.
 * 
 * @param {*} value The object to check.
 */

function isArguments( value ) {

    return represents( value, "[object Arguments]" );

}

module.exports = isArguments;
