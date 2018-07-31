# react-native-intercom-webview

A React Native Component that renders [Intercom](https://www.intercom.com) in a React Native WebView.
This plugin supports React Native version 0.40.

# Usage

Inside your project directory, install the package:

`npm i react-native-intercom-webview`

You can use the component in your React Native component as follows:

### Import the IntercomWebView component:

```javascript
import IntercomWebView from 'react-native-intercom-webview';
```

### Render the IntercomWebView component:

#### Minimal configuration:

```javascript
<IntercomWebView
      appId="<Your intercom add id>"
      name="<Your user's name>"
      email="<Your user's email>"
/>
```

#### Configuration:

```javascript
<IntercomWebView
      appId="<Your intercom app_id>"
      name="<Your user's name>"
      email="<Your user's email>"
      userHash={`...`}
      showLoadingOverlay={false}
      defaultHeight={500}
      hideLauncher={true}
/>
```

Change the intercom details (appId, name, email) to your own.

The _hideLauncher_ prop hides the Intercom launcher icon and automatically shows the Intercom messages. This is useful for rendering the Intercom messages when a user clicks on your own custom launcher (e.g. a button).

If _defaultHeight_ is not provided, the IntercomWebView will attempt to fill the height of the window using the [Dimension](https://facebook.github.io/react-native/docs/dimensions.html#get) module.

Any other WebView props (exluding: _source, injectedJavaScript, javaScriptEnabled_) can be passed to the IntercomWebView component as props and they will be passed onto the underlying WebView component.

### Hook into `onHide` event (closing of intercom chat):

The example below assumes that you are using `react-navigation` and you want to navigate back.

```javascript
<IntercomWebView
      ...
      onMessage={(e) => e.nativeEvent.data === IntercomWebView.ON_HIDE_MESSAGE && this.props.navigation.goBack()}
      ...
/>
```


# Contribute
To contribute, create a Pull Request:

https://github.com/donovantc/react-native-intercom-webview

