import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, WebView, Dimensions } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';


class IntercomWebView extends Component{

    static ON_HIDE_MESSAGE = 'WEBVIEW_CLOSED';

    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            windowHeight: Dimensions.get('window').height
        };
        this.onLoadEnd = this.onLoadEnd.bind(this);
    }

    injectedJS = (appId, name, email, id = '', hideLauncher, userHash = '') => {
        const config = {
            user_id: id,
            user_hash: userHash,
            app_id: appId,
            name: name,
            email: email,
            hide_default_launcher: hideLauncher
        }

        return `
            // Fix onMessage: https://github.com/facebook/react-native/issues/10865#issuecomment-269847703
            var originalPostMessage = window.postMessage;
            var patchedPostMessage = function(message, targetOrigin, transfer) {
                originalPostMessage(message, targetOrigin, transfer);
            };
            patchedPostMessage.toString = function() {
                return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
            };
            window.postMessage = patchedPostMessage;

            window.Intercom('boot', ${JSON.stringify(config)});
            if (${hideLauncher}) window.Intercom('showMessages');
            window.Intercom('onHide', () => window.postMessage('${IntercomWebView.ON_HIDE_MESSAGE}'));
        `;
    }


    onLoadEnd = () => {
        this.setState({isLoading: false});

        if (this.props.onLoadEnd)
            this.props.onLoadEnd();
    }

    render(){
        const { appId, name, email, id, hideLauncher, defaultHeight, showLoadingOverlay, userHash, ...remainingProps } = this.props;
        const { isLoading, windowHeight } = this.state;

        let height = defaultHeight || windowHeight;

        return(

            <View style={[{height: height}, this.props.style, { flex: 1 }]}>
                <Spinner visible={showLoadingOverlay && isLoading} />
                <WebView source={require('./IntercomWebView.html')}
                    style={{ flex: 1 }}
                    injectedJavaScript={this.injectedJS( appId, name, email, id, hideLauncher, userHash )}
                    javaScriptEnabled={true}
                    onLoadEnd={this.onLoadEnd}
                    bounces={false}
                    {...remainingProps}
                />
            </View>
        )
    }
}

IntercomWebView.propTypes = {
    appId: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.string,
    hideLauncher: PropTypes.bool,
    showLoadingOverlay: PropTypes.bool,
    defaultHeight: PropTypes.number,
    userHash: PropTypes.string,
};

IntercomWebView.defaultProps = {
    hideLauncher: true,
    showLoadingOverlay: true,
    id: null,
    userHash: null,
    defaultHeight: 500,
};

export default IntercomWebView;
