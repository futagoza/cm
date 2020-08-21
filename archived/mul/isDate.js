"use strict";

const represents = require( "./object.represents" );

/**
 * Will confirm if the given `value` is a plain JavaScript Date value.
 * 
 * @param {*} value The object to check.
 */

function isDate( value ) {

    return represents( value, "[object Date]" );

}

module.exports = isDate;
