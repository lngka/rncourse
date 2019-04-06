import React, { Component } from "react";
import { View, StyleSheet, ImageBackground, Dimensions } from "react-native";

import startMainTabs from "../MainTabs/startMainTabs";
import DefaultInput from "../../components/UI/DefaultInput/DefaultInput";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import MainText from "../../components/UI/MainText/MainText";
import ButtonWithBackground from "../../components/UI/ButtonWithBackGround/ButtonWithBackGround";
import backgroundImage from "../../assets/background.jpg";

class AuthScreen extends Component {
  state = {
    viewMode: "portrait"
  }
  constructor(props) {
    super(props);
    Dimensions.addEventListener("change", (dims) => {
      this.setState({
        viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape"
      })
    });
  }

  loginHandler = () => {
    startMainTabs();
  };

  render() {
    var headingText = null;
    if (Dimensions.get("window").height > 500) {
      headingText = (
        <MainText>
          <HeadingText>Please Log In</HeadingText>
        </MainText>
      );
    } 
    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.container}>

          {headingText}
          <ButtonWithBackground color="#29aaf4" onPress={() => alert("Hello")}> Switch to Login </ButtonWithBackground>
          
          <View style={styles.inputContainer}>
            <DefaultInput placeholder="Your E-Mail Address" style={styles.input}/>
            <View style={this.state.viewMode === "portrait" ? styles.portraitPwInputContainer : styles.landscapePwInputContainer}>
              <View style={this.state.viewMode === "portrait" ? styles.portraitPwInput : styles.landscapePwInput}>
                <DefaultInput placeholder="Password" style={styles.input}/>
              </View>
              <View style={this.state.viewMode === "portrait" ? styles.portraitPwInput : styles.landscapePwInput}>
                <DefaultInput placeholder="Confirm Password" style={styles.input}/>
              </View>
            </View>
          </View>

          <ButtonWithBackground color="#29aaf4" onPress={this.loginHandler}>Submit</ButtonWithBackground>
  
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
  },
  input: {
    backgroundColor: "#eee",
    borderColor: "#bbb"
  },
  portraitPwInputContainer: {
    flexDirection: "column" ,
    justifyContent: "space-between"
  },
  landscapePwInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  portraitPwInput: {
    width: "100%"
  },
  landscapePwInput: {
    width: "45%"
  }
});

export default AuthScreen;
