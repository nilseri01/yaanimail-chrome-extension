# (Unofficial) YaaniMail Chrome Extension

This is an ongoing Chrome Extension project developed with React, Redux and Bootstrap. Font Awesome is used for icons in the pages.

<img src="https://img.shields.io/badge/Language-React-blueviolet.svg">

## Screenshots

![ScreenShot](https://raw.githubusercontent.com/nilseri01/yaanimail-chrome-extension/master/screenshots/add_extension_to_chrome.png)

## How to Build:

To install project dependencies:

```
yarn install
```

Please ensure API url is the same as defined with REACT_APP_GATEWAY_API_URL key in environments/.env.individual file before build.
Build for individual version:

```
yarn build:i
```

Please ensure API url is the same as defined with REACT_APP_GATEWAY_API_URL key in environments/.env.enterprise file before build.
Build for enterprise version:

```
yarn build:e
```

## Prerequisites and Installation

Chrome browser is required since this is an extension specifically developed for Chrome.

To be able to load your project (after build) to Chrome, you need to enable "Developer mode" on your Chrome under Extensions.
After that, three buttons appear on the left. By clicking "Load unpacked" button, you are now allowed to select your project's "build" folder.

Under "extensions" (chrome://extensions/), you should be able to see your extension. You can also pin it to keep it in the toolbar.

![ScreenShot](https://raw.githubusercontent.com/nilseri01/yaanimail-chrome-extension/master/screenshots/add-extension-to-chrome.png)

## Usage

You can start to use the application after you create your individual account from [YaaniMail](https://www.yaanimail.com/). If you already have an account, you can use it.
Enterprise version is only available for enterprises using [YaaniMail](https://kurumsal.yaanimail.com/) as their corporate mail service.

## Authors / Contributors / Credits

**Nil Seri**

[Github 1](https://github.com/senoritadeveloper01)

[Github 2](https://github.com/nilseri01)

[my Medium profile](https://senoritadeveloper.medium.com/)

You can visit [my Medium post](https://senoritadeveloper.medium.com/) where you can find details about important steps for implementing this project.

## Copyright & Licensing Information

This project is licensed under the terms of the MIT license.
