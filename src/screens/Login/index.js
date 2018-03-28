// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import { Image, ImageBackground, Keyboard, Platform, StatusBar } from "react-native";
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
import base64 from 'base-64';
import {login} from "./actions";
import loginFetch from "./reducer";
import { skipAction } from "../../actions/index";

import styles from "./styles";
// import commonColor from "../../theme/variables/commonColor";

const bg = require("../../../assets/background2.jpg");
const logo = require("../../../assets/gggg.png");
const image = require("../../../assets/btnstartt.png");

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
      "email": '',
      "password": '',
      "checkLogin": false,
      
    };
  
  renderInput({ input, label, type, meta: { touched, error, warning } }) {
    return (
      <View>
        <Item error={error && touched} rounded style={styles.inputGrp}>
          <Input
            onChangeText = {text => {this.setStateInput(input.name, text)}}
            value = {this.state[input.name]}
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
    if (props.loginFetch.success == true) {
      
      console.log("345",props.loginFetch.data)
      this.props.navigation.navigate("Drawer")
    }
  }
  login() {
    Keyboard.dismiss();
    if (!this.validateEmail(this.state.email)) {
      alert("Email is not correct");
    } else if (!this.validatePassword()) {
      alert("Pass is not correct");
    } else {
      var param = {};
      param.email = this.state.email;
      param.password = base64.encode(this.state.password);
      this.props.loginAction(param);

    }
  }

  skip() {
    this.props.skip();
    this.props.navigation.navigate("Home");
    // return this.props.navigation.dispatch(
    //   NavigationActions.reset({
    //     index: 0,
    //     actions: [NavigationActions.navigate({ routeName: "Walkthrough" })]
    //   })
    // );
  }

  render() {
    const navigation = this.props.navigation;
    return (
      <Container>
        <StatusBar barStyle="light-content" />

        <ImageBackground source={bg} style={styles.background}>
          <Content contentContainerStyle={{ flex: 1 }}>
            <View style={styles.container}>
              <View style={styles.logoContainer}>
                <Image source={logo} style={styles.logo} />
                <Text style={styles.textCreateAccount}>Login</Text>
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
                    // onChange={text1 => this.setState({ email: text1 })}
                    // onChangeText={onChange}
                  />
                  <Field
                    name="password"
                    component={this.renderInput}
                    type="password"
                    validate={[alphaNumeric, minLength8, maxLength15, required]}
                    // onChangeText={onChange}
                    // onChange  ={text => this.setState({ password: text })}

                  /> */}
                <Item  style={{ backgroundColor: "#fff", opacity: 0.5, borderRadius: 5,height: 40,marginTop: 10  }}>
                  <Label style={{ marginLeft: 5}}>Email</Label>
                  <Input 
                    
                    onChangeText={(text) => this.setState({ email: text })}
                    value={this.state.email}
                  />
                  
                </Item>
                <Item   style={{ backgroundColor: "#fff", opacity: 0.5, borderRadius: 5,height: 40,marginTop: 10 }}>
                  <Label style={{ marginLeft: 5}} >Password</Label>
                  <Input
                    onChangeText={(text) => this.setState({ password: text })}
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
                  <Button onPress={() => this.login()} style={styles.btnStart}>
                    <Image
                      source={image}
                      style={styles.imageStart}
                      resizeMode="cover"
                    />
                  </Button>
                </View>
              </View>
              <View style={{ backgroundColor: "transparent", flex: 1 }}>
                <View style={{ flex: 1 }}>
                
                </View>
                
              </View>
            </View>
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}


const loginform = reduxForm({
  form: "loginform"
})(Login);

function bindActions(dispatch) {
  return {
    loginAction: params => dispatch(login(params))
   
  };
}
const mapStateToProps = state => ({
  loginFetch: state.loginFetch
});

// export default Login;
export default connect(mapStateToProps, bindActions)(Login);
