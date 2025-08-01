local RunService = game:GetService("RunService")
local StarterPlayer = game:GetService("StarterPlayer")
local ServerScriptService = game:GetService("ServerScriptService")

return {
	mainDirectory = if RunService:IsServer() then ServerScriptService else StarterPlayer,
	COMPONENT_ID = "_component_id",
	COMPONENT_TAG = "_compo_component:",
	COMPONENT_ACTIVE = "_compo_active"
}