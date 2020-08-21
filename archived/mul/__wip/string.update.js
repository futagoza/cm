"use strict";

/*

Instead of:

```js
function capitalize( str ) {

    return str[ 0 ].toUpperCase() + str.slice( 1 );

}

capitalize( "futago-za" ); // Futago-za
```

use this:

```js
// any of these will produce: Futago-za
update( "futago-za", s => s.toUpperCase() );
update( "futago-za", 0, s => s.toUpperCase() );
update( "futago-za", [ 0, 1 ], s => s.toUpperCase() );

```

*/
