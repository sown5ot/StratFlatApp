import * as APIRequest from "../utils/Api.js";
import * as mConstants from "../utils/Constants";
import { AsyncStorage } from "react-native";
export function resendEmailSuccess(data) {
  return {
    type: "RESEND_EMAIL_SUCCESS",
    data
  };
}

export function resendEmailFalied(error) {
  return {
    type: "RESEND_EMAIL_ERROR",
    error
  };
}
export function resendEmail(params) {
  let url = mConstants.BASE_URL + "users/mail/" + params;
  console.log(url)
  return dispatch => {
    APIRequest.APIRequestGET(
      url,
      false,
      response => {
        dispatch(resendEmailSuccess(response));
      },
      error => {
        //console.log('error')
        dispatch(resendEmailFalied(error));
      }
    );
  };
}
// export function resendEmail(params) {
//     return dispatch => {
//         AsyncStorage.getItem(mConstants.USER_INFO, (err, result) => {
//             //console.log('12373', JSON.parse(result))
//             // var token = JSON.parse(result).token
//             fetch(mConstants.BASE_URL + "/users/mail/"  + params, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     // 'Authorization': 'JWT ' + token,
//                 },
//                 // body: JSON.stringify(params)
//             }).then((response) => {console.log('aada', response)
//                 response.json().then((responseJson) => {
//                     console.log('aada', responseJson)
//                     dispatch(resendEmailSuccess(responseJson))
//                 })
//             }).catch((error) => {
//                 console.log(error)
//                 dispatch(
//                     resendEmailFalied(error)
//                 );
//             });
//         });
//     }
// }
