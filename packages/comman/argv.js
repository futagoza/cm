// utils
var __slice = Array.prototype.slice;
function isShort( arg ) { return arg.indexOf( "-" ) === 0; }
function isLong( arg ) { return arg.indexOf( "--" ) === 0; }

// node main argv
var nodeArgv = process.argv.slice( 2 );

// node-argv parser
function parse( argv ) {
    if ( !argv ) argv = nodeArgv;
    if ( !Array.isArray( argv ) ) throw TypeError( "`argv` argument must be a array!" );

    var args = {}, list = [], skip;

    argv.forEach( function ( arg, i ) {
        if ( skip ) {
            skip = false; return;
        }

        if ( isLong( arg ) ) {
            args[ arg.slice( 2 ) ] = argv[ i + 1 ];
            skip = true; return;
        }

        if ( isShort( arg ) ) {
            args[ arg.slice( 1 ) ] = true; return;
        }

        list.push( arg );
    } );

    return {
        argv: args,
        length: argv.length,
        list: list,
        on: function ( arg, callback, context ) {
            parse.on( args, arg, callback, context );
        }
    };
}

// if the given arg is in argv, call the last argument
parse.on = function ( argv, arg, callback, context ) {
    var i;

    if ( typeof argv === "string" ) {
        context = callback;
        callback = arg;
        arg = argv;
        argv = nodeArgv;
    }

    i = argv.indexOf( arg );
    if ( i !== -1 ) {
        if ( !isLong( arg ) ) {
            return callback.call( context );
        }

        callback.call( context, argv[ i + 1 ] );
    }
};

// export
parse.parse = parse;
module.exports = parse;
