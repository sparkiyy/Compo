type Request = {
	position: {
		line: number;
		character: number;
	};
	textDocument: {
		document?: ScriptDocument;
		script?: LuaSourceContainer;
	};
};

type CompletionItem = {
	label: string;
	kind?: Enum.CompletionItemKind;
	tags?: Enum.CompletionItemTag[];
	detail?: string;
	documentation?: {
		value: string;
	};
	overloads?: number;
	learnMoreLink?: string;
	codeSample?: string;
	preselect?: boolean;
	textEdit?: {
		newText: string;
		replace: {
			start: { line: number; character: number };
			end: { line: number; character: number };
		};
	};
};

type Response = {
	items: CompletionItem[];
};
