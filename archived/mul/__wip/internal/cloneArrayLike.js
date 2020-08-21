"use strict";

/**
 * @private
 * @param {{}} source 
 * @returns {Array}
 */
function cloneArrayLike( source ) {

    const target = [];
    const length = source.length;

    for ( let index = 0; index < length; ++index ) {

        target[ index ] = source[ index ];

    }

    return target;

}

module.exports = cloneArrayLike;
