"use strict";

const { expect } = require( "chai" );
const lastIndex = require( "../array.lastIndex" );
const ImportablePath = require( "../lib/ImportablePath" );

const assertIndex = ( O, index ) => expect( lastIndex( O ) ).to.be.a( "number" ).and.equal( index );

describe( ImportablePath( "array.lastIndex" ), () => {

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
