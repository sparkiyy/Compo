local t = require(script.Parent.Parent.t)

local function field<T>(checker: (T) -> { any }, defaultVal: T, fieldID: number) : (val: T) -> { default : T, field : number}
	return function(val)
        if (checker(val)) then
            return { default = val, field = fieldID }
        end

        return { default = defaultVal, field = fieldID } :: any
	end
end


return {
	string = field(t.string, "", 1),
	number = field(t.number, 0, 2),
    boolean = field(t.boolean, true, 3),
    vector3 = field(t.vector, Vector3.zero, 4),
    vector2 = field(t.Vector2, Vector2.zero, 5)
}