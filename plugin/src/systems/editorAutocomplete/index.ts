import { OnEnd, OnStart, System } from "@rbxts/comet";
import { String } from "@rbxts/jsnatives";
const ScriptEditorService = game.GetService("ScriptEditorService");
@System()
export class ComponentAutocompleteSystem implements OnStart, OnEnd {
	private readonly processName = "CompoAutocomplete";
	private readonly label = ":Component";
	private readonly code = `local Compo = require(game.ReplicatedStorage.Compo)

return Compo.createComponent(function(component)
	-- onEnable is called when the tag is attached to the instance
	function component:onEnable()
		print("Hello, World!", component.instance)
	end

	-- onDisable is called when the tag is removed from the instance or the instance is destroyed
	function component:onDisable()
		print("Goodbye, World!", component.instance)
	end
end)`;

	private autoComplete(request: Request, response: Response): Response {
		const item: CompletionItem = {
			label: this.label,
			kind: Enum.CompletionItemKind.Module,
			documentation: { value: "Quick! Make a Component!" },
			codeSample: `-- 'Component' transforms into:\n${this.code}`,
			textEdit: {
				newText: this.code,
				replace: {
					start: { line: request.position.line, character: 1 },
					end: { line: request.position.line, character: 10 },
				},
			},
		};
		if (
			String.startsWith(
				String.toLowerCase(this.label),
				String.toLowerCase(
					String.replace(request.textDocument.document?.GetLine(request.position.line)!, " ", ""),
				),
			)
		) {
			response.items.push(item);
		}
		return response;
	}

	onStart() {
		ScriptEditorService.RegisterAutocompleteCallback(
			this.processName,
			1,
			(request: Request, response: Response) => {
				return this.autoComplete(request, response);
			},
		);
	}

	onEnd() {
		ScriptEditorService.DeregisterAutocompleteCallback(this.processName);
	}
}
