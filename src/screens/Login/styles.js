

const React = require("react-native");
const { Dimensions, Platform } = React;
const commonColor = require("../../theme/variables/commonColor");

const deviceHeight = Dimensions.get("window").height;

export default {
  container:{
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'column'
  },
  logoContainer:{
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flex: 1
  },
  logo:{
    width:150,
    height: 150,
    marginTop: 50,
    marginLeft: -20
  },
    background: {
    flex: 1,
    width: null,
    height: deviceHeight,
    backgroundColor: "rgba(0,0,0,0.1)"
  },
  infoContainer:{
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: deviceHeight/2,
    padding: 20,
    flexDirection:"column",
    backgroundColor: "transparent"
  },
  textCreateAccount:{
    color: '#0D47A1',
    fontSize: 30,
    marginLeft: 20,
    marginTop: 10
  },
  input:{
    height:40,
    backgroundColor: "rgba(255,255,255,0.2)"

  },
    formLogin:{
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent"
  },
    form: {
    flex: 2,
    marginTop: 20
  },
    btnStart:{
    flex: 1,
    padding: 0,
    margin: 0,
    backgroundColor: "transparent"
  },
    imageStart:{
      width: 150,
      height: 150,
      justifyContent: "flex-start",
      alignItems:"flex-start",
      alignContent:"flex-start",
      padding: 0,
      marginLeft: -40,
      // marginTop: -10
  },
    formErrorIcon: {
    color: "#fff",
    marginTop: 5,
    right: 10,
  },
  formErrorText1: {
    fontSize: Platform.OS === "android" ? 12 : 15,
    color: commonColor.brandDanger,
    textAlign: "right",
    top: -10
  },
  formErrorText2: {
    fontSize: Platform.OS === "android" ? 12 : 15,
    color: "transparent",
    textAlign: "right",
    top: -10
  },
    helpBtns: {
    opacity: 1,
    marginLeft: 20,
    fontWeight: "bold",
    color: "#0D47A1",
    fontSize: Platform.OS === "android" ? 20 : 20
  },
  inputGrp: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.3)",
    marginBottom: 5,
    borderWidth: 0,
    borderColor: "transparent",
    borderRadius: 5,
    height: 42,
  },
    loginBtn: {
    marginTop: 7,
    height: 40,
    borderRadius: 5,
    backgroundColor: "#1976D2"
  },
    skip: {
    padding: 0,
    borderRadius: 5,
    backgroundColor: "transparent"
  },
    skipBtn: {
    opacity: 1,
    alignItems:"flex-start",
    justifyContent:"flex-start",
    fontWeight: "bold",
    color: "#3F51B5",
    fontSize: Platform.OS === "android" ? 20 : 20
  },
  

};

