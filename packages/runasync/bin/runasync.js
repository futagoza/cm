#!/usr/bin/env node

"use strict";

const resolve = require( "path" ).resolve;
const runAsyncFile = require( "../" );

const id = resolve( process.cwd(), process.argv[ 2 ] );
const args = process.argv.slice( 3 );

process.on( "unhandledRejection", ( reason, p ) => {

    console.error( "Unhandled Rejection at:", p, "reason:", reason );
    process.exit( 1 );

} );

runAsyncFile( id, args, ( error, result ) => {

    if ( error ) {

        console.error( error.message || error.stack || error );
        process.exit( 1 );

    }

    if ( result ) console.log( result );

} );
