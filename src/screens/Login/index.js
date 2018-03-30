// @flow
import React, { Component } from "react";
import { connect } from "react-redux";

import { NavigationActions } from "react-navigation";
import {
  Image,
  ImageBackground,
  Platform,
  StatusBar,
  TextInput
} from "react-native";
import {
  Container,
  Content,
  Text,
  Item,
  Input,
  Button,
  Icon,
  View,
  Left,
  Right,
  Toast,
  Label
} from "native-base";
import { Field, reduxForm } from "redux-form";
import * as Storage from "../../config/AsyncStorage";
import * as Constant from "../../utils/Constants";
import { signUpAction, skipAction } from "../../actions/index";
import { signUpReducer, skipReducer } from "../../reducers/index";
import { login } from "./actions";
import loginFetch from "./reducer";

import styles from "./styles";
import HandlingUserInfo from "../HandlingUserInfo";
// import commonColor from "../../theme/variables/commonColor";

const bg = require("../../../assets/background2.jpg");
const logo = require("../../../assets/gggg.png");
const startImage = require("../../../assets/btnstartt.png");

const required = value => (value ? undefined : "Required");
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxLength15 = maxLength(15);
const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
const minLength8 = minLength(8);
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;
const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? "Only alphanumeric characters"
    : undefined;

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    checkLogin: false
  };

  componentDidMount() {}
  renderInput({ input, label, type, meta: { touched, error, warning } }) {
    return (
      <View>
        <Item error={error && touched} rounded style={styles.inputGrp}>
          <Input
            onChangeText={text => {
              this.setStateInput(input.name, text);
            }}
            ref={c => (this.textInput = c)}
            placeholderTextColor="#FFF"
            style={styles.input}
            placeholder={input.name === "email" ? "Email" : "Password"}
            secureTextEntry={input.name === "password" ? true : false}
            {...input}
          />
          {touched && error
            ? <Icon
                active
                style={styles.formErrorIcon}
                onPress={() => this.textInput._root.clear()}
                name="close"
              />
            : <Text />}
        </Item>
        {touched && error
          ? <Text style={styles.formErrorText1}>
              {error}
            </Text>
          : <Text style={styles.formErrorText2}>error here</Text>}
      </View>
    );
  }
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validatePassword() {
    var password = this.state.password;
    if (password.length >= 6) {
      return true;
    }
    return false;
  }

  componentWillReceiveProps(props) {
    if (props.loginFetch.success) {
      console.log("345", props.loginFetch.data);
      Storage.setDataJson(Constant.USER_INFO, props.loginFetch.data.data);
      this.props.navigation.navigate("HandlingUserInfo");
    } else if (props.skipReducer.success) {
      Storage.setDataJson(Constant.USER_INFO, props.skipReducer.data.data);
      this.props.navigation.navigate("HandlingUserInfo");
    } else {
      alert("Login error");
    }
  }
  login() {
    if (!this.validateEmail(this.state.email)) {
      alert("Email is not correct");
    } else if (!this.validatePassword()) {
      alert("Pass is not correct");
    } else {
      var param = {};
      param.email = this.state.email;
      param.password = this.state.password;
      this.props.loginAction(param);
    }
  }

  render() {
    const navigation = this.props.navigation;
    return (
      
        <ImageBackground source={bg} style={styles.background}>
          <View style={{ flex: 1 }}>
            <View style={styles.logoContainer}>
              <Image source={logo} style={styles.logo} />
            </View>
            <View style={styles.screenNameContainer}>
              <Text style={styles.screenNameText}>Login</Text>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.inputContainer}>
              <View style={{ flex: 2 }}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Input Email"
                  placeholderTextColor="black"
                  underlineColorAndroid="transparent"
                  onChangeText={text => this.setState({ email: text })}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Choose Password"
                  placeholderTextColor="black"
                  underlineColorAndroid="transparent"
                  secureTextEntry={true}
                  onChangeText={text => this.setState({ password: text })}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Button onPress={() => this.login()} style={styles.btnStart}>
                  <Image
                    source={startImage}
                    style={styles.imageStart}
                    resizeMode="cover"
                  />
                </Button>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <Button
                rounded
                primary
                block
                large
                style={styles.fbLoginBtn}
                onPress={() => this.login()}
              >
                <Text
                  style={
                    Platform.OS === "android"
                      ? { fontSize: 16, textAlign: "center" }
                      : { fontSize: 16, fontWeight: "700" }
                  }
                >
                  sign in with Facebook
                </Text>
              </Button>
            </View>
            <View style={styles.bottomContainer}>
              <Left>
                <Button
                  light
                  small
                  transparent
                  style={styles.skip}
                  onPress={() => this.props.skip()}
                >
                  <Text
                    style={
                      (
                        [styles.skipBtn],
                        { top: Platform.OS === "ios" ? null : 0 }
                      )
                    }
                  >
                    Skip
                  </Text>
                </Button>
              </Left>
              <Right>
                <Button
                  light
                  small
                  transparent
                  style={styles.skip}
                  onPress={() => this.props.navigation.navigate("SignUp")}
                >
                  <Text
                    style={
                      (
                        [styles.skipBtn],
                        { top: Platform.OS === "ios" ? null : 0 }
                      )
                    }
                  >
                    Sign In
                  </Text>
                </Button>
              </Right>
            </View>
          </View>
        </ImageBackground>
      
    );
  }
}

const loginform = reduxForm({
  form: "loginform"
})(Login);

function bindActions(dispatch) {
  return {
    loginAction: params => dispatch(login(params)),
    skip: () => dispatch(skipAction())
  };
}
const mapStateToProps = state => ({
  loginFetch: state.loginFetch,
  skipReducer: state.skipReducer
});

// export default Login;
export default connect(mapStateToProps, bindActions)(Login);
