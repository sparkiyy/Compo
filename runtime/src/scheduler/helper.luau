--[=[
    Calls a function, if an error ocurred doesnt stop the thread.
    @param The callback to be called
    @return Whatever the callback returned
]=]
local function call<T...>(callable: ((T...) -> any)?, yield: boolean?, ...:T...): any
    if not callable  then return nil end
    local arg: any = {...}

    if yield then 
        local s, e = pcall(callable, ...)
        if not s then warn(`[🟠WARNING] an error ocurred running component phase: {e}`) end
        return e
    else 
        xpcall(function() return callable(unpack(arg)) end, function(e)
            warn(`[🟠WARNING] an error ocurred running component phase: {e}`)
        end)
        return nil 
    end
end

return {
    call = call
}