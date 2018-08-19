"use strict";

const { expect } = require( "chai" );
const entries = require( "../object.entries" );
const fromEntries = require( "../object.fromEntries" );
const values = require( "../object.values" );
const ImportablePath = require( "../lib/ImportablePath" );

const a = {};
const b = {};
const c = {};

describe( ImportablePath( "object.entries" ), () => {

    const equal = ( A, B ) => expect( entries( A ) ).to.deep.equal( B );

    it( "basic support", () => {

        const object = { a: a, b: b, c: c };
        const target = [ [ "a", a ], [ "b", b ], [ "c", c ] ];

        equal( object, target );

    } );

    it( "duplicate entries are included", () => {

        const object = { a: a, b: a, c: c };
        const target = [ [ "a", a ], [ "b", a ], [ "c", c ] ];

        equal( object, target );

    } );

    it( "entries are in the same order as keys", () => {

        const object = { a: a, b: b };
        object[ 0 ] = 3;
        object.c = c;
        object[ 1 ] = 4;
        delete object[ 0 ];

        const target = Object
            .keys( object )
            .map( key => [ key, object[ key ] ] );

        equal( object, target );

    } );

    it( "non-enumerable properties are omitted", () => {

        const object = { a: a, b: b };
        const target = [ [ "a", a ], [ "b", b ] ];

        Object.defineProperty( object, "c", { enumerable: false, value: c } );

        equal( object, target );

    } );

    it( "inherited properties are omitted", () => {

        const F = function G() { };
        F.prototype.a = a;

        const f = new F();
        f.b = b;

        equal( f, [ [ "b", b ] ] );

    } );

    it( "Symbol properties are omitted", () => {

        const object = { a: a, b: b, c: c };
        const enumSym = Symbol( "enum" );
        const nonEnumSym = Symbol( "non enum" );
        const target = [ [ "a", a ], [ "b", b ], [ "c", c ], [ "d", enumSym ] ];

        object[ enumSym ] = enumSym;
        object.d = enumSym;
        Object.defineProperty( object, nonEnumSym, { enumerable: false, value: nonEnumSym } );

        equal( object, target );

    } );

    it( "not-yet-visited keys deleted on [[Get]] must not show up in output", () => {

        const o = { a: 1, b: 2, c: 3 };
        Object.defineProperty( o, "a", {
            get() {

                delete this.b;
                return 1;

            }
        } );

        equal( o, [ [ "a", 1 ], [ "c", 3 ] ] );

    } );

    it( "not-yet-visited keys made non-enumerable on [[Get]] must not show up in output", () => {

        const o = { a: "A", b: "B" };
        Object.defineProperty( o, "a", {
            get() {

                Object.defineProperty( o, "b", { enumerable: false } );
                return "A";

            }
        } );

        equal( o, [ [ "a", "A" ] ] );

    } );

} );

describe( ImportablePath( "object.fromEntries" ), () => {

    const equal = ( A, B ) => expect( fromEntries( A ) ).to.deep.equal( B );

    it( "should throw on a bad argument", () => {

        const badArgs = [ void 0, null, "", {}, true, false, 42, /a/g ];
        const arrayExpectation = /iterable is expected to be an array/;

        badArgs.forEach( badArg => {

            expect( () => fromEntries( badArg ) ).to.throw( arrayExpectation );

        } );

    } );

    it( "basic support", () => {

        const array = [ [ "a", a ], [ "b", b ], [ "c", c ] ];
        const target = { a: a, b: b, c: c };

        equal( array, target );

    } );

    it( "duplicate entries are included", () => {

        const array = [ [ "a", a ], [ "b", a ], [ "c", c ] ];
        const target = { a: a, b: a, c: c };

        equal( array, target );

    } );

    it( "nullish entries are ignored", () => {

        const array = [ [ "a", a ], null, [ "c", c ], [ "b", b ] ];
        const target = { a: a, c: c };

        delete array[ 3 ];

        equal( array, target );

    } );

    it( "should throw on a bad entry (non-pair entry)", () => {

        const array = [ [ "a", a ], "b", [ "c", c ] ];

        expect( () => fromEntries( array ) ).to.throw( /is expected to be an array/ );

        array[ 1 ] = [ "b" ];

        expect( () => fromEntries( array ) ).to.throw( /should contain at least 2 elements/ );

    } );

    /* it( "", () => {

        //

    } ); */

} );

describe( ImportablePath( "object.values" ), () => {

    const equal = ( A, B ) => expect( values( A ) ).to.deep.equal( B );

    it( "basic support", () => {

        const object = { a: a, b: b, c: c };
        const target = [ a, b, c ];

        equal( object, target );

    } );

    it( "duplicate values are included", () => {

        const object = { a: a, b: a, c: c };
        const target = [ a, a, c ];

        equal( object, target );

    } );

    it( "values are in the same order as keys", () => {

        const object = { a: a, b: b };
        object[ 0 ] = 3;
        object.c = c;
        object[ 1 ] = 4;
        delete object[ 0 ];

        const target = Object
            .keys( object )
            .map( key => object[ key ] );

        equal( object, target );

    } );

    it( "non-enumerable properties are omitted", () => {

        const object = { a: a, b: b };
        const target = [ a, b ];

        Object.defineProperty( object, "c", { enumerable: false, value: c } );

        equal( object, target );

    } );

    it( "inherited properties are omitted", () => {

        const F = function G() { };
        F.prototype.a = a;

        const f = new F();
        f.b = b;

        equal( f, [ b ] );

    } );

    it( "Symbol properties are omitted", () => {

        const object = { a: a, b: b, c: c };
        const enumSym = Symbol( "enum" );
        const nonEnumSym = Symbol( "non enum" );
        const target = [ a, b, c, enumSym ];

        object[ enumSym ] = enumSym;
        object.d = enumSym;
        Object.defineProperty( object, nonEnumSym, { enumerable: false, value: nonEnumSym } );

        equal( object, target );

    } );

    it( "not-yet-visited keys deleted on [[Get]] must not show up in output", () => {

        const o = { a: 1, b: 2, c: 3 };
        Object.defineProperty( o, "a", {
            get() {

                delete this.b;
                return 1;

            }
        } );

        equal( o, [ 1, 3 ] );

    } );

    it( "not-yet-visited keys made non-enumerable on [[Get]] must not show up in output", () => {

        const o = { a: "A", b: "B" };
        Object.defineProperty( o, "a", {
            get() {

                Object.defineProperty( o, "b", { enumerable: false } );
                return "A";

            }
        } );

        equal( o, [ "A" ] );

    } );

} );
