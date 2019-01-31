#!/usr/bin/env node

"use strict";

const resolve = require( "dir-resolve" );
const sync = require( "./index" );
const args = process.argv.slice( 2 );

if ( args.length < 1 )

    sync();

else

    args.forEach( arg => {

        sync( resolve( arg ) );

    } );
