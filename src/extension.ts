import * as vscode from 'vscode';
import { LangDict } from './classes/LangDict';
import { IframeBrowser } from './classes/IframeBrowser';

export function activate(context: vscode.ExtensionContext) {
    LangDict.instance(context.extensionUri);

    const iframeOpenBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
    iframeOpenBar.command = 'light-browser.iframe';
    iframeOpenBar.text = 'iBrowser';
    iframeOpenBar.tooltip = LangDict.get('desc.iframe.open');
    context.subscriptions.push(iframeOpenBar);

    const config = vscode.workspace.getConfiguration('lightBrowser');
    if(config.get<boolean>('showStatusBarItem')){
        iframeOpenBar.show();
    }
    else {
        iframeOpenBar.hide();
    }

    const defaultOpen = vscode.commands.registerCommand('light-browser.default', async (path) => {
        const filePath = path.fsPath;
        const fileUri = vscode.Uri.file(path.fsPath);
        const _config = vscode.workspace.getConfiguration('lightBrowser');
        const browser = _config.get<string>('openBrowser') || 'default';
        if(filePath.endsWith('.html') && browser !== 'default'){
            const openModule = await import('open');
            const open = openModule.default;
            const options = {app: {name: browser}};
            open(filePath, options);
        }
        else{
            vscode.env.openExternal(fileUri);
        }
    });
    context.subscriptions.push(defaultOpen);

    const iframeOpen = vscode.commands.registerCommand('light-browser.iframe', () => {
        const _config = vscode.workspace.getConfiguration('lightBrowser');
        let url = _config.get<string>('defaultMainPage') || 'https://www.example.com';
        if(!url.startsWith('http://') && !url.startsWith('https://')){
            url = 'https://' + url;
        }
        new IframeBrowser(context.extensionUri, url);
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
