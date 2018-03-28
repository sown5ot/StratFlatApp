// @flow
import React, { Component } from "react";
import {
  Alert,
  AsyncStorage,
  ImageBackground,
  Image,
  Keyboard,
  Platform,
  TouchableOpacity,
  StatusBar,
  Dimensions
} from "react-native";
import { NavigationActions } from "react-navigation";
import {
  Container,
  Content,
  Text,
  Button,
  Icon,
  Item,
  Input,
  Label,
  View,
  Toast,
  Left,
  Right,
  Footer
} from "native-base";
import PopupDialog from "react-native-popup-dialog";
import TouchAble from "react-native-touch-able";
import * as mConstants from '../../utils/Constants';
import { signUpAction, skipAction } from "../../actions/index";
import { signUpReducer, skipReducer } from "../../reducers/index";
import { connect } from "react-redux";

import { Field, reduxForm } from "redux-form";
import * as mValidate from "../../utils/Validation";
import base64 from "base-64";

import styles from "./styles";
import commonColor from "../../theme/variables/commonColor";

var dismissKeyboard = require("dismissKeyboard");
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
const bg = require("../../../assets/background2.jpg");
const logo = require("../../../assets/gggg.png");
const login = require("../../../assets/btnstartt.png");

const required = value => (value ? undefined : "Required");
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxLength15 = maxLength(15);
const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
const minLength8 = minLength(8);
const minLength5 = minLength(5);
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;
const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? "Only alphanumeric characters"
    : undefined;

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      validateEmail: true,
      validatePassword: true
    };
  }

  componentWillReceiveProps(props) {
    if (props.signUpReducer.success || props.skipReducer.success) {
      AsyncStorage.setItem(mConstants.USER_INFO, JSON.stringify(props.skipReducer.data))
      setTimeout(() => {
        this.props.navigation.navigate("Home");
      }, 500);
    } else {
      if (props.signUpReducer.errorMessage){
        alert(props.signUpReducer.errorMessage);
      }
      if (props.skipReducer.errorMessage){
        alert(props.skipReducer.errorMessage);
      }
    }
  }

  signUp() {
    // console.log("oqoqpqopqoqpoqoeqwe", this.props)
    Keyboard.dismiss();
    // console.log("valid",this.state.email, this.state.password)
    if (
      mValidate.validateEmail(this.state.email) &&
      mValidate.validatePassword(this.state.password) &&
      this.state.email != "" &&
      this.state.password != ""
    ) {
      var params = {};
      params.email = this.state.email.toLowerCase().trim();
      params.username = this.state.email.toLowerCase().trim();
      // console.log('username', params.username)
      params.password1 = base64.encode(this.state.password).trim();
      params.password2 = base64.encode(this.state.password).trim();
      this.props.signUp(params);
      // console.log('Success');
    } else {
      if (!mValidate.validateEmail(this.state.email)) {
        this.setState({ validateEmail: false });
        alert("Invalid email address");
        return;
      }
      if (!mValidate.validatePassword(this.state.password)) {
        this.setState({ validatePassword: false });
        alert("Must be 5 character or more");
        return;
      }
      if (this.state.email.length == 0) {
        this.setState({ validateEmail: false });
        alert("Email field can not be blank");
        return;
      }
      if (this.state.password.length == 0) {
        this.setState({ validatePassword: false });
        alert("Password field can not be blank");
        return;
      }
    }
  }

  // skip() {
  //   // console.log("skip")
  //   this.props.skip();
  //   this.props.navigation.navigate("Home");
  // }

  render() {
    return (
      <Container>
        <StatusBar barStyle="light-content" />

        <ImageBackground source={bg} style={styles.background}>
          <Content contentContainerStyle={{ flex: 1 }}>
            <View style={styles.container}>
              <View style={styles.logoContainer}>
                <Image source={logo} style={styles.logo} />
                <Text style={styles.textCreateAccount}>Create Account</Text>
              </View>
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.formLogin}>
                <View style={styles.form}>
                  {/* <Field
                    name="email"
                    component={this.renderInput}
                    type="email"
                    validate={[email, required]}
                  />
                  <Field
                    name="password"
                    component={this.renderInput}
                    type="password"
                    validate={[alphaNumeric, minLength8, maxLength15, required]}
                  /> */}
                  <Item
                    style={{
                      backgroundColor: "#fff",
                      opacity: 0.5,
                      borderRadius: 5,
                      height: 40,
                      marginTop: 10
                    }}
                  >
                    <Label style={{ marginLeft: 5 }}>Email</Label>
                    <Input
                      onChangeText={text => this.setState({ email: text })}
                      value={this.state.email}
                    />
                  </Item>
                  <Item
                    style={{
                      backgroundColor: "#fff",
                      opacity: 0.5,
                      borderRadius: 5,
                      height: 40,
                      marginTop: 10
                    }}
                  >
                    <Label style={{ marginLeft: 5 }}>Password</Label>
                    <Input
                      onChangeText={text => this.setState({ password: text })}
                      value={this.state.password}
                    />
                  </Item>
                </View>
                <View
                  style={{
                    flex: 1,
                    marginRight: 20
                  }}
                >
                  <TouchableOpacity
                    onPress={() => this.signUp()}
                    style={styles.btnStart}
                  >
                    <Image
                      source={login}
                      style={styles.imageStart}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ backgroundColor: "transparent", flex: 1 }}>
                <View style={{ flex: 1 }}>
                  <Button
                    rounded
                    primary
                    block
                    large
                    style={styles.loginBtn}
                    onPress={() => this.login()}
                  >
                    <Text
                      style={
                        Platform.OS === "android"
                          ? { fontSize: 14, textAlign: "center" }
                          : { fontSize: 14, fontWeight: "700" }
                      }
                    >
                      sign in with Facebook
                    </Text>
                  </Button>
                </View>

                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row" }}>
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
                        onPress={() => this.props.navigation.navigate("Login")}
                      >
                        <Text
                          style={
                            (
                              [styles.skipBtn],
                              { top: Platform.OS === "ios" ? null : 0 }
                            )
                          }
                        >
                          Had an Account
                        </Text>
                      </Button>
                    </Right>
                  </View>
                </View>
              </View>
            </View>
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    // fetchData: url => dispatch(itemsFetchData(url))
    signUp: params => dispatch(signUpAction(params)),
    skip: () => dispatch(skipAction())
  };
}

const mapStateToProps = state => ({
  // items: state.signUp.items,
  signUpReducer: state.signUpReducer,
  skipReducer: state.skipReducer
  // isLoading: state.homeReducer.isLoading
});

const signupform = reduxForm({
  form: "signupform"
})(SignUpForm);
// export default SignUp;

export default connect(mapStateToProps, bindAction)(signupform);
