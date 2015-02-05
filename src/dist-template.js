(function(global){

  var __NAME__, require = (function(modules){

    var cache = {}, __hasOwnProperty = Object.prototype.hasOwnProperty;

    return function ( id ) {
      var name = id, module = cache[name];
      if ( !module ) {
        if ( !__hasOwnProperty.call(modules, name) ) {
          throw new Error("cannot find module '" + id + "'");
        }
        module = cache[name] = { exports: {} };
        modules[name].call({}, module, module.exports);
      }
      return module.exports;
    };

  })({

    __MODULES__

  }),
  factory = function ( ) {
    return require('__MAIN__');
  };

  if ( typeof define === 'function' ) {
    if ( define.amd ) define(factory);
    else define('__NAME__', [], factory);
  } else {
    __NAME__ = factory();
    if ( typeof exports !== 'undefined' ) {
      if ( typeof module !== 'undefined' ) {
        module.exports = __NAME__;
      }
      exports.__NAME__ = __NAME__;
    } else {
      global['__NAME__'] = __NAME__;
    }
  }

})(typeof global === "undefined" ? this : global);
