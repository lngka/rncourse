import React, { Component } from "react";
import { View, StyleSheet, ImageBackground, Dimensions } from "react-native";

import startMainTabs from "../MainTabs/startMainTabs";
import DefaultInput from "../../components/UI/DefaultInput/DefaultInput";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import MainText from "../../components/UI/MainText/MainText";
import ButtonWithBackground from "../../components/UI/ButtonWithBackGround/ButtonWithBackGround";
import backgroundImage from "../../assets/background.jpg";

import validate from "../../utility/validation";
import { connect } from 'react-redux';
import { tryAuth } from "../../store/actions/index";

class AuthScreen extends Component {
  state = {
    viewMode: "portrait",
    controls: {
      email: {
        value: "",
        valid: false,
        validationRules: {
          isEmail: true
        },
        touched: false        
      },
      password: {
        value: "",
        valid: false,
        validationRules: {
          minLength: 6
        },
        touched: false
      },
      confirmPassword: {
        value: "",
        valid: false,
        validationRules: {
          equalTo: "password"
        },
        touched: false
      }
    }
  }
  constructor(props) {
    super(props);
    Dimensions.addEventListener("change", this.updateStyles);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.updateStyles);
  }

  updateStyles = (dims) => {
    this.setState({
      viewMode: dims.window.height > 500 ? "portrait" : "landscape"
    })
  }

  loginHandler = () => {
    const authData = {
      email: this.state.controls.email.value,
      password: this.state.controls.password.value
    };
    this.props.onLogin(authData);
    startMainTabs();
  };

  updateInputState = (key, value) => {
    let connectedValue = {};
    if(this.state.controls[key].validationRules.equalTo) {
      const equalControl = this.state.controls[key].validationRules.equalTo;
      const equalValue =  this.state.controls[equalControl].value;
      connectedValue = {
        ...connectedValue,
        equalTo: equalValue
      }
    }
    if( key === "password") {
      const equalControl = "password";
      const equalValue =  this.state.controls[equalControl].value;
      connectedValue = {
        ...connectedValue,
        equalTo: equalValue
      }
    }
    this.setState(prevState => {
      return {
        ...prevState,
        controls: {
          ...prevState.controls,
          confirmPassword: {
            ...prevState.controls.confirmPassword,
            valid: key === "password" ? validate(prevState.controls.confirmPassword.value, prevState.controls.confirmPassword.validationRules, connectedValue) : prevState.controls.confirmPassword.valid
          },
          [key]: {
            ...prevState.controls[key],
            value: value,
            valid: validate(value, prevState.controls[key].validationRules, connectedValue),
            touched: true
          }
        }
      }
    })
  }

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
          <ButtonWithBackground color="#29aaf4" onPress={() => console.log(this.state)}> Switch to Login </ButtonWithBackground>
          
          <View style={styles.inputContainer}>
            <DefaultInput 
              placeholder="Your E-Mail Address" 
              style={styles.input} 
              value={this.state.controls.email.value}
              onChangeText={(val) => this.updateInputState("email", val)}
              valid={this.state.controls.email.valid}
              touched={this.state.controls.email.touched}
              />
            <View style={this.state.viewMode === "portrait" ? styles.portraitPwInputContainer : styles.landscapePwInputContainer}>
              <View style={this.state.viewMode === "portrait" ? styles.portraitPwInput : styles.landscapePwInput}>
                <DefaultInput 
                  placeholder="Password" 
                  style={styles.input}
                  value={this.state.controls.password.value}
                  onChangeText={(val) => this.updateInputState("password", val)} 
                  valid={this.state.controls.password.valid} 
                  touched={this.state.controls.password.touched}
                  />
              </View>
              <View style={this.state.viewMode === "portrait" ? styles.portraitPwInput : styles.landscapePwInput}>
                <DefaultInput 
                  placeholder="Confirm Password" 
                  style={styles.input}
                  value={this.state.controls.confirmPassword.value}
                  onChangeText={(val) => this.updateInputState("confirmPassword", val)}
                  valid={this.state.controls.confirmPassword.valid}
                  touched={this.state.controls.confirmPassword.touched}
                  />
              </View>
            </View>
          </View>

          <ButtonWithBackground 
            color="#29aaf4" 
            onPress={this.loginHandler}
            disabled={!this.state.controls.email.valid || !this.state.controls.password.valid || !this.state.controls.confirmPassword.valid}
            >
              Submit
          </ButtonWithBackground>
  
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

const mapDispatchToProp = (dispatch) => {
  return {
    onLogin: (authData) => dispatch(tryAuth(authData))
  };
}

export default connect(null, mapDispatchToProp) (AuthScreen);

