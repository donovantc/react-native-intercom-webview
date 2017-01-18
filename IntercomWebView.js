import React, {Component } from 'react';
import { View, WebView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';


class IntercomWebView extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading: true
        };
    }

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

    onLoadEnd = () => {
        this.setState({isLoading: false});

        if (this.props.onLoadEnd)
            this.props.onLoadEnd();
    }

    render(){
        const { appId, name, email, hideLauncher, defaultHeight, showLoadingOverlay, loaderColor, ...remainingProps } = this.props;
        const { isLoading } = this.state;

        console.log(isLoading);

        return(

            <View style={[style.containerStyle, {height: defaultHeight}, this.props.style]}>
                <Spinner visible={showLoadingOverlay && isLoading} />
                <WebView source={require('./IntercomWebView.html')}
                         injectedJavaScript={this.injectedJS( appId, name, email, hideLauncher )}
                         javaScriptEnabled={true}
                         domStorageEnabled={true}
                         onLoadEnd={this.onLoadEnd}
                        {...remainingProps}
                />
            </View>
        )
    }
}

const style = {
    containerStyle: {
        height: 500
    }
}

IntercomWebView.PropTypes = {
    appId: React.PropTypes.string,
    name: React.PropTypes.string,
    email: React.PropTypes.string,
    hideLauncher: React.PropTypes.bool,
    showLoadingOverlay: React.PropTypes.bool,
    defaultHeight: React.PropTypes.number,
    loaderColor: React.PropTypes.string
};

IntercomWebView.defaultProps = {
    hideLauncher: false,
    showLoadingOverlay: true
};

export default IntercomWebView;
