"use strict";

/**
 * If this is returned by `cb`, `visitArgv` will end it's iteration.
 */
const BREAK = Symbol( "processArgv break" );

/**
 * Iterate over `args` while calling `cb(arg, nextArg)`.
 * 
 * If `cb` is an object, it will be treated as an object of known options and their respective
 * callbacks as it loops over the args.
 * 
 * @param {String|String[]} args An `argv`-like string or array of strings.
 * @param {Function|{}} cb A function or an object of known functions to be called on each argument.
 */
function visitArgv( args, cb ) {

    args = typeof args === "string" ? args.split( " " ) : args;

    const ARG_COUNT = args.length;
    const VISITING_KNOWN_ARGS = typeof cb === "object";

    let i = -1;

    function nextArg() {

        if ( i < ARG_COUNT ) return args[ i + 1 ];

    }
    nextArg.consume = () => args[ ++i ];
    nextArg.rest = () => args.slice( i + 1 );

    while ( ++i < ARG_COUNT ) {

        const argument = args[ i ];
        let visit = cb;

        if ( VISITING_KNOWN_ARGS ) {

            visit = cb[ argument ];
            const T = typeof visit;

            if ( T === "string" ) visit = cb[ visit ];
            if ( T !== "function" ) continue;

        }

        if ( visit( argument, nextArg ) === BREAK ) break;

    }

}

visitArgv.BREAK = BREAK;
module.exports = visitArgv;
