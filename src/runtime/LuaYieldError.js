export default class LuaYieldError extends Error {
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
}
