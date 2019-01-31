A wrapper around [stream.pipeline](https://nodejs.org/dist/latest-v10.x/docs/api/stream.html#stream_stream_pipeline_streams_callback) (based on [pump](https://www.npmjs.com/package/pump)) that:

* returns a promise
* accepts the use of promises, as well as normal functions
* accepts a single item
* only allows a function, promise or stream to be passed

```js
const pump = require( "@futagoza/pump" );
const fs = require( "fs" );

const source = fs.promises.readFile( "./package.json", "utf8" );
const getVersion = data => JSON.parse( data ).version;
const dest = fs.createWriteStream( "./VERSION" );

pump( source, getVersion, dest )
    .then( () => console.log( "Done!" ) )
    .catch( err => console.error( err ) );
```

-----

[![History](https://img.shields.io/badge/github.com/futagoza/cm-changelog-yellow.svg)](https://github.com/futagoza/cm/blob/master/CHANGELOG.md)
[![license](https://img.shields.io/badge/license-mit-blue.svg)](https://opensource.org/licenses/MIT)

_@futagoza/pump_ is Copyright (c) 2018+ Futago-za Ryuu
