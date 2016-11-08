const hasOwnProperty = Object.prototype.hasOwnProperty;

export default class Scope {
	constructor(i, variables = {}) {
		this._i = i;
		this._variables = variables;
	}

	get(key) {
		return this._variables[key];
	}

	set(key, value) {
		let vars = this._variables;

		if (hasOwnProperty.call(this._variables, key) || !this.parent) {
			vars[key] = value;
		} else {
			this.parent.set(key, value);
		}
	}

	setLocal(key, value) {
		this._variables[key] = value;
	}

	setVarargs(value) {
		this._varargs = value;
	}

	getVarargs() {
		return this._varargs || this.parent && this.parent.getVarargs();
	}

	add(key, value) {
		this._variables[key] += value;
	}

	extend(outerScope) {
		let innerVars = Object.create(this._variables);
		let scope = new Scope(this._i + 1, innerVars);
		scope.parent = this;
		return scope;
	}
}
