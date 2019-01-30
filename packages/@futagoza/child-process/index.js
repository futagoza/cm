/* eslint-disable no-unneeded-ternary */

"use strict";

const isSpawnError = require( "./lib/isSpawnError" );
const normalizeArguments = require( "./lib/normalizeArguments" );
const promise = require( "./lib/promise" );

/**
 * Spawns a new process.
 * 
 * __WARNING:__ On `options.stdio = "pipe"` _(default)_ generated output will be buffered
 * unless `options.buffer` is set to _false_.
 * 
 * @param {String} command Path of the executable to run as a child process.
 * @param {String[]} [args] Arguments to pass to the child process.
 * @param {{}} [options] Options passed to `child_process.spawn()`.
 */
function spawn( command, args, options ) {

    [ command, args, options ] = normalizeArguments( command, args, options );

    if ( typeof options.buffer !== "boolean" ) options.buffer = true;
    if ( ! options.hasOwnProperty( "encoding" ) ) options.encoding = "buffer";
    if ( ! options.stdio ) options.stdio = "pipe";

    return promise( command, args, options );

}

/**
 * Spawns a shell, executing the command inside the shell and buffering any generated output.
 *
 * @param {String} command Path of the executable to run as a child process.
 * @param {String[]} [args] Arguments to pass to the child process.
 * @param {{}} [options] Options passed to `child_process.spawn()`.
 */
function exec( command, args, options ) {

    [ command, args, options ] = normalizeArguments( command, args, options );

    if ( ! options.hasOwnProperty( "encoding" ) ) options.encoding = "utf8";
    if ( typeof options.shell !== "string" ) options.shell = true;
    options.stdio = "pipe";
    options.buffer = true;

    return promise( command, args, options );

}

/**
 * Spawns a shell, executing the command inside the shell and sending any output to the current process.
 *
 * @param {String} command Path of the executable to run as a child process.
 * @param {String[]} [args] Arguments to pass to the child process.
 * @param {{}} [options] Options passed to `child_process.spawn()`.
 */
function run( command, args, options ) {

    [ command, args, options ] = normalizeArguments( command, args, options );

    if ( typeof options.shell !== "string" ) options.shell = true;
    options.stdio = "inherit";

    return promise( command, args, options );

}

// Exports

module.exports = {
    exec,
    isSpawnError,
    run,
    spawn,
};
module.exports.default = module.exports;
