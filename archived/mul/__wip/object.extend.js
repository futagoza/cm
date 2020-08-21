"use strict";

const __hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * This method add's properties from `source` to `target`, but only if they don't already
 * exist. It is more similar to how a native class is exteneded then the native `Object.assign`.
 *
 * @since 1.0.0-alpha.0
 * @param {{}} target The object you wish to extend
 * @param {{}} source The object whose properties you want
 * @returns {void}
 */
function extend( target, source ) {

    for ( const key in source ) {

        if ( ! __hasOwnProperty.call( source, key ) ) continue;
        if ( __hasOwnProperty.call( target, key ) ) continue;

        target[ key ] = source[ key ];

    }

}

module.exports = extend;
