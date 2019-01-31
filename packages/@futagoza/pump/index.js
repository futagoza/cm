/* eslint-disable no-unneeded-ternary */

"use strict";

const asyncDone = require( "async-done" );
const cs = require( "@futagoza/create-stream" );
const pipeline = require( "readable-stream" ).pipeline;

const TYPE_ERROR = "Expecting a either a function, promise or stream, but got ";

/**
 * Will wrap `stream.pipeline` in a Promise, as well as change any promise's and functions to streams.
 *
 * @param {...Function} args Streams, functions and promises.
 */
function pump( ...args ) {

    if ( args.length < 1 ) return Promise.resolve();
    if ( args.length === 1 && Array.isArray( args[ 0 ] ) ) args = args[ 0 ];
    if ( args.length === 1 ) args.push( () => void 0 );

    return new Promise( ( resolve, reject ) => {

        const streams = args.map( arg => {

            const T = typeof arg;
            if ( T !== "function" && T !== "object" ) return reject( new TypeError( TYPE_ERROR + T ) );

            if ( typeof arg.pipe === "function" ) return arg;

            return cs.createStream( arg );

        } );

        function finish( err, res ) {

            err ? reject( err ) : resolve( res );

        }

        asyncDone( done => pipeline( ...streams, done ), finish );

    } );

}

// Exports

module.exports = pump;
module.exports.default = pump;
module.exports.pipeline = pipeline;
module.exports.pump = pump;
