import * as vscode from 'vscode';
import { LangDict } from './classes/LangDict'
import { IframeBrowser } from './classes/IframeBrowser';

export function activate(context: vscode.ExtensionContext) {
    const config = vscode.workspace.getConfiguration('lightBrowser');
    LangDict.instance(context.extensionUri);

    const iframeOpenBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
    iframeOpenBar.command = 'light-browser.iframe';
    iframeOpenBar.text = 'iBrowser';
    iframeOpenBar.tooltip = LangDict.get('desc.iframe.open');
    context.subscriptions.push(iframeOpenBar);
    if(config.get<boolean>('showStatusBarItem')){
        iframeOpenBar.show();
    }
    else {
        iframeOpenBar.hide();
    }

    const defaultOpen = vscode.commands.registerCommand('light-browser.default', (path) => {
        const file = vscode.Uri.file(path.fsPath).with({scheme: 'file'});
        vscode.env.openExternal(file);
    });
    context.subscriptions.push(defaultOpen);

    const iframeOpen = vscode.commands.registerCommand('light-browser.iframe', () => {
        new IframeBrowser(context.extensionUri);
    });
    context.subscriptions.push(iframeOpen);

    const configurationChange = vscode.workspace.onDidChangeConfiguration(event => {
        if(event.affectsConfiguration('lightBrowser.showStatusBarItem')){
            const val = vscode.workspace.getConfiguration('lightBrowser').get<boolean>('showStatusBarItem');
            console.log('Configuration changed.', val);
            if(val){
                iframeOpenBar.show();
            }
            else {
                iframeOpenBar.hide();
            }
        }
    });
    context.subscriptions.push(configurationChange);
}
export function deactivate() {}
