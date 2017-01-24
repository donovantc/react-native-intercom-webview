import React, {Component } from 'react';
import { View, WebView, Dimensions } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

class IntercomWebView extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading: true
        };
    }

    componentDidMount = () => {
        this.setState({
            windowHeight: Dimensions.get('window').height
        });
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
        const { appId, name, email, hideLauncher, defaultHeight, showLoadingOverlay, ...remainingProps } = this.props;
        const { isLoading, windowHeight } = this.state;

        let height = defaultHeight || windowHeight;

        return(

            <View style={[{height: height}, this.props.style]}>
                <Spinner visible={showLoadingOverlay && isLoading} />
                <WebView source={require('./IntercomWebView.html')}
                         injectedJavaScript={this.injectedJS( appId, name, email, hideLauncher )}
                         javaScriptEnabled={true}
                         onLoadEnd={this.onLoadEnd}
                        {...remainingProps}
                />
            </View>
        )
    }
}

IntercomWebView.PropTypes = {
    appId: React.PropTypes.string,
    name: React.PropTypes.string,
    email: React.PropTypes.string,
    hideLauncher: React.PropTypes.bool,
    showLoadingOverlay: React.PropTypes.bool,
    defaultHeight: React.PropTypes.number
};

IntercomWebView.defaultProps = {
    hideLauncher: false,
    showLoadingOverlay: true
};

export default IntercomWebView;
