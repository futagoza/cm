"use strict";

const { assert, expect } = require( "chai" );
const flat = require( "../array.flat" );
const ImportablePath = require( "../lib/ImportablePath" );

function testArray( actual, expected, msg ) {

    assert.deepEqual( actual, expected, msg );
    assert.equal( actual.length, expected.length, "expected " + expected.length + ", got " + actual.length );

}

describe( ImportablePath( "array.flat" ), () => {

    it( "should throw on a bad array value", () => {

        const expectation = /value is expected to be an array/;

        expect( () => flat( void 0 ) ).to.throw( expectation );
        expect( () => flat( null ) ).to.throw( expectation );
        expect( () => flat( "" ) ).to.throw( expectation );

    } );

    it( "flattens an array", () => {

        const source = [ 1, [ 2 ], [ [ 3 ] ], [ [ [ "four" ] ] ] ];

        testArray( flat( source ), [ 1, 2, [ 3 ], [ [ "four" ] ] ], "missing depth only flattens 1 deep" );

        testArray( flat( source, 1 ), [ 1, 2, [ 3 ], [ [ "four" ] ] ], "depth of 1 only flattens 1 deep" );
        assert.notDeepEqual( flat( source, 1 ), [ 1, 2, 3, [ "four" ] ], "depth of 1 only flattens 1 deep: sanity check" );

        testArray( flat( source, 2 ), [ 1, 2, 3, [ "four" ] ], "depth of 2 only flattens 2 deep" );
        assert.notDeepEqual( flat( source, 2 ), [ 1, 2, 3, "four" ], "depth of 2 only flattens 2 deep: sanity check" );

        testArray( flat( source, 3 ), [ 1, 2, 3, "four" ], "depth of 3 only flattens 3 deep" );
        testArray( flat( source, Infinity ), [ 1, 2, 3, "four" ], "depth of Infinity flattens all the way" );

    } );

    it( "works with sparse arrays", () => {

        // eslint-disable-next-line no-sparse-arrays
        assert.deepEqual( flat( [ , [ 1 ] ] ), flat( [ [], [ 1 ] ] ), "an array hole is treated the same as an empty array" );

    } );

} );
