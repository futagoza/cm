"use strict";

const hasOwnProperty = Object.prototype.hasOwnProperty;
const propertyIsEnumerable = Object.prototype.propertyIsEnumerable;

/**
 * Returns an array of key/value pairs that can be used with `for..of`.
 * 
 * @specification ES2017 (ES8)
 * @since 1.0.0-alpha.0
 * @param {{}} value An object
 * @returns {Array} An array
 */
function entries( value ) {

    const target = [];

    if ( value == null ) return target;
    const source = Object( value );

    for ( const key in source ) {

        if ( ! hasOwnProperty.call( source, key ) ) continue;
        if ( ! propertyIsEnumerable.call( source, key ) ) continue;

        target[ target.length ] = [ key, source[ key ] ];

    }

    return target;

}

module.exports = entries;
