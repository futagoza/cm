"use strict";

const __hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Will create a new object that contains the properties of all the given objects.
 *
 * @since 1.0.0-alpha.0
 * @param {...{}} args The _source_ objects
 * @returns {{}} The newly created object
 */
function merge() {

    const target = {};
    const argc = arguments.length;
    let source, key;

    for ( let i = 0; i < argc; ++i ) {

        source = arguments[ i ];
        for ( key in source ) {

            if ( ! __hasOwnProperty.call( source, key ) ) continue;
            target[ key ] = source[ key ];

        }

    }

    return target;

}

module.exports = merge;
