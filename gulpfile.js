"use strict";

const src = require( "gulp" ).src;
const series = require( "gulp" ).series;
const task = require( "gulp" ).task;
const eslint = require( "gulp-eslint" );
const mocha = require( "gulp-mocha" );
const pump = require( "pump" );

// Run ESLint on all `.js` and `.ts` files used.
task( "lint", () => pump(

    src( [
        "packages/@futagoza/**/*.js",
        "gulpfile.js"
    ] ),
    eslint( { dotfiles: true } ),
    eslint.format(),
    eslint.failAfterError()

) );

// Run tests.
task( "test", () => pump(

    src( "packages/@futagoza/**/*.{spec,test}.js", { read: false } ),
    mocha()

) );

// Default task.
task( "default", series( "lint", "test" ) );
