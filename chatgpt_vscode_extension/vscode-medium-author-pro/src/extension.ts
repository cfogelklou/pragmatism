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

    if (true){
        const disposable = vscode.commands.registerCommand('vscode-medium-author-pro.mickensMore', () => {
            const editor = vscode.window.activeTextEditor;
            if (editor) {
                vscode.window.showInformationMessage('Sending to GPT-3.5...');
                const text = editor.document.getText();
                const last500Chars = text.slice(-500);
                const buffer = Buffer.from(last500Chars, 'utf-8');

                getGptCompletion("You are James Mickens, and you are helping me to complete my Medium article. Write a paragraph giving color to the last sentence in this text:" + buffer).then((response) => {
                    const snippet = new vscode.SnippetString(response);
                    editor.insertSnippet(snippet);
                });
            }
            else {
                vscode.window.showInformationMessage('No active editor found');
            }

        });

        context.subscriptions.push(disposable);
    }

    if (true){
        const disposable = vscode.commands.registerCommand('vscode-medium-author-pro.mickensOnParagraph', () => {
            const editor = vscode.window.activeTextEditor;
            if (editor) {
                vscode.window.showInformationMessage('Sending to GPT-3.5...');
                const text = editor.document.getText(editor.selection);
                const buffer = Buffer.from(text, 'utf-8');

                getGptCompletion("You are James Mickens, and you are helping me to complete my Medium article. Write a paragraph giving your colorful prognostications to this text, but don't mention yourself :" + buffer).then((response) => {
                    editor.edit(editBuilder => {
                        editBuilder.insert(editor.selection.end, "\r\n"+response);
                    });
                });
            }
            else {
                vscode.window.showInformationMessage('No active editor found');
            }

        });

        context.subscriptions.push(disposable);
    }

    // The command has been defined in the package.json file
}

export function deactivate() {
    if (timeout) {
        clearTimeout(timeout);
    }
}
