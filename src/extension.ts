import * as vscode from 'vscode';
import { IframeBrowser } from './classes/IframeBrowser';
export function activate(context: vscode.ExtensionContext) {
    const openBrowser = vscode.commands.registerCommand('light-browser.open', () => {
        const browser = new IframeBrowser(context.extensionUri);
    });
}
export function deactivate() {}
