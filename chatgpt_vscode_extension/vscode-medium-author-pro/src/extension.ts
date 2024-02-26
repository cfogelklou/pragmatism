// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { getGptCompletion } from './chatgpt';

console.log('Extension loaded.');
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "vscode-medium-author-pro" is now active!');

  if (true) {
    const disposable = vscode.commands.registerCommand(
      'vscode-medium-author-pro.mickensOnParagraph',
      () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
          vscode.window.showInformationMessage('Sending to chatGPT...');
          const text = editor.document.getText(editor.selection);
          const buffer = Buffer.from(text, 'utf-8');

          getGptCompletion(
            "You are James Mickens, and you are helping me to complete my Medium article. Write a paragraph giving your colorful prognostications to this text, but don't mention yourself :" +
              buffer,
          ).then((response) => {
            editor.edit((editBuilder) => {
              editBuilder.insert(editor.selection.end, '\r\n' + response);
            });
          });
        } else {
          vscode.window.showInformationMessage('No active editor found');
        }
      },
    );

    context.subscriptions.push(disposable);
  }

  if (true) {
    const disposable = vscode.commands.registerCommand(
      'vscode-medium-author-pro.mickensOnCommand',
      () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
          const text = editor.document.getText(editor.selection);
          const buffer = Buffer.from(text, 'utf-8');

          vscode.window.showInputBox({ prompt: 'Enter your command' }).then((value) => {
            if (value) {
              const command: string = value;
              let prompt =
                'You are James Mickens, and you are helping me to complete my Medium article. I have written this text... what should I write next?';
              if (buffer.length > 0) {
                prompt += command + ':' + buffer;
              } else {
                prompt += command;
              }
              vscode.window.showInformationMessage('Sending to chatGPT...'); // Ask chatGPT for completion
              getGptCompletion(prompt).then((response) => {
                // Get the completion
                editor.edit((editBuilder) => {
                  // Insert the completion into the editor
                  editBuilder.insert(editor.selection.end, '\r\n' + response);
                });
              });
            }
          });
        } else {
          vscode.window.showInformationMessage('No active editor found');
        }
      },
    );

    context.subscriptions.push(disposable);
  }

  // The command has been defined in the package.json file
}

export function deactivate() {}
