"use strict";

const STEP_ALREADY_DONE = "A function passed to `step` has already completed, but it's called it `done` function again.";

function step( ...functions ) {

    if ( functions.length < 1 ) return Promise.resolve();
    if ( functions.length === 1 && Array.isArray( functions[ 0 ] ) ) functions = functions[ 0 ];

    return new Promise( ( resolve, reject ) => {

        let idx = -1;
        const count = functions.length;

        let _lock = false;
        function next( error, value ) {

            if ( ++idx === count ) return resolve( value );

            let _complete = false;
            function done( error, result ) {

                if ( _complete ) {

                    console.warn( new Error( STEP_ALREADY_DONE ) );
                    return void 0;

                }
                _complete = true;

                if ( error ) return reject( error );
                return next( error, result );

            }

            let _promise = null;
            try {

                _promise = functions[ idx ]( _promise, done );

            } catch ( exception ) {

                return reject( exception );

            } finally {

                if ( _promise && typeof _promise.then === "function" )

                    _promise
                        .catch( done )
                        .then( v => next( null, v ) );

            }

        }

        next();

    } );

}

module.exports = step;
