// required modules
var fs = require('fs'), path = require('path'),
    os = require('os'), vm = require('vm'), Module = require('module'),
    preprocess = require('./preprocess'),

    // TypeScript's only problem, no proper module api
    tsc = require.resolve("typescript").replace(/typescript\.js$/, "tsc.js"),
    tscScript = vm.createScript(fs.readFileSync(tsc, "utf8"), tsc);

// alters readFileSync
var nativeReadFileSync = fs.readFileSync;
function patchFS ( ) {
	fs.readFileSync = function ( filename ) {
		var data = nativeReadFileSync.apply(nativeReadFileSync, arguments);
		if ( exports.isTypeScript(filename) ) {
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

// utils
var __hasOwn = Object.prototype.hasOwnProperty;
function each(a,b,c){for(var d in a){if(__hasOwn.call(a,d))b.call(c||a,a[d],d,a);}}
function merge(a,b){for(var c in b){a[c]=b[c];}return a;}
function compact(a){var b=[];a.forEach(function(c){if(c)b.push(c);});return b;}
function resolve(a,b){return path.join(a,b);}
function tempFolder(){return resolve(os.tmpDir(),"tsfile_"+Math.floor(Math.random()*0xFFFFFFFF));}
function tsppOptions ( options ) {
	if ( options == null ) options = {};
	if ( !__hasOwn.call(options, 'nodeLib') ) options.nodeLib = true;
	if ( !__hasOwn.call(options, 'targetES5') ) options.targetES5 = true;
	if ( !__hasOwn.call(options, 'context') ) options.context = null;
	if ( !__hasOwn.call(options, 'whitespace') ) options.whitespace = true;
	if ( !__hasOwn.call(options, 'optimize') ) options.optimize = true;
	return options;
}
function setStyleFlags ( argv, options ) {
	if ( options.style && Array.isArray(options.style) ) {
		options.style.forEach(function(style){
			argv.push("--style"); argv.push(style);
		});
	}
	return argv;
}

// is given filename a typescript filename
exports.isTypeScript = function ( filename ) {
	return filename.slice(-3) === '.ts'
};
exports.isTypeScriptDef = function ( filename ) {
	return filename.slice(-5) === '.d.ts'
};

// compile typescript file to javascript file
function compileFile ( source, target, options ) {
	options = tsppOptions(options);
	var exitCode = 0, output,
		context = {
			process: merge(merge({}, process), {
				argv: compact(setStyleFlags([
					"node", "tsc.js", "--nolib",
					options.optimize ? null : "--nooptimizemodules",
					options.useWith ? "--noerroronwith" : null,
					options.comments ? "--comments" : null,
					options.whitespace ? null : "--minw",
					options.parseOnly ? "--parse" : null,
					options.declaration ? "--declaration" : null,
					options.sourcemap ? "--sourcemap" : null,
					options.infer ? "--inferProperties" : null,
				], options).concat(
					"--target", options.targetES5 ? "ES5" : "ES3",
					"--out", target,
					resolve(__dirname, "/lib.d.ts"),
					options.nodeLib ? resolve(__dirname, "/node.d.ts") : null,
					source
				)),
				exit: function ( code ) {
					exitCode = code;
				}
			}),
			require: require,
			module: module,
			setTimeout: setTimeout,
			Buffer: Buffer
		};

	if ( options.context ) {
		context = merge(context, options.context);
	}
	patchFS();
		tscScript.runInNewContext(context);
	restoreFS();

	if ( exitCode != 0 ) {
		throw new Error('Unable to compile TypeScript file.');
	}

	if ( fs.statSync(target).isDirectory() ) {
		output = resolve(target, path.basename(source, ".ts") + ".js");
	} else {
		output = target;
	}
	return {
		ts: function ( ) { return fs.readFileSync(source, 'utf8').toString(); },
		js: function ( ) { return fs.readFileSync(output, 'utf8').toString(); },
		filename: output
	};
}
exports.compileFile = compileFile;

// compile typescript code to javascript code
function compileCode ( sourceCode, options ) {
	if ( options == null ) options = {};
	var dirname = tempFolder(), filename = resolve(dirname, "/" + (options.filename || "source.ts"));
	fs.mkdirSync(dirname, 0777 & (~process.umask()));
	fs.writeFileSync(filename, sourceCode, 'utf8');
	return compileFile(filename, dirname, options);
}
exports.compileCode = compileCode;

// compile typescript to javascript
function compile ( source, options ) {
	if ( options == null ) options = {};
	if ( options.fromString == true ) {
		return compileCode(source, options).js();
	} else {
		return compileFile(source, options.output || tempFolder(), options).js();
	}
}
exports.compile = compile;

// compile and run typescript
exports.run = function ( code, options ) {
	if ( options == null ) options = {};
	var mainModule = require.main;
	if ( !__hasOwn.call(options, 'fromString') ) {
		options.fromString = true;
	}
	mainModule.filename = process.argv[1] = options.filename ? fs.realpathSync(options.filename) : '.';
	mainModule.moduleCache && (mainModule.moduleCache = {});
	mainModule.paths = require('module')._nodeModulePaths(path.dirname(fs.realpathSync(options.filename || '.')));
	if ( !exports.isTypeScript(mainModule.filename) || require.extensions ) {
		return mainModule._compile(compile(code, options), mainModule.filename);
	} else {
		return mainModule._compile(code, mainModule.filename);
	}
};

// compile and `eval` typescript
exports["eval"] = function ( code, options ) {
	if ( options == null ) options = {};
	if ( !(code = code.trim()) ) return;
	var Script, sandbox, _module, _require;

	Script = vm.Script;
	if ( Script ) {
		if ( options.sandbox != null ) {
			if ( options.sandbox instanceof Script.createContext().constructor ) {
				sandbox = options.sandbox;
			} else {
				sandbox = Script.createContext();
				each(options.sandbox, function(v,k){ sandbox[k] = v; });
			}
			sandbox.global = sandbox.root = sandbox.GLOBAL = sandbox;
		} else {
			sandbox = global;
		}
		sandbox.__filename = options.filename || 'eval';
		sandbox.__dirname = path.dirname(sandbox.__filename);
		if ( !(sandbox !== global || sandbox.module || sandbox.require) ) {
			sandbox.module = _module = new Module(options.modulename || 'eval');
			sandbox.require = _require = function(path) {
				return Module._load(path, _module, true);
			};
			_module.filename = sandbox.__filename;
			each(Object.getOwnPropertyNames(require), function(property){
				if ( property !== 'paths' ) {
					_require[property] = require[property];
				}
			});
			_require.paths = _module.paths = Module._nodeModulePaths(process.cwd());
			_require.resolve = function(request) {
				return Module._resolveFilename(request, _module);
			};
		}
	}

	if ( !__hasOwn.call(options, 'fromString') ) {
		options.fromString = true;
	}
	code = compile(code, options);
	if ( sandbox === global ) {
		return vm.runInThisContext(code);
	} else {
		return vm.runInContext(code, sandbox);
	}
};

// options for module loading
exports.moduleOptions = tsppOptions();
exports.setOptions = function ( options ) {
	merge(exports.moduleOptions, options);
};

// loads a typescript file as a node module
function loadModule ( module ) {
	var typescript = compileFile(module.filename, tempFolder(), exports.moduleOptions);
	module._compile(typescript.js(), typescript.filename);
}
exports.loadModule = loadModule;
if ( require.extensions ) {
	require.extensions[".ts"] = loadModule;
}