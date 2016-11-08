import { default as Scope } from './Scope';
import { default as globals, type } from './lib/globals';
import { default as operators } from './operators';
import { default as Table, registerLibs } from './Table';
import { default as LuaError } from './LuaError';
import { default as LuaYieldError } from './LuaYieldError';

window.StackTrace = require('stacktrace-js');

function ensureArray(value) {
	return (value instanceof Array) ? value : [value];
}

let namespace = global.starlight = global.starlight || {};
let _G = globals;

function call(scope, f, ...args) {
	if (!(f instanceof Function)) {
		if (f instanceof Table) {
			let mt, mm;
			if (
				(mt = f.metatable)
				&& (mm = mt.rawget('__call'))
			) {
				args.unshift(f);
				f = mm;
			}
		}
		if (!(f instanceof Function)) {
			let typ = type(f);
			throw new LuaError(`attempt to call a ${typ} value`);
		}
	}

	let fret = null;

	if (window.theCoroutine === null) {
		fret = f(...args);
	} else {
		try {
			fret = f(...args);
		} catch (e) {
			if (e instanceof LuaYieldError) {
				e.attachState(f, scope, args);
				// continue on your merry quest, sweet yieldo...~
				throw e;
			} else {
				// rethrow
				throw e;
			}
		}
	}

	return ensureArray(fret);
}


function init () {
	let userEnv = namespace.config && namespace.config.env;
	if (userEnv) {
		for (let key in userEnv) {
			globals.set(key, userEnv[key]);
		}
	}
}


init();

let runtime = namespace.runtime = {
	globalScope: new Scope(0, globals.strValues),
	_G,
	op: operators,
	T: Table,
	LuaError,
	call
};




// The following should be configurable

import { default as coroutine } from './lib/coroutine';
_G.set('coroutine', coroutine);

import { default as math } from './lib/math';
_G.set('math', math);

import { default as table, getn } from './lib/table';
_G.set('table', table);

import { default as string } from './lib/string';
_G.set('string', string);

import { default as os } from './lib/os';
_G.set('os', os);

import { default as _package } from './lib/package';
_G.set('package', _package);

registerLibs({ string, getn });
