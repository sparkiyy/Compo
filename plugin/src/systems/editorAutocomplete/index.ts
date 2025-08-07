import { OnEnd, OnStart, System } from "@rbxts/comet";
import { String } from "@rbxts/jsnatives";
const ScriptEditorService = game.GetService("ScriptEditorService");
@System()
export class ComponentAutocompleteSystem implements OnStart, OnEnd {
	private readonly processName = "CompoAutocomplete";
	private registered = false;
	private readonly label = ":Component";
	private readonly code = `local Compo = require(game.ReplicatedStorage.compo)
	
return Compo.createComponent(function(component)
	-- Called right after awake() and onEnable()
	function component.start()
		print("Start!", component.instance)
	end

	-- Called when the component is removed or the instance is destroyed
	function component.onDestroy()
		print("Destroyed!", component.instance)
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
		this.registered = true;
	}

	onEnd() {
		if (!this.registered) return;
		ScriptEditorService.DeregisterAutocompleteCallback(this.processName);
	}
}
