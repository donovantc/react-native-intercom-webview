import React, {Component} from 'react';
import { View, WebView } from 'react-native';


class IntercomWebView extends Component{
    injectedJS = (appId, name, email, hideLauncher) => {
        return `
            window.Intercom('boot', {
                app_id: '${appId}',
                name: '${name}',
                email: '${email}',
                hide_default_launcher: ${hideLauncher}
            });

            if (hideLauncher)
                window.Intercom('showMessages');`;
    }

    render(){
        const { appId, name, email, hideLauncher, defaultHeight } = this.props;
        
        return(
            <View style={[style.containerStyle], this.props.style}>
                <WebView source={require('./IntercomWebView.html')}
                         injectedJavaScript={this.injectedJS( appID, name, email, hideLauncher, defaultHeight )}
                         javaScriptEnabled={true}
                         domStorageEnabled={true}/>
            </View>
        )
    }
}
    
const style = {
    containerStyle: {
        height: 500
    }    
}    

export {IntercomWebView};
