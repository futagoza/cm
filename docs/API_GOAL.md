```javascript
const cm = require( "cm" );
```

`const command = cm.command` - [cm/command](src/command)
  * `command.isShort( arg )`
  * `command.isLong( arg )`
  * `const args = command.parse( [argv][, config] )`
    * `args.raw()`
    * `args.object()`
    * `args.count()`
    * `args.list()`
    * `args.stringify( [config][, formatter] )`
    * `args.defined( arg )`
    * `args.enabled( arg )`
    * `args.disabled( arg )`
    * `args.flag( key[, config] )`
    * `args.option( key[, config] )`
    * `args.on( arg, callback )`
    * `args.help( [config][, formatter] )`
  * `command.on( [argv, ]arg, callback )`
  * `command.clearLine( [stream] )`
  * `command.echo( [stream, ]data[, formatter] )`
  * `command.print( [stream, ]data[, formatter] )`

`const debug = cm.debug` - [cm/debug](src/debug)

`events` - [cm/events](src/events)

`filesystem` - [cm/filesystem](src/filesystem)

`const options = new cm.Options( [config] )` - [cm/options](src/options)
  * `options.defined( key )`
  * `options.get( key[, alternative] )`
  * `options.set( key, value[, config] )`
  * `options.delete( key[, config] )`
  * `options.copy( sourceKey[, targetKey][, config] )`
  * `options.freeze( key[, config] )`
  * `options.clone( [config] )`
  * `options.import( options[, config] )`
  * `options.export( keys[, config] )`
  * `options.remove( keys[, config] )`
  * `options.clear( [config] )`
  * `options.swap( otherOptions[, config] )`
  * `options.lock( [config] )`

`request` - [cm/request](src/request)

`util` - [cm/util](src/util)
