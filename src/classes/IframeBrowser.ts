import * as vscode from 'vscode';
import * as fs from 'fs';

export class IframeBrowser {
    static count: number = 0;
    public panel: vscode.WebviewPanel;
    constructor(
        public extensionUri: vscode.Uri,
        public target_url: string
    ) {
        IframeBrowser.count += 1;
        this.panel = vscode.window.createWebviewPanel(
            'light-browser',
            `Light Browser ${IframeBrowser.count}`,
            vscode.ViewColumn.Two,
            {
                enableScripts: true,
                enableFindWidget: true,
                retainContextWhenHidden: true,
                localResourceRoots: [
                    this.extensionUri
                ]
            }
        );
        this.panel.webview.html = this.getWebviewContent();
        this.listenMessages();
    }

    public async openUrl(url: string) {
        const _config = vscode.workspace.getConfiguration('lightBrowser');
        const browser = _config.get<string>('openBrowser') || 'default';
        const openModule = await import('open');
        const open = openModule.default;
        if(browser === 'default'){
            open(url);
        }
        else{
            const options = {app: {name: browser}};
            open(url, options);
        }
    }

    public listenMessages() {
        this.panel.webview.onDidReceiveMessage(message => {
            console.log(message);
            switch (message.command) {
                case 'goto.browser':
                    this.openUrl(message.url);
                    break;
            }
        });
    }

    getWebviewContent() {
        const htmlPath = vscode.Uri.joinPath(this.extensionUri, 'assets/index.html').fsPath;
        const styleSheets = ['reset', 'main'];
        const scripts = ['main'];
        let htmlContent = fs.readFileSync(htmlPath, 'utf8');
        for(const styleSheet of styleSheets){
            const styleUri = this.panel.webview.asWebviewUri(vscode.Uri.joinPath(this.extensionUri, `assets/css/${styleSheet}.css`));
            htmlContent = htmlContent.replace(`{{${styleSheet}.css}}`, styleUri.toString());
        }

        for(const script of scripts){
            const scriptUri = this.panel.webview.asWebviewUri(vscode.Uri.joinPath(this.extensionUri, `assets/js/${script}.js`));
            htmlContent = htmlContent.replace(`{{${script}.js}}`, scriptUri.toString());
        }

        htmlContent = htmlContent.replace('{{nav_url}}', this.target_url);
        htmlContent = htmlContent.replace('{{iframe_url}}', this.target_url);
        // console.log(htmlContent);
        return htmlContent;
    }
}