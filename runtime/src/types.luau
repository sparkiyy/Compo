--!strict

export type component<TInstance, TFields> = {
	fields: TFields,
	instance: TInstance,
	-- life cycle methods
	awake: (() -> ())?,
	onEnable: (() -> ())?,
	start: (() -> ())?,
	update: (() -> ())?,
	fixedUpdate: (() -> ())?,
	onDisable: (() -> ())?,
	onDestroy: (() -> ())?,
}

export type componentBuilder<TInstance, TFields> = {
	constructor: (instance: Instance, refinatedFields : {}) -> component<TInstance, TFields>,
	fields: {},
}

return nil