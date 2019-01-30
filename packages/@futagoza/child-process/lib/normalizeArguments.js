"use strict";

/**
 * Will return a normalized set of arguments to use with `@futagoza/child-process/lib/promise.js`
 * 
 * @param {String} [command] Path of the executable to run as a child process.
 * @param {String[]} [args] Arguments to pass to the child process.
 * @param {{}} [options] Options passed to `child_process.spawn()`.
 */
function normalizeArguments( command, args, options ) {

    if ( typeof command === "object" && ! options ) {

        options = command;
        command = options.command || options.file;

    }

    if ( ! Array.isArray( args ) ) {

        options = ! options && typeof args === "object" ? args : {};
        args = options.args || options.argv;

        if ( ! args && typeof command === "string" ) {

            args = command.split( options.ws || " " );
            command = args.shift();

        }

    }

    options = typeof options !== "object" ? {} : Object.assign( {}, options );

    options.stdio = options.stdio || (

        options.pipe
            ? "pipe"
            : options.inherit
                ? "inherit"
                : options.ignore
                    ? "ignore"
                    : null

    );

    if ( ! options.stdio && options.silent ) options.stdio = "pipe";

    return [ command, args, options ];

}

// Exports

module.exports = normalizeArguments;
module.exports.default = normalizeArguments;
module.exports.normalizeArguments = normalizeArguments;
