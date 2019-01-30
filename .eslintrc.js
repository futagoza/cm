"use strict";

const tests = require( "eslint-config-futagozaryuu/test" );
tests.files = [ "*.spec.js", "*.test.js" ];

module.exports = {

    "extends": "futagozaryuu/node-v6",
    "overrides": [ tests ],
    "root": true,

};
