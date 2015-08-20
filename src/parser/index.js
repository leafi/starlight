import { getRuntimeInit, generateJS } from './code-generator';
import { default as parser } from 'luaparse';

if (typeof global === undefined) {
	global = window;
}


function parseToString (input) {
	let ast = parser.parse(input);
	let js = getRuntimeInit() + generateJS(ast);
	let babel = global.babel;

	if (babel) {
		js = `()=>{${js}}`;
		js = babel.transform(js).code;
		js = js.substr(14, js.length - 15);
		js = js.replace('(function','return (function') + '.apply(void 0, arguments);';
	}

	return js;
}

function parse (input) {
	return (new Function('var global = this;' + parseToString(input))).bind(global || window);
}

function runScriptTags() {
	var scripts = document.querySelectorAll('script[type="application/x-lua"]');
	var script, i, modname, scriptBody;
	var lua = '';

	for (i = 0; script = scripts[i]; i++) {
		modname = script.dataset.modname;
		scriptBody = script.textContent;

		if (modname) {
			lua += " rawset(package.preload, '" + modname + "', function(...) " + scriptBody + " end) ";
		} else {
			lua += scriptBody;
		}
	}

	if (lua) {
		parse(lua)();
	}
}


if (global.document && global.document.querySelector('script[src$="starlight.js"][data-run-script-tags]')) {
	global.document.addEventListener('DOMContentLoaded', runScriptTags);
}

global.starlight = global.starlight || {};
global.starlight.parser = { 
	parse,
	parseToString,
	runScriptTags
};
