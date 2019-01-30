"use strict";

const cp = require( "child_process" );
const Promise = require( "any-promise" );

/**
 * A unique symbol for Error's from SpawnProcess.
 */
const ErrorSymbol = Symbol( "@futagoza/child-process" );

/**
 * Return's either a buffer or a string depending on `encoding`.
 * 
 * @param {[]} data 
 * @param {String} encoding 
 */
function decode( data, { encoding } ) {

    if ( typeof encoding !== "string" ) return data.join( "" ).trim();

    const buffer = Buffer.concat( data );

    return encoding === "buffer" || ! Buffer.isEncoding( encoding )
        ? buffer
        : buffer.toString( encoding );

}

/**
 * Will run `child_process.spawn()` wrapped in a `Promise`.
 * 
 * @param {String} command Path of the executable to run as a child process.
 * @param {String[]} [args] Arguments to pass to the child process.
 * @param {{}} [options] Options passed to `child_process.spawn()`.
 */
function spawn( command, args = [], options = {} ) {

    const STDIO_IS_PIPE = options.stdio === "pipe";
    const BUFFER = STDIO_IS_PIPE && options.buffer === true;

    return new Promise( ( resolve, reject ) => {

        const child = cp.spawn( command, args, options );

        let EXIT_CODE = 0;
        let EXIT_SIGNAL = null;
        let stdout = BUFFER ? [] : null;
        let stderr = BUFFER ? [] : null;

        /**
         * - If a string, create an error object; Otherwise assume it's an object.
         * - Attach `ErrorSymbol` to the error for use with `isSpawnError`.
         * - Attach stdio, Spawn and other usefull objects?
         * - Promise.reject
         * 
         * @param {Error} reason
         */
        function handleError( reason ) {

            if ( typeof reason === "string" ) reason = new Error( reason );

            reason[ ErrorSymbol ] = true;
            reason.code = EXIT_CODE;
            reason.signal = EXIT_SIGNAL;
            reason.path = command;
            reason.spawnargs = args;
            reason.syscall = "spawn " + command;

            if ( BUFFER ) {

                reason.stdout = decode( stdout, options );
                reason.stderr = decode( stderr, options );

            }

            if ( child.stdout ) child.stdout.destroy();
            if ( child.stderr ) child.stderr.destroy();

            reject( reason );

        }

        if ( STDIO_IS_PIPE ) {

            child.stdout.on( "error", handleError );
            child.stderr.on( "error", handleError );

            if ( BUFFER ) {

                child.stdout.on( "data", data => stdout.push( data ) );
                child.stderr.on( "data", data => stderr.push( data ) );

            }

            if ( options.input ) {

                child.stdin.on( "error", handleError );
                child.stdin.end( options.input );

            }

        }

        child
            .on( "error", handleError )
            .on( "close", ( code, signal ) => {

                EXIT_CODE = code;
                EXIT_SIGNAL = signal;

                if ( code === 0 ) {

                    if ( BUFFER ) {

                        stdout = decode( stdout, options );
                        stderr = decode( stderr, options );

                    }

                    resolve( { command, args, options, signal, stderr, stdout } );

                } else {

                    handleError( `command exited with code: ${ code }` );

                }

            } );

        if ( typeof options.ready === "function" ) options.ready( child, options );

    } );

}

// Exports

module.exports = spawn;
module.exports.default = spawn;
module.exports.Symbol = ErrorSymbol;
module.exports.spawn = spawn;
