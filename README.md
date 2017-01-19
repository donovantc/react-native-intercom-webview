# react-native-intercom-webview

A React Native Component that renders [Intercom](https://www.intercom.com) in a React Native WebView.

# Usage

Inside your project directory, install the package:

`npm i react-native-intercom-webview`

You can use the component in your React Native component as follows:

1. Import the IntercomWebView component:

```javascript
import IntercomWebView from 'react-native-intercom-webview';
```

2. Render the IntercomWebView component:

```javascript
<IntercomWebView
      appId="intercomappId"
      name="intercom name"
      email="intercom email"
      defaultHeight={500}
      hideLauncher={false}
      showLoadingOverlay={true} />
```
             
Change the intercom details (appId, name, email) to your own.

The _hideLauncher_ prop hides the Intercom launcher icon and automatically shows the Intercom messages. This is useful for rendering the Intercom messages when a user clicks on your own custom launcher (e.g. a button).

If _defaultHeight_ is not provided, the IntercomWebView will attempt to fill the height of the window using the [Dimension](https://facebook.github.io/react-native/docs/dimensions.html#get) module.

Any other WebView props (exluding: _source, injectedJavaScript, javaScriptEnabled_) can be passed to the IntercomWebView component as props and they will be passed onto the underlying WebView component.

             
# Contribute
To contribute, create a Pull Request:

https://github.com/donovantc/react-native-intercom-webview

