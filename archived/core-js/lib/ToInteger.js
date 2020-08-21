"use strict";

const GetSignedOne = require( "./GetSignedOne" );
const ToNumber = require( "./ToNumber" );
const isFinite = Number.isFinite;
const { abs, floor } = Math;

/**
 * > _THIS API IS NOT MEANT FOR PUBLIC CONSUMPTION_
 *
 * Always returns an `integer` number, even if it's a passed a stringed `float`.
 * 
 * Based on `es-abstract/es5.js` -> `ToInteger` method.
 * 
 * @param {String|Number} V A numerical value (string or number)
 * @returns {Number} The integer value.
 */
function ToInteger( V ) {

    const value = ToNumber( V );

    if ( value === 0 || ! isFinite( value ) ) return value;

    return GetSignedOne( value ) * floor( abs( value ) );

}

module.exports = ToInteger;
