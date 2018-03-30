const React = require("react-native");
const { Dimensions, Platform } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const primary = require("../../theme/variables/commonColor").brandPrimary;
const commonColor = require("../../theme/variables/commonColor");

export default {
  transparentLine: {
    height: 1, 
    backgroundColor: "#e0e0e0"
  },
  blackText: {
    color: "#75716e",
    fontSize: 14,
    fontWeight: 'bold'
  },
  blueText: {
    color: "#005a9e",
    fontSize: 20,
    fontWeight: 'bold'
  },
  bigTextBox: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 2, 
    borderWidth: 1, 
    borderColor: '#e3e3e3'
  },
  topTextBox: {
    flex: 1,
    backgroundColor: '#ffffff',
    margin: 10, 
    borderWidth: 1, 
    borderColor: '#e3e3e3'
  },
  textBox: {
    flex: 1,
    backgroundColor: '#ffffff',
    margin: 10, 
    borderWidth: 1, 
    borderColor: '#e3e3e3'
  }
};
