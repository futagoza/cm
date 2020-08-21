"use strict";

const forEach = require( "./forEach" );

/**
 * Returns a function that will add default arguments to the given `fn` before executing it.
 *
 * @since 1.0.0-alpha.0
 * @param {Function} fn The function to execute within.
 * @param {Array|{}} defaultArgs A list of default arguments to pass to `fn`.
 * @param {*} [thisArg] An object used as `this` within the `fn` method (Optional).
 * @returns {Function} A function that calls `fn.apply( thisArg, args );`
 */
function curry( fn, defaultArgs, thisArg ) {

    return function exec() {

        const _arguments = arguments;
        const args = [];

        forEach( defaultArgs, ( defaultValue, index ) => {

            if ( typeof index !== "number" ) return;

            const currentValue = _arguments[ index ];

            args[ index ] = currentValue == null ? defaultValue : currentValue;

        } );

        return fn.apply( thisArg == null ? this : thisArg, args );

    };

}

module.exports = curry;
