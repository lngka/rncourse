import React, { Component } from 'react';
import { View, Button, StyleSheet, ImageBackground } from 'react-native';

import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import ButtonWithBackGround from '../../components/UI/ButtonWithBackGround/ButtonWithBackGround';

import startMainTabs from '../MainTabs/startMainTabs';

import backgroundImage from '../../assets/background.jpg';

class AuthScreen extends Component {
    loginHandler = () => {
        return startMainTabs();
    }
    
    render() {
        return (
            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                <View style={styles.container}>
                    <MainText>
                        <HeadingText>Please log in</HeadingText>
                    </MainText>
                    <ButtonWithBackGround color="#ffcccc" onPress={this.loginHandler}>Switch to Login</ButtonWithBackGround>
                    <View style={styles.inputContainer}>
                        <DefaultInput placeholder="Your Email Address"/>
                        <DefaultInput placeholder="Password"/>
                        <DefaultInput placeholder="Confirm password"/>
                    </View>
                    <ButtonWithBackGround color="#ccffff">Submit</ButtonWithBackGround>
                </View>
            </ImageBackground>    
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    backgroundImage: {
        width: "100%",
        flex: 1
    },
    inputContainer: {
        width: "80%"
    }
});

export default AuthScreen;