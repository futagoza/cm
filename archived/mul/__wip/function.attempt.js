"use strict";

const defer = require( "./function.defer" );
const isPromise = require( "./isPromise" );

/**
 * Will attempt to run `fn` and optionally pass it to `cb( error, result )`:
 * 
 * - `error` will have an exception if one was thrown
 * - `result` houses the returned value of running `fn`
 *
 * @since 1.0.0-alpha.0
 * @param {Function} fn The function to execute within a try/catch statement.
 * @param {Array} [args] A list of arguments to pass to `fn`.
 * @param {Function} [cb] A classic Node.js style callback.
 * @returns {void}
 */
function attempt( fn, args, cb ) {

    let result, error;

    if ( typeof args === "function" ) {

        cb = args;
        args = void 0;

    }

    try {

        result = args ? fn.apply( void 0, args ) : fn();

    } catch ( ex ) {

        error = ex;

    } finally {

        if ( typeof cb === "function" ) {

            if ( isPromise( result ) ) {

                result.catch( exception => cb( exception ) );
                result.then( response => cb( void 0, response ) );

            } else defer( cb, error, result );

        }

    }

}

/**
 * Returns a function that will pass it's arguments to the `fn` via `attempt`:
 * 
 * ```js
 * const addUser = attempt.later( remote.addUser, checkRestAPI );
 *
 * addUser( "Futago-za", "Ryuu" );
 * addUser( "John", "Doe );
 * ```
 *
 * @since 1.0.0-alpha.0
 * @param {Function} fn The function to execute within a try/catch statement.
 * @param {Function} [cb] A classic Node.js style callback.
 * @returns {Function} A function that calls `attempt( fn, args, cb );`
 */
attempt.later = function later( fn, cb ) {

    return function now() {

        const args = [];
        const argc = arguments.length;

        for ( let i = 0; i < argc; ++i ) args[ i ] = arguments[ i ];

        attempt( fn, args, cb );

    };

};

module.exports = attempt;
