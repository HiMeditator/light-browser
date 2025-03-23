const vscode = acquireVsCodeApi();

const urlInput = document.getElementById('url-input');
const webview = document.getElementById('iframe-main');
const navBack = document.getElementById('nav-bar-back');
const navForward = document.getElementById('nav-bar-forward');
const navReload = document.getElementById('nav-bar-reload');
const navBrowser = document.getElementById('nav-bar-browser');

const history = [];
let pointer = -1;

function loadUrl() {
    let url = history[pointer];
    if(!url.startsWith('http://') && !url.startsWith('https://')){
        url = 'https://' + url;
    }
    urlInput.value = url;
    webview.src = url;
    console.log('laod', url);
}

urlInput.addEventListener('keydown', (event) => {
	if (event.key === 'Enter') {
        pointer += 1;
        console.log(pointer);
        console.log(history);
        if(pointer < history.length){
            history.splice(pointer, history.length - pointer);
        }
        history.push(urlInput.value);
		loadUrl();
	}
});

navBack.addEventListener('click', () => {
    if(pointer > 0){
        pointer -= 1;
        loadUrl();
    }
});

navForward.addEventListener('click', () => {
    if(pointer < history.length - 1){
        pointer += 1;
        loadUrl();
    }
});

navReload.addEventListener('click', () => {
    webview.src = webview.src;
});

navBrowser.addEventListener('click', () => {
    let url = urlInput.value;
    if(!url.startsWith('http://') && !url.startsWith('https://')){
        url = 'https://' + url;
    }
    vscode.postMessage({
        command: 'goto.browser',
        url: url
    });
});