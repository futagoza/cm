[
    "argv",
    "cache",
    "debug",
    "events",
    "fs",
    "step",
    "utils"
]
    .forEach( function ( name ) {
        exports.__defineGetter__( name, function () {
            return require( './' + name + '.js' );
        } );
    } );

exports.__defineGetter__( "Event", function () {
    return require( './events.js' ).Event;
} );
exports.__defineGetter__( "EventEmitter", function () {
    return require( './events.js' ).EventEmitter;
} );
exports.__defineGetter__( "Emitter", function () {
    return require( './events.js' ).EventEmitter;
} );
