<div align="center" >
    <img src="assets/icon/light-browser.png" width="90px" height="90px"/>
    <h1 align="center">light-browser</h1>
    <p>A simple plugin for opening files with the default application and browsing web pages via iframe within the IDE.</p>
    </p>
</div>

<hr>

## Features

- Open current file with default application
- Open a web page with `iframe`

## Usage

![](./assets/img/01.png)

### Opening files with the default application

> **Attention:** Files with special characters (such as Chinese characters) in the file path cannot be opened properly at present.

In the editor or explorer area, right-click, and choose `Open with default application` to open the file with default application outside the IDE.

For `html` files, you can configure the browser to open them in settings.

### Open a web page with `iframe`

> **Attention:** Web pages loaded using `iframe` in IDE have significant restrictions.
>
> - Cannot load local files
> - Cannot redirect web pages
> - Some web pages cannot be opened
> - Page scaling may not be appropriate
> 
> Therefore, it can only be used for simple web browsing and is not suitable for interacting with web pages.

Click on the `iBrowser` status bar item to open an `iframe` browser window within the IDE.

You can configure the default page address to open in settings.

You can also choose whether to display `iBrowser` in the status bar in settings.

## Settings

Search for `light browser` to find these settings.

![](./assets/img/02.png)