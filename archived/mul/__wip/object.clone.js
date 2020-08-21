"use strict";

const __hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Produce's a shallow clone of the given object's properties.
 *
 * @since 1.0.0-alpha.0
 * @param {{}} source An object with properties.
 * @returns {{}} A plain object with properties from the orignal object.
 */
function clone( source ) {

    const target = {};

    for ( const key in source ) {

        if ( ! __hasOwnProperty.call( source, key ) ) continue;
        target[ key ] = source[ key ];

    }

    return target;

}

module.exports = clone;
