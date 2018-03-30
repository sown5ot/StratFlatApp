// @flow
import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import {
    Platform,
    Image,
    ImageBackground,
    TouchableOpacity,
    Dimensions,
    FlatList,
    View as RNView,
    ScrollView,
    NativeModules,
    AsyncStorage
} from 'react-native';
import {connect} from 'react-redux';
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
    Input,
} from 'native-base';

import styles from './styles';
import * as Storage from '../../config/AsyncStorage'
import * as Constant from '../../utils/Constants'

import {RNCamera} from 'react-native-camera';

const bg = require('../../../assets/background2.jpg');
const deviceWidth = Dimensions.get('window').width;
const headerLogo = require('../../../assets/header-logo.png');
const deviceHeight = Dimensions.get('window').height;

import {getHotelIdRequest, GET_HOTEL_FROM_SIM_SUCCESS, GET_HOTEL_FROM_SIM_FAILED} from '../../actions/handlingUserInfo';

class HandlingUserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scanBarCode: false,
        };
    }

    async componentDidMount() {
        await Storage.getDataJson(Constant.USER_INFO).then(result => {
            this.setState({userinfo: result});
            if (!result.sim_ids) {
                if (Platform.OS === 'android') {
                    this.getSimInfo();
                } else {
                    this.scanBarCode();
                }
            } else {
                this.checkHotelInfo('');
            }
        });
    }

    async componentWillReceiveProps(nextProps) {
        const {handlingUserInfo} = nextProps;
        switch (handlingUserInfo.actionType) {
            case GET_HOTEL_FROM_SIM_SUCCESS:
                var hotelId = handlingUserInfo.data.data.hotel.id;
                var simId = handlingUserInfo.data.data.sim_id;

                this.setState({hotelId: hotelId});

                let user = await Storage.getDataJson(Constant.USER_INFO);
                user.hotel_id = hotelId;

                if (!user.sim_ids) {
                    var simIds = [simId];
                    user.sim_ids = simIds;
                }

                Storage.setDataJson(Constant.USER_INFO, user);


                this.props.navigation.navigate("Home");
                break;
            case GET_HOTEL_FROM_SIM_FAILED:
                alert('Error');
                break;
        }
    }

    checkHotelInfo(simId) {
        if (this.state.userinfo.hotel_id) {
            this.props.navigation.navigate("Home");
        } else {
            var id = (simId) ? simId : (this.state.userinfo.sim_ids[0]);
            this.props.getHotelInfo(id);
        }
    }

    scanBarCode() {
        this.setState({scanBarCode: true});
    }

    onBarCodeRead(e) {
        console.log('Barcode Found!', 'Type: ' + e.type + '\nData: ' + e.data);
        this.setState({scanBarCode: false});
        // alert("Barcode Found: " + e.data);
        this.setState({userinfo: {...this.state.userinfo, sim_ids: [e.data]}});
        this.checkHotelInfo(e.data);
    }


    getSimInfo() {
        var simChanged = NativeModules.SimChangedModule;
        var sim = [];
        simChanged.simInfo().then(response => {
            sim = response.split('/');
            console.log('-------> sim1: ', sim[0]);
            console.log('-------> sim2: ', sim[1]);
            this.setState({userinfo: {...this.state.userinfo, sim_ids: [sim[0]]}});
            this.checkHotelInfo(sim[0]);
        });
    }

    render() {
        if (this.state.scanBarCode) {
            return (
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'We need your permission to use your camera phone'}
                    // barCodeTypes={[RNCamera.Constants.BarCodeType.code128]}
                    onBarCodeRead={this.onBarCodeRead.bind(this)}
                />
            );
        } else {
            return <View/>;
        }
    }
}

function bindAction(dispatch) {
    return {
        getHotelInfo: simId => dispatch(getHotelIdRequest(simId))
    };
}

const mapStateToProps = state => {
    return {
        handlingUserInfo: state.handlingUserInfo
    };
}

export default connect(mapStateToProps, bindAction)(HandlingUserInfo);
