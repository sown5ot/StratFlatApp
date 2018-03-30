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
  ActivityIndicator,
  PermissionsAndroid
} from "react-native";

import {
  Container,
  Header,
  Content,
  Icon,
  Text,
  Button,
  Body,
  Left,
  Right,
  View
} from "native-base";
import IonIcon from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MapViewDirections from "react-native-maps-directions";
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
const GOOGLE_MAP_API_KEY = "AIzaSyAVdmK3TIDXUHPyw0OmhYmUjpLuq_ijkKw";
const headerLogo = require("../../../assets/header-logo.png");
const LONGITUDEDELTA = 0.1;
const LATITUDEDELTA = 0.1;

class Story extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      error: ""
    };
  }

  componentWillMount() {
    this.requestLocationPermissions();
    this.getCurrentPosition();
  }

  async requestLocationPermissions() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message: "Allow App to access this device's location"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("location success");
      } else {
        console.log("failed");
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getCurrentPosition() {
    await navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          coord: {
            latitude: parseFloat(position.coords.latitude),
            longitude: parseFloat(position.coords.longitude),
            // latitude: 21.0296644,
            // longitude: 105.799677,
            latitudeDelta: LATITUDEDELTA,
            longitudeDelta: LONGITUDEDELTA
          }
        });
        console.log(
          "current position",
          this.state.coord.latitude,
          this.state.coord.longitude
        );
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  componentDidMount() {
    this.getHotelSerivceData();
  }

  getHotelSerivceData() {
    const { state } = this.props.navigation;
    var id = state.params.hotelId;
    this.props.getHotelServiceAction(id);
  }

  componentWillReceiveProps(props) {
    this.getHotelService(props);
  }

  getHotelService(props) {
    console.log("gethotelservice");
    if (props.getHotelServiceReducer.success) {
      this.setState({
        isLoading: false,
        region: {
          latitude: parseFloat(props.getHotelServiceReducer.data.latitude),
          longitude: parseFloat(props.getHotelServiceReducer.data.longitude),
          latitudeDelta: LONGITUDEDELTA,
          longitudeDelta: LATITUDEDELTA
        }
      });
    }
  }

  render() {
    console.log("render");
    let d = Dimensions.get("window");
    const { height, width } = d;
    information = [
      { key: "RESTAURANT & BAR", content: "abcd" },
      { key: "CLUB", content: "efgh" },
      { key: "POOL", content: "ijkl" }
    ];

    images = [
      { key: require("../../../assets/NewsIcons/1.jpg") },
      { key: require("../../../assets/NewsIcons/2.jpg") },
      { key: require("../../../assets/NewsIcons/3.jpg") },
      { key: require("../../../assets/NewsIcons/4.jpg") },
      { key: require("../../../assets/NewsIcons/5.jpg") }
    ];

    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

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
            <Text style={{ fontWeight: "bold" }}>HOTEL SERVICES</Text>
          </Body>
          <Right />
        </Header>

        <View style={styles.container}>
          <View style={styles.bigTextBox}>
            <View style={styles.textContainer}>
              <View style={styles.title}>
                <Text style={styles.blueText}>HOW TO GET TO</Text>
              </View>
              <View style={styles.logoImage}>
                <IonIcon name="md-pin" color='#005a9e' size={40} ></IonIcon>
              </View>
            </View>
            <MapView style={styles.mapView} region={this.state.region}>
              <MapView.Marker coordinate={this.state.coord} />
              <MapView.Marker coordinate={this.state.region} />
              <MapViewDirections
                origin={this.state.coord}
                destination={this.state.region}
                apikey={GOOGLE_MAP_API_KEY}
                strokeWidth={3}
                strokeColor="hotpink"
              />
            </MapView>
          </View>

          <View style={styles.serviceView}>
            <FlatList
              data={information}
              renderItem={({ item }) =>
                <View style={styles.serviceBox}>
                  <View style={{ flex: 1 }}>
                    <FlatList
                      horizontal
                      data={images}
                      renderItem={({ item }) =>
                        <View>
                          <Image
                            style={styles.serviceImage}
                            source={item.key}
                          />
                        </View>}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={styles.textContainer}>
                      <View style={styles.title}>
                        <Text style={styles.blueText}>
                          {item.key}
                        </Text>
                      </View>
                      <View style={styles.logoImage}>
                        <Button style={styles.btn}>
                          <Text style={{fontSize: 12}}>Booking Inquiry</Text>
                        </Button>
                      </View>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.serviceContentText}>
                        {item.content}
                      </Text>
                    </View>
                  </View>
                </View>}
            />
            <View style={styles.btnContainer}>
              <View style={styles.btnContactContainer}>
                <Button
                  rounded
                  primary
                  block
                  large
                  style={styles.btn}
                  onPress={() => this.login()}
                >
                  <Text
                    style={
                      Platform.OS === "android"
                        ? { fontSize: 16, textAlign: "center" }
                        : { fontSize: 16, fontWeight: "700" }
                    }
                  >
                    CONTACT HOTEL
                  </Text>
                </Button>
              </View>
              <View style={{ flex: 1 }}>
                <Button
                  rounded
                  primary
                  block
                  large
                  style={styles.btn}
                  onPress={() => this.login()}
                >
                  {/* <Text
                    style={
                      Platform.OS === "android"
                        ? { fontSize: 16, textAlign: "center" }
                        : { fontSize: 16, fontWeight: "700" }
                    }
                  >
                    Ok
                  </Text> */}
                  <MCIcon name="message-bulleted" size={20} color="white"></MCIcon>
                </Button>
              </View>
            </View>
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
