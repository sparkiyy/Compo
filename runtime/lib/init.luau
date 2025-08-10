local types = require(script.types)
export type component<TInstance, TFields> = types.component<TInstance, TFields>

return {
	launch = require(script.launch),
	createComponent = require(script.createComponent),
	fields = require(script.fields)
}