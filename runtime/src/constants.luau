local RunService = game:GetService("RunService")
local StarterPlayer = game:GetService("StarterPlayer")
local ServerScriptService = game:GetService("ServerScriptService")

return {
	realm = if RunService:IsServer() then ServerScriptService else StarterPlayer,
	update = if RunService:IsServer() then RunService.Heartbeat else RunService.PreRender,
	COMPONENT_ID = "_component_id",
	COMPONENT_TAG = "_compo_component:",
	COMPONENT_ACTIVE = "_component_active",
	COMPONENT_FIELD = "_component_field"
}