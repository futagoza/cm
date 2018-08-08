"use strict";

const { expect } = require( "chai" );
const DEG_PER_RAD = require( "../math.DEG_PER_RAD" );
const RAD_PER_DEG = require( "../math.RAD_PER_DEG" );
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
