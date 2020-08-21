"use strict";

const isNaN = Number.isNaN;

/**
 * > _THIS API IS NOT MEANT FOR PUBLIC CONSUMPTION_
 *
 * Convert a string into a number, ensuring `NaN` is always a `0`.
 * 
 * @param {String} V The source array containing elements to copy
 * @returns {Number} An `integar` or `float` number.
 */
function ToNumber( V ) {

    const value = Number( V );

    return isNaN( value ) ? 0 : value;

}

module.exports = ToNumber;
