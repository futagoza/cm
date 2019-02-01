// required modules
var fs = require('./fs'),
    CoffeeScript = require("coffee-script"),
    _ = require("./utils");

// enum's are useful :D
function createEnum ( name, properties ) {
	var output = "";
	name = name.trim(); properties = properties.trim().split(",");
	if ( name != "" ) {
		output += "var " + name + " = {};\n";
	}
	properties.forEach(function(property, i){
		property = property.trim();
		if ( name != "" ) {
			output += name + "." + property + " = ";
		}
		output += property + " = " + i + ";\n";
	});
	return output;
}

// simple preprocessor
function preprocess ( filepath, source ) {
	var match, result;
	if ( !source ) {
		source = fs.readFileSync(filepath, 'utf8').toString();
	}

	var ENUM = /enum[ \t]*(.*?){[ \t\r\n]*(.*?)[ \t\r\n]*}/g;
	while ( (match = ENUM.exec(source)) !== null ) {
		source = source.substring(0, match.index) + createEnum(match[1], match[2]) + source.substring(INCLUDE.lastIndex);
	}

	if ( !filepath || filepath == "" ) {
		var INCLUDE = /#include[ \t]*("|')(.*?)("|')/g, dirname = fs.dirname(filepath);
		while ( (match = INCLUDE.exec(source)) !== null ) {
			result = match[2].trim() === "" ? "" : preprocess(fs.join(dirname, match[2]));
			source = source.substring(0, match.index) + result + source.substring(INCLUDE.lastIndex);
		}
	}

	return source;
}
exports.preprocess = preprocess;

// alters readFileSync
var nativeReadFileSync = fs.readFileSync;
function patchFS ( ) {
	fs.readFileSync = function ( filename ) {
		var data = nativeReadFileSync.apply(nativeReadFileSync, arguments);
		if ( exports.isCoffeeScript(filename) ) {
			console.log("preprocessing `%s` (%d bytes)", filename, data.length);
			try {
				data = preprocess(filename, data.toString());
			} catch ( e ) {
				throw console.log(e);
			}
		}
		return data;
	};
}
function restoreFS ( ) {
	fs.readFileSync = nativeReadFileSync;
}
function getFile ( ) {
	patchFS();
		var output = fs.readFileSync.apply(fs, arguments);
	restoreFS();
	return output;
}

// is given filename a coffee-script filename
exports.isCoffeeScript = function ( filename ) {
	return filename.slice(-7) === '.coffee'
};
exports.isCakefile = function ( filename ) {
	return fs.basename(filename) === 'Cakefile';
};

// compile coffee-script file to javascript file
function compileFile ( source, target, options ) {
	return CoffeeScript.compile(getFile(source), options || {});
}
exports.compileFile = compileFile;

// compile coffee-script code to javascript code
function compileCode ( sourceCode, options ) {
	if ( options == null ) options = {};
	return CoffeeScript.compile(preprocess(options.filename, sourceCode), options);
}
exports.compileCode = compileCode;

// compile coffee-script to javascript
function compile ( source, options ) {
	if ( options == null ) options = {};
	if ( options.fromString == true ) {
		return compileCode(source, options);
	} else {
		return compileFile(source, options.output, options);
	}
}
exports.compile = compile;

// compile and run coffee-script
exports.run = function ( code, options ) {
	if ( options == null ) options = {};
	return CoffeeScript.run(preprocess(options.filename, code), options);
};

// compile and `eval` coffee-script
exports["eval"] = function ( code, options ) {
	if ( options == null ) options = {};
	return CoffeeScript["eval"](preprocess(options.filename, code), options);
};

// options for module loading
exports.moduleOptions = {};
exports.setOptions = function ( options ) {
	_.merge(exports.moduleOptions, options);
};

// loads a coffee-script file as a node module
function loadModule ( module ) {
	module._compile(compileFile(module.filename, null, exports.moduleOptions), module.filename);
}
exports.loadModule = loadModule;
if ( require.extensions ) {
	require.extensions[".coffee"] = loadModule;
}