"use strict";

const through = require( "through2" );

/**
 * Create's a `through2.obj` tranform stream using the given function.
 * 
 * @param {Function} fn A function that transform's a `chunk` of the steam.
 * @param {[]} [args] An array of extra arguments to pass to `fn`.
 */

function fromFunction( fn, args ) {

    // We want to access the `thisArg` for the transform stream, so no fat arrow here
    return through.obj( function tranform( chunk, encoding, callback ) {

        Promise.resolve()
            .then( () => fn.call( this, chunk, encoding, ...args ) )
            .then(
                result => callback( void 0, result ),
                error => callback( error )
            );

    } );

}

// Exports

module.exports = fromFunction;
module.exports.default = fromFunction;
module.exports.fromFunction = fromFunction;
