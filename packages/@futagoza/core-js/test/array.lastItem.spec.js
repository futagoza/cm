"use strict";

const { expect } = require( "chai" );
const lastItem = require( "../array.lastItem" );
const ImportablePath = require( "../lib/ImportablePath" );

const assertGetLastItem = ( O, result ) => expect( lastItem( O ) ).to.equal( result );

describe( ImportablePath( "array.lastItem" ), () => {

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
