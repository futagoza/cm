"use strict";

const __hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Get a list of values from the given object.
 * 
 * This return's an array like `Array#map` does, but the transformer method
 * is optional, so at the same time behave's like ES2015's `Object.values`.
 *
 * @since 1.0.0-alpha.0
 * @param {{}} object The object you wish to change whose values you want
 * @param {Function} [transformer] A function to call when changing each property (Optional)
 * @returns {Array} A list of values from `object`.
 */
function values( object, transformer ) {

    const target = [];
    let index = -1;
    let key, value;

    for ( key in object ) {

        if ( ! __hasOwnProperty.call( object, key ) ) continue;
        value = object[ key ];

        target[ ++index ] = transformer
            ? transformer( value, key )
            : value;

    }

    return target;

}

module.exports = values;
