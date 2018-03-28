// @flow
import React, {Component} from "react";
import {Dimensions, Image, ImageBackground, StatusBar} from "react-native";
import {
  Container,
  Content,
  Text,
  Button,
  Header,
  Left,
  Body,
  Right,
  Icon,
  Item,
  Input,
  View,
  Toast,
  Footer
} from "native-base";
import {Field, reduxForm} from "redux-form";
import styles from "./styles";


const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
const required = value => (value ? undefined : "Required");
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;

class ForgotPasswordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: {
        x: 0,
        y: 0
      },
      name: ""
    };
  }

  renderInput({input, label, type, meta: {touched, error, warning}}) {
    return (
      <View>
        <Item error={error && touched} rounded style={styles.inputGrp}>
          <Icon active name="mail" style={{color: "#fff"}} />
          <Input
            placeholderTextColor="#FFF"
            style={styles.input}
            placeholder="Email"
            {...input}
            ref={c => (this.textInput = c)}
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

  forgotPassword() {
    if (this.props.valid) {
      this.props.navigation.goBack();
    } else {
      Toast.show({
        text: "Enter Valid Email",
        duration: 2500,
        position: "top",
        textStyle: {textAlign: "center"}
      });
    }
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon active name="menu" />
            </Button>
          </Left>
          <Body>   
          </Body>
          <Right />
        </Header>
          <View style={{
            flex: 1,
            backgroundColor: "#f8f8f8",
            }}>
            <View style={{flex: 1}}>
              <View style={styles.bigTextBox}>
                <View style={{flex: 1, justifyContent: 'center', marginLeft: 12}}>
                  <Text style={styles.blackText}>PHONE NUMBER</Text>
                </View>
                <View style={styles.transparentLine}/> 
                <View style={{flex: 2, flexDirection: 'row', margin: 12}}>
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={styles.blueText}>+852 1234 567</Text>
                  </View>
                  <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                    {/* <Text style={styles.blueText}>Logo</Text> */}
                    <Icon active name="copy"></Icon>
                  </View>
                </View>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={styles.topTextBox}>                 
                  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={styles.blackText}>REMAINING BALANCE</Text>
                  </View>
                  <View style={styles.transparentLine}/> 
                  <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={styles.blueText}>HK$ 9999</Text>
                  </View>  
                </View>
                <View style={styles.topTextBox}>                 
                  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={styles.blackText}>LAST TOP UP</Text>
                  </View>
                  <View style={styles.transparentLine}/> 
                  <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={styles.blueText}>HK$ 9999</Text>
                  </View>  
                </View>
              </View>
            </View>
            <View style={styles.transparentLine}/>
            <View style={{flex: 1, justifyContent: 'flex-start'}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={styles.textBox}>                 
                  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={styles.blackText}>DATA RATE</Text>
                  </View>
                  <View style={styles.transparentLine}/> 
                  <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={styles.blueText}>HK$ 15/MB</Text>
                  </View>  
              </View>
              <View style={styles.textBox}>                 
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={styles.blackText}>CALL RATE</Text>
                </View>
                <View style={styles.transparentLine}/> 
                <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={styles.blueText}>HK$ 8/MIN</Text>
                </View>  
              </View>  
            </View>
            <View style={{flex: 1}}/>
          </View>  
        </View>              
      </Container>
    );
  }
}

const ForgotPassword = reduxForm({
  form: "help"
})(ForgotPasswordForm);
export default ForgotPassword;
