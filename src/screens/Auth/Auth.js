import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';

import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import startMainTabs from '../MainTabs/startMainTabs';

class AuthScreen extends Component {
    loginHandler = () => {
        return startMainTabs();
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Text>Please log in</Text>
                <Button title="Switch to Login"/>
                <View style={styles.inputContainer}>
                    <DefaultInput placeholder="Your Email Address"/>
                    <DefaultInput placeholder="Password"/>
                    <DefaultInput placeholder="Confirm password"/>
                </View>
                <Button title="Submit" onPress={this.loginHandler} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    inputContainer: {
        width: "80%"
    }
});

export default AuthScreen;