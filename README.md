# react-native-intercom-webview

A React Native Component that renders Intercom (https://www.intercom.com/) in a React Native WebView.

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
             
# Contribute
This component is still in its infancy.

To contribute, create a Pull Request:

https://github.com/donovantc/react-native-intercom-webview

