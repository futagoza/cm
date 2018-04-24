/*!
 * mini-tpl
 *
 * This module contains code from 'https://github.com/niceue/tpl.js'
 *
 */

// required modules
var _ = require('./utils'), fs = require('./fs'),
	
	  // include template
	  INCLUDE = "include=function(f){return require('fs').readFileSync(_$.__dirname ? require('path').join(_$.__dirname, f) : f).toString();}";

// builds new tpl compiler
function TplCompiler ( html ) {
	var begin = '<%', end = '%>',
		  ecp = function ( str ) {
			  return str.replace(/('|\\)/g, '\\$1').replace(/\r\n/g, '\\r\\n').replace(/\n/g, '\\n');
		  },
		  str = "var __='',echo=function(s){__+=s}," + INCLUDE + ";with(_$||{}){",
		  blen = begin.length, elen = end.length, b = html.indexOf(begin), e, tmp;
	while ( b != -1 ) {
		e = html.indexOf(end);
		if ( e < b ) break;
		str += "__+='" + ecp(html.substring(0, b)) + "';";
		tmp = html.substring(b + blen, e).trim();
		if( tmp.indexOf('=') === 0 ) {
			tmp = tmp.substring(1);
			str += "typeof(" + tmp + ")!='undefined'&&(__+=" + tmp + ");";
		} else {
			str += tmp;
		}
		html = html.substring(e + elen);
		b = html.indexOf(begin);
	}
	str += "__+='" + ecp(html) + "'}return __";
	return new Function("_$", str);
}
module.exports = exports = TplCompiler;
exports.TplCompiler = TplCompiler;

// loads a template and ready's it with the compiler
function TemplateFile ( filename, callback ) {
	if ( callback ) {
		fs.readFile(filename, function(err, tpl){
			if ( err ) return callback(err);
			callback(null, new TplCompiler(tpl.toString()));
		});
	} else {
		return new TplCompiler(fs.readFileSync(filename).toString());
	}
}
exports.TemplateFile = TemplateFile;

// ready's a template with the compiler
function Template ( tpl, callback ) {
	if ( callback ) {
		callback(null, new TplCompiler(tpl));
	} else {
		return new TplCompiler(tpl);
	}
}
exports.Template = Template;

// loads a template and compiles it using data
function renderFile ( filename, data, callback ) {
	if ( !data ) data = {};
	if ( _.isFunction(data) ) {
		callback = data;
		data = arguments[2] || {};
	}
	data.__filename = data.__filename || filename;
	data.__dirname = data.__dirname || fs.dirname(filename);
	if ( callback ) {
		TemplateFile(filename, function(err, compile){
			callback(err, err ? null : compile(data));
		});
	} else {
		return TemplateFile(filename)(data);
	}
}
exports.renderFile = renderFile;

// compiles template using data
function render ( tpl, data, callback ) {
	if ( !data ) data = {};
	if ( _.isFunction(data) ) {
		callback = data;
		data = arguments[2] || {};
	}
	if ( _.has(data, '__filename') ) {
		data.__dirname = data.__dirname || fs.dirname(data.__filename);
	}
	if ( callback ) {
		Template(tpl, function(err, compile){
			callback(err, err ? null : compile(data));
		});
	} else {
		return Template(tpl)(data);
	}
}
exports.render = render;

// express and semplice
exports.__express = exports.renderFile;
exports.__semplice = exports.renderFile;
exports.__render = exports.render;