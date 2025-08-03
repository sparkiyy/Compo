return {
	sandboxload = function(source: string, enviroment: LuaSourceContainer)
		local fenv = getfenv()
		local fn = loadstring(source)

		if not fn then
			return
		end
		setfenv(fn :: any, {
			_G = fenv._G,
			game = game,
			print = print,
			require = fenv.require,
			script = enviroment,
		})

		return fn
	end,
}
