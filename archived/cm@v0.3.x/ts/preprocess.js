var fs = require('fs'), path = require('path');

function hex ( ch ) { return ch.charCodeAt(0).toString(16).toUpperCase(); }
function stringEscape ( string ) {
	return string//.trim()
			.replace(/\\/g,   '\\\\')
			.replace(/\x08/g, '\\b')
			.replace(/\t/g,   '\\t')
			.replace(/\n/g,   '\\n')
			.replace(/\f/g,   '\\f')
			.replace(/\r/g,   '\\r')
			.replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(ch) { return '\\x0' + hex(ch); })
			.replace(/[\x10-\x1F\x80-\xFF]/g,    function(ch) { return '\\x'  + hex(ch); })
			.replace(/[\u0180-\u0FFF]/g,         function(ch) { return '\\u0' + hex(ch); })
			.replace(/[\u1080-\uFFFF]/g,         function(ch) { return '\\u'  + hex(ch); });
}

function preprocess ( filepath, source ) {
	var match, result;
	if ( !source ) {
		source = fs.readFileSync(filepath, 'utf8').toString();
	}

	var DOUBLE = /"""([^"\\]*(\\.[^"\\]*)*)"""/g;
	while ( (match = DOUBLE.exec(source)) !== null ) {
		result = match[1].trim() === "" ? "" : '"' + stringEscape(match[1]) + '"';
		source = source.substring(0, match.index) + result + source.substring(DOUBLE.lastIndex);
	}

	var SINGLE = /'''([^'\\]*(\\.[^'\\]*)*)'''/g;
	while ( (match = SINGLE.exec(source)) !== null ) {
		result = match[1].trim() === "" ? "" : '"' + stringEscape(match[1]).replace(/"/g, '\\"').replace("#{", '#___{') + '"';
		source = source.substring(0, match.index) + result + source.substring(SINGLE.lastIndex);
	}

	var STRING_CODE = /#{(.*?)}/g;
	while ( (match = STRING_CODE.exec(source)) !== null ) {
		result = match[1].trim() === "" ? "" : '" + ' + match[1] + ' + "';
		source = source.substring(0, match.index) + result + source.substring(STRING_CODE.lastIndex);
	}
	source = source.replace('#___{', "#{");

	var REQUIRE = /\/\/[ \t]*#require[ \t]*("|')(.*?)("|')/g;
	while ( (match = REQUIRE.exec(source)) !== null ) {
		result = match[2].trim() === "" ? "" : "///<reference path='" + match[2] + ".d.ts' />";
		source = source.substring(0, match.index) + result + source.substring(INCLUDE.lastIndex);
	}

	var INCLUDE = /\/\/[ \t]*#include[ \t]*("|')(.*?)("|')/g, dirname = path.dirname(filepath);
	while ( (match = INCLUDE.exec(source)) !== null ) {
		result = match[2].trim() === "" ? "" : preprocess(path.join(dirname, match[2]));
		source = source.substring(0, match.index) + result + source.substring(INCLUDE.lastIndex);
	}

	return source;
}

module.exports = preprocess;