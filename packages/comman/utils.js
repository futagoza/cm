// utils export
var _ = module.exports = {},

    // prototype shortcuts
    __object = Object.prototype,
    __array = Array.prototype,
    __hasOwn = __object.hasOwnProperty,
    __slice = __array.slice,
    __toString = __object.toString,
    __indexOf = __array.indexOf;

// shortcut for `Object.prototype.hasOwnProperty`
_.has = function ( object, key ) {
    return object && __hasOwn.call( object, key );
};
_.hasOwn = _.has;

// better `typeof`
_.is = function ( object, target ) {
    object = __toString.call( object ).slice( 8, -1 ).toLowerCase();
    return target ? object === target.toLowerCase() : object;
};
_.typeOf = _.type = _.is;

// es5 isArray polyfil
if ( !Array.isArray ) {
    Array.isArray = function ( object ) {
        return _.is( object, 'array' );
    };
}

// loops through an object firing the `iterator` on each value/key
var nativeForEach = !!__array.forEach;
_.each = function ( object, iterator, context ) {
    var key, length;
    if ( Array.isArray( object ) ) {
        if ( nativeForEach ) {
            object.forEach( iterator, context );
        } else {
            length = object.length;
            for ( key = 0; key < length; key++ ) {
                iterator.call( context, object[ key ], key, object );
            }
        }
    } else {
        for ( key in object ) {
            if ( _.has( object, key ) ) {
                iterator.call( context, object[ key ], key, object );
            }
        }
    }
};
_.foreach = _.forEach = _.each;

// `forEach` polyfil
if ( !nativeForEach ) {
    Array.prototype.forEach = function ( iterator, context ) {
        _.each( this, iterator, context );
    };
}

// another iterator function based on `_.each`, only with functions to emulate `continue` and `break`
var __continue = 'continue_' + Math.random(), __break = 'break_' + Math.random(), next = function () { throw __continue; };
_.check = function ( object, iterator, context ) {
    var key, length, result, end = function ( value ) { result = value; throw __break; };
    if ( _.is( object, 'array' ) ) {
        length = object.length;
        for ( key = 0; key < length; key++ ) {
            try {
                iterator.call( context, object[ key ], key, next, end, object );
            } catch ( e ) {
                if ( e === __continue ) continue;
                if ( e === __break ) return result;
                throw e;
            }
        }
    } else {
        for ( key in object ) {
            if ( _.has( object, key ) ) {
                try {
                    iterator.call( context, object[ key ], key, next, end, object );
                } catch ( e ) {
                    if ( e === __continue ) continue;
                    if ( e === __break ) return result;
                    throw e;
                }
            }
        }
    }
};
_.iterate = _.check;

// auto-add some javascript type checking functions
var types = "Object Array Function String Number RegExp Boolean Date Error";
_.each( types.split( ' ' ), function ( type ) {
    _[ 'is' + type ] = function ( object ) {
        return __toString.call( object ) === '[object ' + type + ']';
    };
} );

// returns the result of applying the mapper to all values in the object
if ( __array.map ) {
    _.map = function ( object, mapper, context ) {
        return __array.map.call( object, mapper, context );
    };
} else {
    _.map = function ( object, mapper, context ) {
        var result = [];
        _.each( object, function ( value, key ) {
            result[ key ] = mapper.call( context, value, key, source );
        } );
        return result;
    };
}

// returns all keys or values
_.keys = Object.keys || function ( object ) {
    return _.map( object, function ( v, key ) { return key; } );
};
_.values = function ( object ) {
    return _.map( object, function ( value ) { return value; } );
};

// by default, returns the first value in the object that passes the filter test
_.find = function ( source, test, options ) {
    if ( !options ) options = { context: source, limit: 1 };
    var result = _.isArray( source ) ? [] : {};
    _.check( source, function ( value, key, next, end ) {
        if ( test.call( options.context, value, key, source ) ) {
            result[ isArray ? result.length : key ] = value;
            if ( options.limit === result.length ) end();
        }
    } );
    return result;
};

