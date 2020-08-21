"use strict";

const hasOwnProperty = Object.prototype.hasOwnProperty;
const propertyIsEnumerable = Object.prototype.propertyIsEnumerable;

/**
 * Returns an array containing all the values from the given `object`.
 * 
 * @specification ES2017 (ES8)
 * @since 1.0.0-alpha.0
 * @param {{}} object An object
 * @returns {Array} An array of values
 */
function values( object ) {

    const result = [];

    if ( object == null ) return result;
    const source = Object( object );

    for ( const key in source ) {

        if ( ! hasOwnProperty.call( source, key ) ) continue;
        if ( ! propertyIsEnumerable.call( source, key ) ) continue;

        result[ result.length ] = source[ key ];

    }

    return result;

}

module.exports = values;
