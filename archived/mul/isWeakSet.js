"use strict";

const represents = require( "./object.represents" );

/**
 * Checks if the given `value` is a WeakSet object.
 * 
 * @param {*} value The object to check.
 */

function isWeakSet( value ) {

    return represents( value, "[object WeakSet]" );

}

module.exports = isWeakSet;