// returns all values in the object that pass the filter test
_.filter = function ( source, test, context ) {
    var isArray = _.isArray( source ), result = isArray ? [] : {};
    _.each( source, function ( value, key ) {
        if ( test.call( context, value, key, source ) ) {
            result[ isArray ? result.length : key ] = value;
        }
    } );
    return result;
};

// removes all falsy values
_.compact = function ( object ) {
    return _.filter( object, function ( value ) {
        return value != null;
    } );
};

// shortcut for `Array.prototype.slice`
_.slice = function ( object, from, to ) {
    return __slice.call( object, from || 0, to );
};

// merges the target object with properties from the source object
_.merge = function ( target, source ) {
    var isArray = _.isArray( target );
    _.each( source, function ( value, key ) {
        if ( isArray ) {
            key = target.length;
        }
        target[ key ] = value;
    } );
    return target;
};

// extends the target object with properties from the source object
_.extend = function ( target, source ) {
    _.each( source, function ( value, key ) {
        target[ key ] = value;
    } );
    return target;
};

// simple class inheritance
_.inherits = function ( child, parent ) {
    function ctor() {
        this.constructor = child;
    }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
};

// a more user friendly version of `String.prototype.replace`
_.replace = function ( string, keywords ) {
    _.each( keywords, function ( newValue, oldValue ) {
        string = string.replace( new RegExp( oldValue, 'g' ), newValue );
    } );
    return string;
};
_.replace = _.str_replace;

// define a constant property
_.define = Object.defineProperty;
if ( Object.defineProperty ) {
    _.define = Object.defineProperty;
} else {
    _.define = function ( object, key, discripptor ) {
        object[ key ] = _.has( discripptor, 'value' ) ? discripptor.value : discripptor;
    };
}

// easy way to create date/time stamps
_.date = function ( DateObject ) {
    var data = [];
    _.each( _.slice( arguments, 1 ), function ( key ) {
        var value = DateObject[ "get" + key ]();
        if ( Number( value ) < 10 ) {
            value = '0' + value;
        }
        data.push( String( value ) );
    } );
    return data;
};
_.now = function () {
    return _.date.apply( _, [].concat( new Date() ).concat( arguments ) );
};

// generates a random number between `min` and `max`
_.random = function ( min, max ) {
    if ( typeof max !== 'number' ) max = min, min = 0;
    return min + ( 0 | Math.random() * ( max - min + 1 ) );
};

// generates a unique session id
var uids = [];
_.uid = function ( size, dictionary ) {
    if ( !size ) size = 10;
    if ( !dictionary ) {
        dictionary = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    }
    var uid = '', max = dictionary.length;
    while ( size-- > 0 ) {
        uid += dictionary[ _.random( 0, max ) ];
    }
    if ( uids.indexOf( uid ) === -1 ) uids.push( uid );
    else uid = _.uid( size, dictionary );
    return uid;
};

// shortcut for indexOf
_.contains = function ( object, value ) {
    var key;
    if ( _.isArray( object ) ) {
        return __indexOf.call( object, value ) !== -1;
    }
    for ( key in object ) {
        if ( _.has( object, key ) ) {
            if ( object[ key ] === value ) return true;
        }
    }
    return false;
};

// functional binding (es5 feature)
_.bind = Function.prototype.bind;
if ( !!_.bind ) {
    _.bind = function ( fn, context ) {
        var args = _.slice( arguments, 2 );
        return function () {
            return fn.apply( context, [].concat( args ).concat( arguments ) );
        };
    };
}

// platform independent version of Node's nextTick function
_.nextTick = function ( callback, context ) {
    var args = _.slice( arguments, 2 );
    window.setTimeout( function () {
        callback.apply( context, args );
    }, 0 );
};

// waits `ms` millisecond before invoking `fn` with passed on arguments
_.wait = function ( delay, fn ) {
    var args = [];
    if ( !fn ) {
        fn = delay;
        delay = 0;
    } else {
        args = _.slice( arguments, 2 );
    }
    return setTimeout( function () {
        fn.apply( null, args );
    }, delay );
};
