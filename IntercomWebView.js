import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, WebView, Dimensions } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

class IntercomWebView extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading: true
        };
        this.onLoadEnd = this.onLoadEnd.bind(this);
    }

    componentDidMount = () => {
        this.setState({
            windowHeight: Dimensions.get('window').height
        });
    }


    injectedJS = (appId, name, email, id, hideLauncher, userHash) => {
        return `
			(function() {
				var originalPostMessage = window.postMessage;
			
				var patchedPostMessage = function(message, targetOrigin, transfer) { 
				  originalPostMessage(message, targetOrigin, transfer);
				};
			
				patchedPostMessage.toString = function() { 
				  return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage'); 
				};
			
				window.postMessage = patchedPostMessage;
			  })();

            window.Intercom('boot', {
                ${id == null ? '' : 'user_id: "' + id + '",'},
                ${userHash == null ? '' : 'user_hash: "' + userHash + '",'}
                app_id: '${appId}',
                name: '${name}',
                email: '${email}',
                hide_default_launcher: ${hideLauncher}
            });
            if (${hideLauncher})
                window.Intercom('showMessages');
            window.Intercom('onHide', function () { window.postMessage && window.postMessage('onHide') })
                `;
    }

    onLoadEnd = () => {
        this.setState({isLoading: false});

        if (this.props.onLoadEnd)
            this.props.onLoadEnd();
    }

    dispatch = (message) => {
      if (message === 'onHide') {
        this.props.onHide && this.props.onHide();
      }
    }

    render(){
        const { appId, name, email, id, hideLauncher, defaultHeight, showLoadingOverlay, userHash, ...remainingProps } = this.props;
        const { isLoading, windowHeight } = this.state;

        let height = defaultHeight || windowHeight;

        return(

            <View style={[{height: height}, this.props.style]}>
                <Spinner visible={showLoadingOverlay && isLoading} />
                <WebView source={require('./IntercomWebView.html')}
                         injectedJavaScript={this.injectedJS( appId, name, email, id, hideLauncher, userHash )}
                         javaScriptEnabled={true}
                         onLoadEnd={this.onLoadEnd}
                         onMessage={e => this.dispatch(e.nativeEvent.data)}
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
    id: PropTypes.string || null
    hideLauncher: PropTypes.bool,
    showLoadingOverlay: PropTypes.bool,
    defaultHeight: PropTypes.number,
    userHash: PropTypes.string || null
};

IntercomWebView.defaultProps = {
    hideLauncher: false,
    showLoadingOverlay: true,
    id: null,
    userHash: null
};

export default IntercomWebView;
