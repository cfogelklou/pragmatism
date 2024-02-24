// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { getGptCompletion } from './chatgpt';

let timeout: NodeJS.Timeout | undefined = undefined;

console.log('Extension loaded.');
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "vscode-medium-author-pro" is now active!');

	let disposable = vscode.commands.registerCommand('vscode-medium-author-pro.helloWorld', () => {
		const editor = vscode.window.activeTextEditor;
        if (editor) {
            vscode.window.showInformationMessage('Sending to GPT-3.5...');
            const text = editor.document.getText();
            const last500Chars = text.slice(-500);
            const buffer = Buffer.from(last500Chars, 'utf-8');

            getGptCompletion("You are a funny speaker in the style of James Mickens, and you are helping me to complete my Medium article. Can you please help me complete this given what I have written so far? Here it is:" + buffer).then((response) => {
                const snippet = new vscode.SnippetString(response);
                editor.insertSnippet(snippet);
            });
        }
		else {
			vscode.window.showInformationMessage('No active editor found');
		}

	});

	context.subscriptions.push(disposable);

	vscode.workspace.onDidChangeTextDocument(event => {
        if (event.document.languageId === 'markdown') {
            if (timeout) {
                clearTimeout(timeout);
            }

            timeout = setTimeout(() => {

                vscode.commands.executeCommand('vscode-medium-author-pro.helloWorld');
            }, 2000);
        }
    });
}

export function deactivate() {
    if (timeout) {
        clearTimeout(timeout);
    }
}
