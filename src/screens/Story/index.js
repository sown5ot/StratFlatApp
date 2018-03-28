// @flow
import React, { Component } from "react";
import {
  Image,
  TouchableOpacity,
  Platform,
  Slider,
  Dimensions,
  FlatList,
  ScrollView,
  View as RNView,
  AsyncStorage,
} from "react-native";

import {
  Container,
  Header,
  Content,
  Text,
  Button,
  Icon,
  Body,
  Left,
  Right,
  View
} from "native-base";
import MapView from "react-native-maps";
import { getHotelServiceAction } from "../../actions/index";
import { getHotelServiceReducer } from "../../reducers/index";
import { Grid, Col } from "react-native-easy-grid";
import { NavigationActions } from "react-navigation";
import Modal from "react-native-modalbox";
import Carousel from "react-native-carousel-view";
import { connect } from "react-redux";
import * as mConstants from "../../utils/Constants";

import styles from "./styles";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const headerLogo = require("../../../assets/header-logo.png");

class Story extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceDetail: "",
      region: {
        latitude: 21.0012484,
        longitude: 105.8382023,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      }
    };
  }

  componentDidMount() {
    // BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    this.getHotelSerivceData();
  }

  getHotelSerivceData(){
    const { state } = this.props.navigation;
    var id = state.params.hotelId;
    this.props.getHotelServiceAction(id);
  }

  componentWillReceiveProps(props){
    console.log(this.props.getHotelServiceReducer.success)
    if (this.props.getHotelServiceReducer.success) {
      var serviceDetail = this.props.getHotelServiceReducer.data;
      console.log("12323224244", serviceDetail);
      this.setState({ serviceDetail: serviceDetail });
    } else {
      console.log("qweqweqwe");
    }
  }

  render() {
    console.log("render");
    let d = Dimensions.get("window");
    const { height, width } = d;
    information = [
      {key: 'RESTAURANT BAR', content: 'abcd'},
      {key: 'CLUB', content: 'efgh'},
      {key: 'POOL', content: 'ijkl'},
    ]
    return (
      <Container>
        <Header
          style={[
            styles.headerStyle,
            this.state.open ? styles.headerModalStyle : styles.headerStyle
          ]}
        >
          <Left>
            <Button
              style={{ marginLeft: 5 }}
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon active name="menu" />
            </Button>
          </Left>
          <Body>
            <Text>HOTEL SERVICES</Text>
          </Body>
          <Right />
        </Header>

        <Content
          // showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "#BDBDBD" }}
        >
          {/* <FlatList
              data={this.props.items}
              renderItem={this._renderItem}
              keyExtractor={item => item.id}
            /> */}
          {/* <ScrollView> */}
          <View
            style={{
              flex: 1,
              backgroundColor: "transparent",
              flexDirection: "column"
            }}
          >
            <View style={{ flex: 1, backgroundColor: "#fff" }}>
              <ScrollView>
                <View style={{}}>
                  <Text style={{ color: "#1976D2", margin: 10 }}>
                    HOW TO GET TO
                  </Text>
                  <View>
                    <MapView
                      style={styles.newsPoster}
                      region={this.state.region}
                    >
                      <MapView.Marker coordinate={this.state.region} />
                    </MapView>
                  </View>
                </View>

                <View style={{ backgroundColor: "#FFF", flex: 4, margin: 3 }}>
                  <FlatList
                    data={information}
                    renderItem={({ item }) =>
                      <View
                        style={{ backgroundColor: "#FFF", flex: 4, margin: 3 }}
                      >
                        <View style={styles.wrapper}>
                          <Carousel
                            width={deviceWidth}
                            height={150}
                            indicatorAtBottom
                            indicatorSize={Platform.OS === "android" ? 15 : 10}
                            indicatorColor="#FFF"
                            indicatorOffset={10}
                            animate={false}
                          >
                            <RNView style={styles.slide}>
                              <Image
                                style={styles.newsPoster}
                                source={require("../../../assets/NewsIcons/1.jpg")}
                              />
                            </RNView>
                            <RNView style={styles.slide}>
                              <Image
                                style={styles.newsPoster}
                                source={require("../../../assets/NewsIcons/3.jpg")}
                              />
                            </RNView>
                            <RNView style={styles.slide}>
                              <Image
                                style={styles.newsPoster}
                                source={require("../../../assets/NewsIcons/4.jpg")}
                              />
                            </RNView>
                            <RNView style={styles.slide}>
                              <Image
                                style={styles.newsPoster}
                                source={require("../../../assets/NewsIcons/5.jpg")}
                              />
                            </RNView>
                          </Carousel>

                          <View
                            style={{
                              flex: 1.7,
                              justifyContent: "flex-start",
                              alignItems: "flex-start",
                              marginTop: 5
                            }}
                          >
                            <View
                              style={{
                                backgroundColor: "#fff",
                                flex: 5,
                                flexDirection: "row"
                              }}
                            >
                              <View
                                style={{
                                  flex: 1.2,
                                  justifyContent: "flex-start",
                                  alignItems: "flex-start",
                                  marginTop: 5
                                }}
                              >
                                <Text
                                  style={{
                                    color: "#1976D2",
                                    marginTop: 10,
                                    marginLeft: 5
                                  }}
                                >
                                  {item.key}
                                </Text>
                              </View>
                              <View
                                style={{
                                  flex: 1,
                                  justifyContent: "flex-end",
                                  alignItems: "flex-end",
                                  marginLeft: 80
                                }}
                              >
                                <Button
                                  style={{
                                    borderRadius: 2
                                  }}
                                >
                                  <Text>Booking Inquiry</Text>
                                </Button>
                              </View>
                            </View>
                            <Text
                              style={{
                                marginLeft: 5,
                                color: "grey",
                                fontStyle: "normal"
                              }}
                            >
                              {item.content}
                            </Text>
                          </View>
                        </View>
                      </View>}>
                  </FlatList>
                </View>
              </ScrollView>
            </View>
          </View>
        </Content>

        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 60,
            flexDirection: "row",
            backgroundColor: "red"
          }}
        >
          <View style={{ backgroundColor: "#fff", flex: 4 }}>
            <Button
              rounded
              primary
              block
              large
              style={{
                borderRadius: 2,
                marginRight: 2,
                backgroundColor: "#1976D2"
              }}
              onPress={() => this.login()}
            >
              <Text
                style={
                  Platform.OS === "android"
                    ? { fontSize: 12, textAlign: "center" }
                    : { fontSize: 12, fontWeight: "700" }
                }
              >
                CONTACT HOTEL!
              </Text>
            </Button>
          </View>
          <View style={{ flex: 1 }}>
            <Button
              rounded
              primary
              block
              large
              style={{
                borderRadius: 2,
                backgroundColor: "#1976D2"
              }}
              onPress={() => this.login()}
            >
              <Text
                style={
                  Platform.OS === "android"
                    ? { fontSize: 12, textAlign: "center" }
                    : { fontSize: 12, fontWeight: "700" }
                }
              >
                Ok
              </Text>
            </Button>
          </View>
        </View>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    // tabbarAction: isShow => dispatch(tabbarAction(isShow)),
    // changeTab: (index,key) => dispatch(changeTab(index,key)),
    getHotelServiceAction: id => dispatch(getHotelServiceAction(id))
    // fetchService: ()=> dispatch(fetchListService())
  };
}
const mapStateToProps = state => ({
  getHotelServiceReducer: state.getHotelServiceReducer
});

export default connect(mapStateToProps, bindActions)(Story);
