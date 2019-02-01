// utils export
var _ = module.exports = {},
		
		// prototype shortcuts
		__object = Object.prototype,
		__array = Array.prototype,
		__hasOwn = __object.hasOwnProperty,
		__slice = __array.slice,
		__toString = __object.toString,
		__indexOf = __array.indexOf,
		__bind = Function.prototype.bind;

// shortcut for `Object.prototype.hasOwnProperty`
_.has = function ( object, key ) {
	return object && __hasOwn.call(object, key);
};

// better `typeof`
_.is = function ( object, target ) {
	object = __toString.call(object).slice(8, -1).toLowerCase();
	return target ? object === target.toLowerCase() : object;
};

// loops through an object firing the `iterator` on each value/key
_.each = function ( object, iterator, context ) {
	if ( Array.isArray(object) ) {
		object.forEach(iterator, context);
	} else {
		for ( var key in object ) {
			if ( _.has(object, key) ) {
				iterator.call(context, object[key], key, object);
			}
		}
	}
};

// another iterator function based on `_.each`, only with functions to emulate `continue` and `break`
var __continue = 'continue_' + Math.random(), __break = 'break_' + Math.random(), next = function ( ) { throw __continue; };
_.check = function ( object, iterator, context ) {
	var key, length, result, end = function ( value ) { result = value; throw __break; };
	if ( Array.isArray(object) ) {
		length = object.length;
		for ( key = 0; key < length; key++ ) {
			try {
				iterator.call(context, object[key], key, next, end, object);
			} catch ( e ) {
				if ( e === __continue ) continue;
				if ( e === __break ) return result;
				throw e;
			}
		}
	} else {
		for ( key in object ) {
			if ( _.has(object, key) ) {
				try {
					iterator.call(context, object[key], key, next, end, object);
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
_.each(types.split(' '), function(type){
	_['is' + type] = function ( object ) {
		return __toString.call(object) === '[object ' + type + ']';
	};
});

// is a Object or Array
_.isIterable = function ( object ) {
	return _.isArray(object) || _.isObject(object);
};

// is the object like a Array
_.isArrayLike = function ( object ) {
	return 'length' in object && typeof object !== 'function';
};

// returns the result of applying the mapper to all values in the object
function map ( object, mapper, context ) {
	var result = [];
	_.each(object, function(value, key){
		result[result.length] = mapper.call(context, value, key, object);
	});
	return result;
}
_.map = function ( object, mapper, context ) {
	return (Array.isArray(object) ? __array.map.call : map)(object, mapper, context);
};

// returns all keys or values
_.keys = Object.keys;
_.values = function ( object ) {
	return _.map(object, function(value){ return value; });
};

// shortcut for `Array.prototype.slice`
_.slice = function ( object, from, to ) {
	return __slice.call(object, from || 0, to);
};

// merges the target object with properties from the source object
_.merge = function ( target ) {
	var isArray = Array.isArray(target);
	_.slice(arguments, 1).forEach(function(source){
		_.each(source, function(value, key){
			if ( isArray ) {
				key = target.length;
			}
			target[key] = value;
		});
	});
	return target;
};

// extends the target object with properties from the source object
_.extend = function ( target ) {
	_.slice(arguments, 1).forEach(function(source){
		_.each(source, function(value, key){
			target[key] = value;
		});
	});
	return target;
};

// simple class inheritance
_.inherits = function ( child, parent ) {
	function ctor ( ) {
		this.constructor = child;
	}
	ctor.prototype = parent.prototype;
	child.prototype = new ctor();
};

// a more user friendly version of `String.prototype.replace`
_.replace = function ( string, keywords ) {
	_.each(keywords, function(newValue, oldValue){
		if ( !(oldValue instanceof RegExp) ) {
			oldValue = new RegExp(oldValue, 'g');
		}
		if ( newValue == "" || newValue == null ) {
			newValue = function ( ) { return ""; };
		}
		string = string.replace(oldValue, newValue);
	});
	return string;
};

// define constant properties
_.define = Object.defineProperty;
_.set = function ( object, key, value, getter, setter ) {
	_.define(object, key, { value: value, get: getter, set: setter, writable: false, configurable: true });
};
_.setValue = function ( object, key, value ) {
	_.set(object, key, value);
};
_.setGet = function ( object, key, getter ) {
	_.set(object, key, null, getter);
};
_.setSet = function ( object, key, setter ) {
	_.set(object, key, null, null, setter);
};

// easy way to create date/time stamps
_.date =  function ( DateObject ) {
	var data = [];
	_.each(_.slice(arguments, 1), function(key){
		var value = DateObject["get" + key]();
		if ( Number(value) < 10 ) {
			value = '0' + value;
		}
		data.push( String(value) );
	});
	return data;
};

// generates a random number between `min` and `max`
_.random = function ( min, max ) {
	if ( typeof max !== 'number' ) max = min, min = 0;
	return min + (0 | Math.random() * (max - min + 1));
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
		uid += dictionary[_.random(0, max)];
	}
	if ( uids.indexOf(uid) === -1 ) uids.push(uid);
	else uid = _.uid(size, dictionary);
	return uid;
};

// shortcut for indexOf
_.contains = function ( object, value ) {
	if ( object && !_.isBoolean(object) ) {
		if ( _.isArray(object) || _.isString(object) ) {
			return __indexOf.call(object, value) !== -1;
		}
		for ( var key in object ) {
			if ( _.has(object, key) ) {
				if ( object[key] === value ) return true;
			}
		}
	}
	return false;
};

// functional binding (es5 feature)
_.bind = function ( fn, context ) {
	return __bind.apply(fn, _.slice(arguments, 1));
};

// shortcut to node's nextTick function
_.nextTick = process.nextTick;

// waits `ms` millisecond before invoking `fn` with passed on arguments
_.wait = function ( delay, fn ) {
	var args = [];
	if ( !fn ) {
		fn = delay;
		delay = 0;
	} else {
		args = _.slice(arguments, 2);
	}
	return setTimeout(function(){
		fn.apply(null, args);
	}, delay);
};

// empty function
_.noop = function ( ) { };

// step's through the given callers
_.step = function ( ) {
	var result, length, steps, i;
	
	steps = arguments;
	length = steps.length;
	
	if ( length === 0 ) return;
	
	if ( length === 1 ) {
		steps[0].call(_.noop);
		return;
	}

	i = -1;
	next = function ( ) {
		result = steps[++i].apply(next, arguments);
	};
	while ( i < length ) {
		next(result);
	}
};

// returns the given object
_.id = function ( object ) { return object; };

// returns a function that returns the given object
_.cb = function ( object ) {
	return function ( ) { return object; };
};

// similar to bind, only no context
_.curry = function ( fn ) {
	var args = _.slice(arguments, 1);
	return function ( ) {
		return fn.apply(this, args.concat(_.slice(arguments)));
	};
};

// fills in arguments that are missing
_.partial = function ( fn ) {
	var baseArgs = _.slice(arguments, 1);
	return function ( ) {
		var args = baseArgs.slice(0), i, n = 0;
		for ( i = 0; i < args.length && n < arguments.length; i++ ) {
			if ( args[i] === undefined ) args[i] = arguments[n++];
		}
		return fn.apply(this, args);
	};
};

// runs a function once, useful if you've placed it in multiple places to polyfil a feature
_.once = function ( fn ) {
	var ran = false;
	return function ( ) {
		if ( !ran ) {
			ran = true;
			return fn.apply(this, arguments);
		}
	};
};

// indent each line in a string
_.indent = function ( data, indent, splitby ) {
	if ( !_.isString(indent) ) indent = "\t";
	if ( !_.isString(splitby) ) splitby = "\n";
	return data.split(splitby).map(function(line){
		return indent + line;
	}).join(splitby);
};

// short cut for `Date.now`
_.now = Date.now;

// calculates the percentage
_.calculatePercentage = function ( num, amount, fix ) {
	var percentage = (Math.abs(num / amount) * 100) || 0;
	return fix? percentage.toFixed(fix) : percentage;
};