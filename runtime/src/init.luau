-- hi ^.^
local types = require("@self/types")
export type component<TInstance, TFields> = types.component<TInstance, TFields>

return {
	launch = require("@self/launch"),
	createComponent = require("@self/createComponent"),
	fields = require("@self/fields")
}