"use strict";

const { assert, expect } = require( "chai" );
const flatMap = require( "../array.flatMap" );
const ImportablePath = require( "../lib/ImportablePath" );

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
