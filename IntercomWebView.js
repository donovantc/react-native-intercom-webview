import React, {Component} from 'react';
import { View, WebView, Text } from 'react-native';


export default class IntercomWebView extends Component{
    injectedJS = (appId, name, email, hideLauncher) => {
        return `
            window.Intercom('boot', {
                app_id: '${appId}',
                name: '${name}',
                email: '${email}',
                hide_default_launcher: ${hideLauncher}
            });
            
            if (${hideLauncher})
                window.Intercom('showMessages');`;
    }

    render(){
        const { appId, name, email, hideLauncher, defaultHeight } = this.props;
        
        return(

            <View style={[style.containerStyle, {height: defaultHeight}, this.props.style]}>
            <Text>Goodbye</Text>
                <WebView source={require('./IntercomWebView.html')}
                         injectedJavaScript={this.injectedJS( appId, name, email, hideLauncher )}
                         javaScriptEnabled={true}
                         domStorageEnabled={true}/>
            </View>
        )
    }
}
    
const style = {
    containerStyle: {
        height: 500,
        marginTop: 10
    }    
}    


