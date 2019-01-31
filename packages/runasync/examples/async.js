"use strict";

const promiseFile = require.resolve( "./promise" );
const promiseExample = require( promiseFile );
const runAsyncFile = require( "../" );

function handleExample( example ) {

    console.log( example.result || example.error );
    if ( example.error ) process.exit( 1 );

}

module.exports = async function asyncExample() {

    try {

        handleExample( { result: await promiseExample( "name" ) } );

    } catch ( exception ) {

        handleExample( { error: exception } );

    }

    handleExample( await runAsyncFile( promiseFile, "version" ) );

};
