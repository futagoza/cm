/* eslint prefer-spread: 0 */

"use strict";

/**
 * Execute's `fn` based on `args.length < 10`.
 *
 * This should be faster then `Function.prototype.call` or `Function.prototype.apply`.
 *
 * @param {function} fn
 * @param {any[]} [args]
 * @returns {any}
 */

function callFunction( fn, args ) {

    if ( ! args || args.length === 0 ) return fn();

    const argc = args.length;

    if ( argc === 1 )

        return fn( args[ 0 ] );

    if ( argc === 2 )

        return fn( args[ 0 ], args[ 1 ] );

    if ( argc === 3 )

        return fn( args[ 0 ], args[ 1 ], args[ 2 ] );

    if ( argc === 4 )

        return fn( args[ 0 ], args[ 1 ], args[ 2 ], args[ 3 ] );

    if ( argc === 5 )

        return fn( args[ 0 ], args[ 1 ], args[ 2 ], args[ 3 ], args[ 4 ] );

    if ( argc === 6 )

        return fn( args[ 0 ], args[ 1 ], args[ 2 ], args[ 3 ], args[ 4 ], args[ 5 ] );

    if ( argc === 7 )

        return fn( args[ 0 ], args[ 1 ], args[ 2 ], args[ 3 ], args[ 4 ], args[ 5 ], args[ 6 ] );

    if ( argc === 8 )

        return fn( args[ 0 ], args[ 1 ], args[ 2 ], args[ 3 ], args[ 4 ], args[ 5 ], args[ 6 ], args[ 7 ] );

    if ( argc === 9 )

        return fn( args[ 0 ], args[ 1 ], args[ 2 ], args[ 3 ], args[ 4 ], args[ 5 ], args[ 6 ], args[ 7 ], args[ 8 ] );

    return fn.apply( void 0, args );

}

module.exports = callFunction;
module.exports.default = callFunction;
