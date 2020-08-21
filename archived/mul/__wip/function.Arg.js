"use strict";

/**
 * Returns a function that will return the `n`th argument passed to it.
 *
 * @since 1.0.0-alpha.0
 * @param {Number} n The `n`th argument passed to the return function.
 * @param {*} [defaultValue] Default value if the `n`th argument is `null`ish (Optional).
 * @returns {Function} A function that returns it's `n`th argument.
 */
function Arg( n, defaultValue ) {

    return function identity() {

        const param = arguments[ n ];

        return param == null ? defaultValue : param;

    };

}

/**
 * A function that returns it's _first_ argument.
 *
 * @since 1.0.0-alpha.0
 */
Arg.first = Arg( 0 );

/**
 * A function that returns it's _second_ argument.
 *
 * @since 1.0.0-alpha.0
 */
Arg.second = Arg( 1 );

/**
 * A function that returns it's _third_ argument.
 *
 * @since 1.0.0-alpha.0
 */
Arg.third = Arg( 2 );

/**
 * A function that returns it's _fourth_ argument.
 *
 * @since 1.0.0-alpha.0
 */
Arg.fourth = Arg( 3 );

/**
 * A function that returns it's _fifth_ argument.
 *
 * @since 1.0.0-alpha.0
 */
Arg.fifth = Arg( 4 );

module.exports = Arg;
