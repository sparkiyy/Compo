--!strict

export type component = {
	fields: {any},
	instance: Instance,
	-- life cycle methods
	awake: (() -> ())?,
	onEnable: (() -> ())?,
	start: (() -> ())?,
	update: (() -> ())?,
	fixedUpdate: (() -> ())?,
	onDisable: (() -> ())?,
	onDestroy: (() -> ())?,
}

export type componentBuilder = {
	constructor: (instance: Instance) -> component,
	fields: {},
}

return nil