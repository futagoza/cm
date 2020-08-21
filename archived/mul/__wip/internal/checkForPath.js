"use strict";

const flatten = require( "../array.flatten" );

/**
 * @private
 * @param {{}|Array} object 
 * @param {String|Number|Array<String|Number>} path 
 * @param {Function} condition 
 * @returns {Boolean}
 */
function checkForPath( object, path, condition ) {

    if ( object == null ) return false;

    if ( typeof path === "string" && path.indexOf( "." ) === -1 )

        return condition( object, path );

    const keys = Array.isArray( path )
        ? flatten( path, key => {

            if ( typeof key !== "string" ) key = String( key );
            return key.split( "." );

        } )
        : String( path ).split( "." );

    const count = keys.length;
    let part = object;
    let i, key;

    for ( i = 0; i < count; ++i ) {

        key = keys[ i ];

        if ( ! condition( part, key ) ) return false;

        part = object[ key ];

    }

    return true;

}

module.exports = checkForPath;
