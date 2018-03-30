import * as APIRequest from "../../utils/Api.js";
import * as mConstants from "../../utils/Constants";
import { AsyncStorage } from "react-native";

export function loginSuccess(data) {
  return {
    type: "LOGIN_DEMO_SUCCESS",
    data
  };
}
export function loginFailed(error) {
  //console.log('asdas', error)
  return {
    type: "LOGIN_DEMO_FAILED",
    error
  };
}
export function login(params) {
  let url = mConstants.BASE_URL + "login/";
  //console.log('2sdsadas', params)
  return dispatch => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    })
      .then(response => {
          console.log('qqqqq',response)
        response.json().then(responseJson => {
            if (responseJson.message) {
                dispatch(loginFailed(responseJson))
            } else {
                dispatch(loginSuccess(responseJson))
            }
        });
      })
      .catch(error => {});
  };
}
