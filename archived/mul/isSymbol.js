"use strict";

const represents = require( "./object.represents" );

/**
 * Checks if the given `value` is a Symbol object.
 * 
 * @param {*} value The object to check.
 */

function isSymbol( value ) {

    return typeof value === "symbol" || represents( value, "[object Symbol]" );

}

module.exports = isSymbol;
