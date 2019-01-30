"use strict";

const through = require( "through2" );

/**
 * Create's a `through2` stream from the given `Promise`.
 * 
 * __WARNING:__ No property or type checking is performed _intentionally_; this function presumes
 * it's been given a promise that is either waiting to resolve, or already has resolved.
 * 
 * @param {Promise} fn A promise to tranform into a stream.
 * @param  {{}} [options] Optional options passed directly to `through2`.
 */

function fromPromise( fn, options = {} ) {

    options.objectMode = typeof options.objectMode === "boolean" ? options.objectMode : true;

    const stream = through( options );

    stream.promise = fn.then(
        result => {

            stream.push( result );
            stream.push( null );

        },
        error => stream.emit( "error", error )
    );

    return stream;

}

// Exports

module.exports = fromPromise;
module.exports.default = fromPromise;
module.exports.fromPromise = fromPromise;
