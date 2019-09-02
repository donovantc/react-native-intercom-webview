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

    injectedJS = (appId, name, email, id = '', hideLauncher, userHash = '') => {
        const config = {
            user_id: id,
            user_hash: userHash,
            app_id: appId,
            name: name,
            email: email,
            hide_default_launcher: hideLauncher
        }

        let strConfig = ''
        try {
            strConfig = JSON.stringify(config)
        } catch(e){
            console.log('Unable to stringify config', e)
        }
          
        return `
            window.Intercom('boot', ${strConfig});

            if (${hideLauncher})
                window.Intercom('showMessages');
        `;
    }

    onLoadEnd = () => {
        this.setState({isLoading: false});

        if (this.props.onLoadEnd)
            this.props.onLoadEnd();
    }

    render(){
        const { appId, name, email, id, hideLauncher, defaultHeight, showLoadingOverlay, userHash, onHide, ...remainingProps } = this.props;
        const { isLoading, windowHeight } = this.state;

        let height = defaultHeight || windowHeight;

        return(

            <View style={[{height: height}, this.props.style, {flex: 1}]}>
                <Spinner visible={showLoadingOverlay && isLoading} />
                <WebView source={require('./IntercomWebView.html')}
                         style={{flex: 1, backgroundColor: '#fff', overflow: 'hidden'}}
                         injectedJavaScript={this.injectedJS( appId, name, email, id, hideLauncher, userHash, onHide )}
                         javaScriptEnabled={true}
                         onLoadEnd={this.onLoadEnd}
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
    id: PropTypes.string || null,
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
