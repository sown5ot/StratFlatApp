const React = require("react-native");

const { Dimensions, Platform } = React;

const primary = require("../../theme/variables/commonColor").brandPrimary;
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
  container: {
    flex: 1,
    backgroundColor: "#f3f3f3"
  },
  serviceView: {
    flex: 1.25,
    backgroundColor: "#f3f3f3"
  },
  bigTextBox: {
    flex: 1,
    backgroundColor: "#ffffff",
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e3e3e3"
  },
  blueText: {
    color: "#005a9e",
    fontSize: 16,
    fontWeight: "bold",
    padding: 10
  },
  textContainer: {
    flex: 1,
    flexDirection: "row",
  },
  title: {
    flex: 2,
    justifyContent: "center",
  },
  logoImage: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    margin: 10
  },
  mapView: {
    flex: 4
  },
  serviceBox: {
    height: deviceHeight/3,
    backgroundColor: "#ffffff",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: "#e3e3e3"
  },
  imageSlideContainer: {
    flex: 1
  },
  contentContainer: {
    flex: 1
  },
  slide: {
    flex: 1,
    margin: 4
  },
  serviceImage: {
    marginBottom: 2,
    marginRight: 2,
    flex: 1,
    width: 100,
    height: 100
  },
  serviceContentText: {
    color: 'grey',
    marginLeft: 10
  },
  btnContainer: {
    position: "absolute",
    marginLeft: 10,
    marginRight: 10,
    left: 0,
    bottom: 0,
    right: 0,
    height: 60,
    flexDirection: "row",
    backgroundColor: '#fff'
  },
  btnContactContainer: { 
    backgroundColor: "#fff", 
    flex: 4,
    marginRight: 2
  },
  btn: {
    borderWidth: 1,
    borderRadius: 1,
    borderColor: '#e3e3e3',
    backgroundColor: "#005a9e"
  },

};
