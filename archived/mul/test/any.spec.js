"use strict";

/* eslint-disable prefer-rest-params */

const { expect } = require( "chai" );
const mul = require( "../index" );

describe( "utility functions that accept an object of any type is their first argument", () => {

    it( "isArguments", function isArguments() {

        expect( mul.isArguments( arguments ) ).to.equal( true );

    } );

    it( "isArray", () => {

        expect( mul.isArray( [] ) ).to.equal( true );

    } );

} );
