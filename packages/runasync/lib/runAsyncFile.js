"use strict";

const callFunction = require( "./callFunction" );

/**
 * Runs a script that exports either an ES2017 `async`
 * function or a function that returns an ES2015 Promise.
 * 
 * @param {string} id 
 * @param {any[]} [args] 
 * @param {function} [cb]
 * @returns {Promise}
 */

function runAsyncFile( id, args, cb ) {

    if ( arguments.length === 2 && typeof args === "function" ) {

        cb = args;
        args = [];

    }

    const fn = require( id );
    const report = typeof cb === "function";
    let error;

    return ( args ? callFunction( fn, Array.isArray( args ) ? args : [ args ] ) : fn() )

        .catch( function onError( exception ) {

            if ( report ) cb( exception );
            error = exception;

        } )

        .then( function onCompletion( result ) {

            if ( report ) cb( void 0, result );

            return {
                error: error,
                result: result
            };

        } );

}

module.exports = runAsyncFile;
module.exports.default = runAsyncFile;
