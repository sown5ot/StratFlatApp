// @flow
import React, { Component } from "react";
import { NavigationActions } from "react-navigation";
import {
  Platform,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  FlatList,
  View as RNView,
  ScrollView,
  AsyncStorage
} from "react-native";
import { connect } from "react-redux";
import {
  Container,
  Header,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  View,
  Spinner,
  Input
} from "native-base";

import { Grid, Col } from "react-native-easy-grid";
import Carousel from "react-native-carousel-view";

import * as mConstants from "../../utils/Constants";
import { itemsFetchData } from "../../actions";
import datas from "./data.json";

import styles from "./styles";

const bg = require("../../../assets/background2.jpg");
const deviceWidth = Dimensions.get("window").width;
const headerLogo = require("../../../assets/header-logo.png");
const deviceHeight = Dimensions.get("window").height;

class Home extends Component {
  componentDidMount() {
    this.props.fetchData(datas);
  }
  _renderItem = ({ item }) => {
    return (
      <View
        style={{ flexDirection: "row", backgroundColor: "#EEEEEE" }}
        onPress={() => this.props.navigation.navigate("Story")}


      >
        <View style={styles.newsContent}>
          <Text numberOfLines={2} style={styles.newsHeader}>
            {item.headline}
          </Text>
          <Grid style={styles.swiperContentBox}>
            <Col style={{flexDirection: "row"}}>
              <Text style={styles.newsLink}>
                {item.link}
              </Text>
              <Icon name="ios-time-outline" style={styles.timeIcon} />
              <Text style={styles.newsLink}>
                {item.time}
              </Text>
            </Col>
            <Col>
              <TouchableOpacity
                style={styles.newsTypeView}
                onPress={() => this.props.navigation.navigate("Channel")}
              >
                <Text style={styles.newsTypeText}>
                  {item.category}
                </Text>
              </TouchableOpacity>
            </Col>
          </Grid>
        </View>
        <View
          style={{
            margin: 10,
            backgroundColor: "#EEEEEE",
            height: deviceHeight-80,
            width: deviceWidth - 20
          }}
        >
          <View style={{ backgroundColor:"#fff", flex:3,flexDirection: "row"}}>
              <View style={{ backgroundColor:"red", flex: 1, flexDirection: "column"}}>
                <Text style={{ backgroundColor:"orange", flex: 1}}>BALANCE</Text>
                <Text style={{ backgroundColor:"orange", flex: 1}}>HK$ 999</Text>
              </View>
                
              <View style={{ backgroundColor:"green", flex: 1}}>
              <Button
                  style={{ alignSelf: "flex-start", margin: 30 }}
                >
                  <Text >TOP UP</Text>
                </Button>
              </View>
          </View>

          <View style={{ backgroundColor:"#fff", flex:0.7, marginTop: 5}}>

          </View>

          <View style={{ backgroundColor:"#fff", flex: 6, marginTop: 5}}>

          </View>

          <View style={{ backgroundColor:"#fff", flex: 1, marginTop: 5}}>

          </View>

        </View>
      
      </View>
    );
  };
  render() {
    console.log('userinfo', AsyncStorage.getItem(mConstants.USER_INFO))
    if (this.props.isLoading) {
      return <Spinner />;
    } else {
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
          <Content
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: "#fff" }}
          >

            
            
        
        <View
          style={{
            margin: 10,
            backgroundColor: "#EEEEEE",
            height: deviceHeight-80,
            width: deviceWidth - 20
          }}
        >
        <TouchableOpacity style={{ backgroundColor:"#fff", flex:2.5,flexDirection: "row"}} onPress={() => this.props.navigation.navigate("ForgotPassword")}>
          
              <View style={{ backgroundColor:"#fff", flex: 1, flexDirection: "column",alignItems: 'flex-start', justifyContent: 'flex-end'}}>
                <View style={{ flex: 1, }}>
                  <Text style={{ flex: 1,marginLeft: 20,marginTop: 30,color:"grey",fontSize: 20}}>BALANCE</Text>
                </View>

                <View style={{ backgroundColor:"#fff", flex: 1, flexDirection: "column",alignItems: 'flex-end', justifyContent: 'flex-start'}}>
                  <Text style={{ flex: 1, marginLeft: 20,color:"#1976D2",fontSize: 20}}>HK$ 900</Text>
                </View>
              </View>

              <View >
                <Button style={{ backgroundColor:"#1976D2",borderRadius: 4, margin: 30}} onPress={() => this.props.navigation.navigate("ForgotPassword")}><Text> TOP UP </Text></Button>
              </View>
          
        </TouchableOpacity>
          <View style={{ backgroundColor:"#fff", flex:1, marginTop: 5, justifyContent: 'center',}}>
          <Input>
          </Input>
          </View>
        
          <TouchableOpacity
        style={{backgroundColor: "#EEEEEE",flex: 7.7 }}
        onPress={() => this.props.navigation.navigate("Story", {hotelId: 1})}
      >
          <View style={{ backgroundColor:"#fff", flex: 5, marginTop: 5,}}>
          <View style={{ flex:0.8,flexDirection: "row"}}>
            <Text style={{flex:4, justifyContent: 'center',color:"#1976D2",margin: 10,fontStyle:"normal"}}>Sheraton Bali Kuta Resort</Text>
          </View>
          <View style={{flex:3.5,backgroundColor:"pink",justifyContent: 'center'}}>
          
                <Image
                  source={require("../../../assets/NewsIcons/5.jpg")}
                  style={{width: null,
                    flex: 1,
                    height: deviceHeight / 2.8}}
                />
            
          </View>
         
          <View style={{ flex:1.7, justifyContent: 'center',}}>
          <Text style={{ margin: 5, color:"grey",fontStyle:"italic"}}>Sheraton Bali Kuta Resort 
          Sheraton Bali Kuta resort Sheraton Bali Kuta resort 
          Sheraton Bali Kuta resort Sheraton Bali Kuta resort 
          Sheraton Bali Kuta resort</Text>
          </View>
          </View>
          

          <View
                style={{
                  backgroundColor: "#fff",
                  flexDirection: "row",
                  flex: 1
                }}
              >
                <View
                  style={{ backgroundColor: "#FFF", flex: 4}}
                >
                  <Button
                    rounded
                    primary
                    block
                    large
                    style={{
                      borderRadius: 4,
                      marginRight: 3,
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
                      borderRadius: 4,
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
          </TouchableOpacity>

        </View>
          </Content>
        </Container>
      );
    }
  }
}

function bindAction(dispatch) {
  return {
    fetchData: url => dispatch(itemsFetchData(url))
  };
}

const mapStateToProps = state => ({
  items: state.homeReducer.items,
  hasErrored: state.homeReducer.hasErrored,
  isLoading: state.homeReducer.isLoading
});
export default connect(mapStateToProps, bindAction)(Home);
