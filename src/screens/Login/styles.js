

const React = require("react-native");
const { Dimensions, Platform } = React;
const commonColor = require("../../theme/variables/commonColor");

const deviceHeight = Dimensions.get("window").height;

export default {
  container: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "column"
  },
  logoContainer: {
    flex: 3,
    alignItems: "flex-start",
    justifyContent: "flex-end"
  },
  logo: {
    width: 150,
    height: 150
  },
  background: {
    flex: 1,
    width: null,
    height: deviceHeight,
    backgroundColor: "rgba(0,0,0,0.1)"
  },
  screenNameContainer: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    marginLeft: 40
  },
  screenNameText: {
    fontSize: 20,
    color: "#005a9e",
    fontWeight: "bold"
  },
  textInput: {
    backgroundColor: "#fff",
    borderRadius: 3,
    marginLeft: 40,
    margin: 5
  },
  btnStart: {
    flex: 1,
    backgroundColor: "transparent"
  },
  imageStart: {
    width: 150,
    height: 150,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignContent: "flex-start",
    padding: 0,
    marginLeft: -50
    // marginTop: -10
  },
  fbLoginBtn: {
    margin: 40,
    borderRadius: 5,
    backgroundColor: "#005a9e"
  },
  skip: {
    padding: 0,
    borderRadius: 5,
    backgroundColor: "transparent"
  },
  skipBtn: {
    opacity: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    fontWeight: "bold",
    color: "#3F51B5",
    fontSize: Platform.OS === "android" ? 20 : 20
  },
  bottomContainer: {
    flex: 1,
    flexDirection: "row",
    paddingLeft: 30,
    paddingRight: 30
  },
  inputContainer: { 
    flex: 1, 
    flexDirection: "row"
  }
};

