"use strict";

// constants

exports.EPSILON = require( "./std/number.EPSILON" );
exports.MAX_SAFE_INTEGER = require( "./std/number.MAX_SAFE_INTEGER" );
exports.MIN_SAFE_INTEGER = require( "./std/number.MIN_SAFE_INTEGER" );
exports.platform = require( "./platform" );

// any

exports.hasValue = require( "./hasValue" );
exports.isArray = Array.isArray;
exports.isArrayLike = require( "./isArrayLike" );
exports.isBoolean = require( "./isBoolean" );
exports.isDate = require( "./isDate" );
exports.isError = require( "./isError" );
exports.isFunction = require( "./isFunction" );
exports.isIterable = require( "./isIterable" );
exports.isNumber = require( "./isNumber" );
exports.isObject = require( "./isObject" );
exports.isRegExp = require( "./isRegExp" );
exports.isString = require( "./isString" );
exports.keyof = require( "./keyof" );
exports.nameof = require( "./nameof" );

// collection

exports.clone = require( "./clone" );
exports.copy = require( "./copy" );
exports.eachAs = require( "./eachAs" );
exports.forEach = require( "./forEach" );
exports.has = require( "./has" );
exports.hasKey = require( "./hasKey" );
exports.hasOwn = require( "./hasOwn" );
exports.map = require( "./map" );
exports.search = require( "./search" );
exports.update = require( "./update" );

// array

exports.arrayIncludes = require( "./std/array.includes" );
exports.cloneArray = require( "./array.clone" );
exports.flat = require( "./std/array.flat" );
exports.flatMap = require( "./std/array.flatMap" );
exports.flatten = require( "./array.flatten" );
exports.head = require( "./array.head" );
// exports.lastIndex = require( "./std/array.lastIndex" );
// exports.lastValue = require( "./std/array.lastValue" );
exports.tail = require( "./array.tail" );

// clock

exports.hrtime = require( "./clock.hrtime" );

// function

exports.functionArg = require( "./function.Arg" );
exports.firstArg = exports.functionArg.first;
exports.secondArg = exports.functionArg.second;
exports.thirdArg = exports.functionArg.third;
exports.fourthArg = exports.functionArg.fourth;
exports.fifthArg = exports.functionArg.fifth;

exports.attempt = require( "./function.attempt" );
exports.curry = require( "./function.curry" );
exports.defer = require( "./function.defer" );
exports.noop = require( "./function.noop" );
exports.poll = require( "./function.poll" );

// number

exports.isFinite = require( "./std/number.isFinite" );
exports.isInteger = require( "./std/number.isInteger" );
exports.isNaN = require( "./std/number.isNaN" );
exports.isSafeInteger = require( "./std/number.isSafeInteger" );
exports.isNegative = require( "./number.isNegative" );
exports.random = require( "./number.random" );
exports.percentage = require( "./number/percentage" );

// object

exports.cloneObject = require( "./object.clone" );
exports.defaults = require( "./object.defaults" );
exports.each = require( "./object.each" );
exports.extend = require( "./object.extend" );
exports.keys = Object.keys;
exports.mapObject = require( "./object.map" );
exports.merge = require( "./object.merge" );
exports.objectIncludes = require( "./object.includes" );
exports.values = require( "./object.values" );

// string

// exports.camelize = require( "./string.camelize" );
// exports.contains = require( "./string.contains" );
exports.replace = require( "./string.replace" );
exports.stringIncludes = require( "./std/string.includes" );
exports.indent = require( "./string/indent" );
