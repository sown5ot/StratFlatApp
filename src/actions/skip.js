import { AsyncStorage } from "react-native";
import * as APIRequest from "../utils/Api.js";
import * as mConstants from "../utils/Constants";

export function skipSuccess(data) {
  console.log('success')
  return {
    type: "SKIP_SUCCESS",
    data
  };
}

export function skipFailed(error) {
  return {
    type: "SKIP_FAILED",
    error
  };
}

export function skipAction() {
  let url = mConstants.BASE_URL + "login_as_guest/";
  return dispatch => {
    // console.log(url);
    APIRequest.APIRequestPOST(url, null, false,
      response => {
        console.log("response", response);
        console.log("gggggggggggggggggggggggggggggg", JSON.stringify(response.data));
          // err => {
          //   setTimeout(() => {
          //     dispatch(skipSuccess(response));
          //   }, 10000);
          // }
        dispatch(skipSuccess(response))
        // );
    },
    error => {
      //console.log('error')
      dispatch(skipFailed(error));
    }
  )};
}
