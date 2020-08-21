"use strict";

const extend = require( "./object.extend" );

/**
 * Will add any misssing properties to `target` from the additional objects.
 *
 * @since 1.0.0-alpha.0
 * @param {{}} target The object you wish to extend
 * @param {...{}} args Objects that contain default properties
 * @returns {{}} The `target`
 */
function defaults( target ) {

    const argc = arguments.length;

    for ( let i = 0; i < argc; ++i ) {

        extend( target, arguments[ i ] );

    }

    return target;

}

module.exports = defaults;
