import { AsyncStorage } from 'react-native'
import { signOut } from '../actions/signOut'
import * as mConstants from './Constants';

export function APIRequestGET(url, isAuth, successCallback, errorCallback, functionSignout) {
    if (!isAuth) {
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((response) => {

            response.json().then((responseJson) => {
                if (responseJson) {
                    successCallback(responseJson)
                } else {
                    errorCallback(responseJson.errorMessage)
                }
            })
        })
            .catch((error) => {
            });
    } else {
        // var token;
        var token = "3102b8f08836008b95a4288fc24662c7a2db60e6";
        // AsyncStorage.getItem(mConstants.USER_INFO, (err, result) => {
        //     console.log('ttttttttttg', JSON.parse(result))
        //     if (!JSON.parse(result).user.message || JSON.parse(result).user.status === "Active") {
        //         token = JSON.parse(result).token
        //         console.log(token)
                fetch(url, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'token ' + token,
                    },
                }).then((response) => {
                    if (response.status === 401) {
                        dispatch(signOut(true))
                    } else {
                        response.json().then((responseJson) => {
                            successCallback(responseJson)
                            console.log('responseJson', responseJson)
                        })
                    }
                })
                    .catch((error) => {
                        console.log(error);
                    });
            // } else {
                // functionSignout
            // }
        // });
    }
}

export function APIRequestPOST(url, param, isAuth, successCallback, errorCallback, signOutFunction) {
    if (!isAuth) {
        //console.log('21sdsasa', param)
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(param)
        }).then((response) => {
            // console.log('response', response)
            response.json().then((responseJson) => {
                if (responseJson) {
                    console.log('111112222',responseJson)
                    successCallback(responseJson)
                } else {
                    errorCallback(responseJson.errorMessage)
                }
            })
        })
            .catch((error) => {
            });
    } else {
        var token;
        AsyncStorage.getItem(mConstants.USER_INFO, (err, result) => {
            if (!JSON.parse(result).user.message || JSON.parse(result).user.status == "Active") {
                token = JSON.parse(result).token

                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'JWT ' + token,
                    },
                    body: JSON.stringify(param),
                }).then((response) => {
                    // //console.log('aaa',response)
                    // console.log(';;;;;;;;;;;;;;;;;;;;;;;;;;;;', response)
                    if (response.status === 401) {
                        dispatch(signOut(true))
                    } else {
                        response.json().then((responseJson) => {
                            successCallback(responseJson)
                        })
                    }
                })
                    .catch((error) => {
                        //console.log(error);
                    });
            } else {
                dispatch(signOut(true))
            }
        });
    }
}

export function APIRequestDELETE(url, isAuth, successCallback, errorCallback, signOutFunction) {
    if (!isAuth) {
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            response.json().then((responseJson) => {


                if (responseJson) {
                    successCallback(responseJson)
                } else {
                    errorCallback(responseJson.errorMessage)
                }

            })
        })
            .catch((error) => {
            });
    } else {
        var token;
        AsyncStorage.getItem(mConstants.USER_INFO, (err, result) => {
            console.log('ttttttttttd', JSON.parse(result))
            //console.log('result', result)
            if (!JSON.parse(result).user.message || JSON.parse(result).user.status == "Active") {
                token = JSON.parse(result).token

                fetch(url, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'JWT ' + token,
                    },
                }).then((response) => {
                    // //console.log('aaa',response)
                    // console.log(';;;;;;;;;;;;;;;;;;;;;;;;;;;;', response)
                    if (response.status === 401) {
                        dispatch(signOut(true))
                    } else {
                        response.json().then((responseJson) => {
                            successCallback(responseJson)
                        })
                    }
                })
                    .catch((error) => {
                        //console.log(error);
                    });
            } else {
                dispatch(signOut(true))
            }
        });
    }
}
