"use strict";

const { expect } = require( "chai" );
const DEG_PER_RAD = require( "../math.DEG_PER_RAD" );
const ImportablePath = require( "../lib/ImportablePath" );

describe( ImportablePath( "math.DEG_PER_RAD" ), () => {

    it( "should equal ", () => {

        // DEG_PER_RAD === 0.017453292519943295

        expect( DEG_PER_RAD )

            .to.be.a( "number" )
            .closeTo( 0.0174532925199432, 0.01 );

    } );

} );
