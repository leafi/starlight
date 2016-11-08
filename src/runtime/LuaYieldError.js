/*export default class LuaYieldError extends Error {
	constructor(message) {
		super();
		this.message = message;
    this.states = [];
	}

  attachState(fun, scopes, extra) {
    this.states.push({
      fun,
      scopes,
      extra
    });
  }

	toString() {
		return `LuaYieldError (NOT AN ERROR): ${this.message}, ${JSON.stringify(this.states)}`;
	}
}*/

function LuaYieldError() {
	var tmp = Error.apply(this, arguments);
	tmp.name = this.name = 'LuaYieldError';
	this.message = tmp.message;
	this.stack = tmp.stack;
}
LuaYieldError.prototype = Object.create(Error.prototype, {
	constructor: {
		value: LuaYieldError,
		writable: true,
		configurable: true
	}
});
LuaYieldError.prototype.attachState = function(fun, scopes, extra) {
	if (this.states == null) {
		this.states = [];
	}
	this.states.push({ fun, scopes, extra });
};

/*function LuaYieldError(message) {
	this.message = message;
	this.stack = new Error().stack;
	this.states = [];
	this.attachState = function(fun, scopes, extra) {
		this.states.push({
			fun,
			scopes,
			extra
		});
	}
}
LuaYieldError.prototype = Object.create(Error.prototype);
LuaYieldError.prototype.name = "LuaYieldError";
LuaYieldError.prototype.message = "";
LuaYieldError.prototype.attachState = function(fun, scopes, extra) {
	if (this.states == null) {
		this.states = [];
	}
	this.states.push({
		fun,
		scopes,
		extra
	});
};
LuaYieldError.prototype.constructor = LuaYieldError;*/

export default LuaYieldError;
