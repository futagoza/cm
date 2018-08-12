"use strict";

const { assert, expect } = require( "chai" );
const flat = require( "../array.flat" );
const flatMap = require( "../array.flatMap" );
const lastIndex = require( "../array.lastIndex" );
const lastItem = require( "../array.lastItem" );
const ImportablePath = require( "../lib/ImportablePath" );

describe( ImportablePath( "array.flat" ), () => {

    function testArray( actual, expected, msg ) {

        assert.deepEqual( actual, expected, msg );
        assert.equal( actual.length, expected.length, "expected " + expected.length + ", got " + actual.length );

    }

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

describe( ImportablePath( "array.flatMap" ), () => {

    it( "should throw on bad arguments", () => {

        const badArgs = [ void 0, null, "", {}, true, false, 42, /a/g ];
        const arrayExpectation = /value is expected to be an array/;
        const functionExpectation = /value is expected to be a function/;

        badArgs.forEach( badArg => {

            expect( () => flatMap( badArg ) ).to.throw( arrayExpectation );
            expect( () => flatMap( [], badArg ) ).to.throw( functionExpectation );

        } );

    } );

    it( "flattens an array", () => {

        const mapped = flatMap( [ 1, [ 2 ], [ 3, 4 ] ], ( x, i ) => [ x, i ] );
        const expected = [ 1, 0, [ 2 ], 1, [ 3, 4 ], 2 ];

        assert.deepEqual( mapped, expected, "array is flattened and mapped to tuples of item/index" );
        assert.equal( mapped.length, expected.length, "array has expected length" );

    } );

    it( "thisArg works as expected", () => {

        const context = {};
        let actual;

        flatMap( [ 1 ], function _assign() { actual = this }, context ); // eslint-disable-line padded-blocks
        assert.equal( actual, context, "thisArg isnt working as expected" );

    } );

    it( "works with sparse arrays", () => {

        const identity = x => x;
        const errMsg = "an array hole is treated the same as an empty array";

        // eslint-disable-next-line no-sparse-arrays
        assert.deepEqual( flatMap( [ , [ 1 ] ], identity ), flatMap( [ [], [ 1 ] ], identity ), errMsg );

    } );

} );

describe( ImportablePath( "array.lastIndex" ), () => {

    const assertIndex = ( O, index ) => expect( lastIndex( O ) ).to.be.a( "number" ).and.equal( index );

    it( "should throw on bad arguments", () => {

        const badArgs = [ void 0, null, "", {}, true, false, 42, /a/g ];
        const arrayExpectation = /value is expected to be an array/;

        badArgs.forEach( badArg => {

            expect( () => lastIndex( badArg ) ).to.throw( arrayExpectation );

        } );

    } );

    it( "returns index of the last element", () => {

        const G = Object.keys( global );

        assertIndex( [ "a", "b" ], 1 );
        assertIndex( G, G.length - 1 );
        assertIndex( new Array( 24 ), 23 );

    } );

    it( "should return 0 on a empty array", () => {

        assertIndex( [], 0 );

    } );

} );

describe( ImportablePath( "array.lastItem" ), () => {

    const assertGetLastItem = ( O, result ) => expect( lastItem( O ) ).to.equal( result );

    it( "should throw on bad arguments", () => {

        const badArgs = [ void 0, null, "", {}, true, false, 42, /a/g ];
        const arrayExpectation = /value is expected to be an array/;

        badArgs.forEach( badArg => {

            expect( () => lastItem( badArg ) ).to.throw( arrayExpectation );

        } );

    } );

    it( "should return the last element within a array", () => {

        const O = [ "a", "b", "c", "d", "e", "f", "g" ];

        assertGetLastItem( O, "g" );
        assertGetLastItem( O.slice( 0, 1 ), "a" );
        assertGetLastItem( new Array( 24 ), void 0 );

    } );

    it( "should set the last element of a array", () => {

        const O = [ "a", "b", "c", "d", "e", "f", "g" ];

        expect( lastItem( O, "h" ) ).to.equal( "h" );
        expect( O ).to.include.members( [ "a", "b", "c", "d", "e", "f", "h" ] );

    } );

    it( "should return `undefined` on a empty array", () => {

        assertGetLastItem( [], void 0 );

    } );

} );
