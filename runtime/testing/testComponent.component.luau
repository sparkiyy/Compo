local Compo = require(game.ReplicatedStorage.compo)
	
return Compo.createComponent(function(component)
	-- onEnable is called when the tag is attached to the instance
	function component:onEnable()
		print("Hello, World!", component.instance)
		print("boolean: ", component.fields.boolean)
	end

	function component:update()
		print("I'm ",component.fields.string)
	end
	-- onDisable is called when the tag is removed from the instance or the instance is destroyed
	function component:onDisable()
		print("Goodbye, World!", component.instance)
	end
end, {
	number = Compo.fields.number(100),
	string = Compo.fields.string("A cool name"),
	boolean = Compo.fields.boolean(),
	vector3 = Compo.fields.vector3(),
	vector2 = Compo.fields.vector2()
}) 