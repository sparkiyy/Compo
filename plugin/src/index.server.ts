import { Comet, LogLevel } from "@rbxts/comet";

Comet.createApp("Compo", true);
Comet.addPaths(script.WaitForChild("systems"));

Comet.configureLogger(LogLevel.VERBOSE)
Comet.launch();