"use strict";

const fromFunction = require( "./from-function" );
const fromPromise = require( "./from-promise" );
const through = require( "through2" );

/**
 * Create's a `through2` stream from the given `Promise` or `Function`.
 * 
 * @param {Promise|Function} fn A method to tranform into a stream.
 * @param {...*} [args] Extra arguments passed to `fn` if it's not a Promise.
 */

function createStream( fn, ...args ) {

    if ( typeof fn.then === "function" ) return fromPromise( fn );

    return fromFunction( fn, args );

}

// Exports

module.exports = createStream;
module.exports.default = createStream;
module.exports.createStream = createStream;
module.exports.from = createStream;
module.exports.fromPromise = fromPromise;
module.exports.fromFunction = fromFunction;
module.exports.through = through;
module.exports.through2 = through;
module.exports.ctor = through.ctor;
module.exports.obj = through.obj;
