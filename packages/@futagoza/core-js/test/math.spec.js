"use strict";

const { expect } = require( "chai" );
const DEG_PER_RAD = require( "../math.DEG_PER_RAD" );
const RAD_PER_DEG = require( "../math.RAD_PER_DEG" );
const clamp = require( "../math.clamp" );
const ImportablePath = require( "../lib/ImportablePath" );

describe( ImportablePath( "math.DEG_PER_RAD" ), () => {

    it( "should approximately be 0.0174532925199432", () => {

        // DEG_PER_RAD === 0.017453292519943295

        expect( DEG_PER_RAD )

            .to.be.a( "number" )
            .closeTo( 0.0174532925199432, 0.01 );

    } );

} );

describe( ImportablePath( "math.RAD_PER_DEG" ), () => {

    it( "should equal 57.29577951308232", () => {

        expect( RAD_PER_DEG )

            .to.be.a( "number" )
            .that.equals( 57.29577951308232 );

    } );

} );

describe( ImportablePath( "math.clamp" ), () => {

    it( "should throw on bad number values", () => {

        const expectation = /is expected to be a number/;

        expect( () => clamp( void 0 ) ).to.throw( expectation );
        expect( () => clamp( 1, null ) ).to.throw( expectation );
        expect( () => clamp( 2, 1, "" ) ).to.throw( expectation );

    } );

    it( "return NaN if any argument is NaN", () => {

        expect( Number.isNaN( clamp( NaN, 1, 3 ) ) ).to.equal( true );
        expect( Number.isNaN( clamp( 2, NaN, 3 ) ) ).to.equal( true );
        expect( Number.isNaN( clamp( 4, 1, NaN ) ) ).to.equal( true );

    } );

    it( "returns a value within the given bounds", () => {

        expect( clamp( 0, 1, 3 ) ).to.equal( 1 );
        expect( clamp( 2, 1, 3 ) ).to.equal( 2 );
        expect( clamp( 4, 1, 3 ) ).to.equal( 3 );

    } );

} );
