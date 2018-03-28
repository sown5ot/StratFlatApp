import * as  APIRequest from '../utils/Api.js'
import * as mConstants from '../utils/Constants'
import {
	AsyncStorage
} from "react-native";


export function signUpSuccess(data) {
	return {
		type: "SIGNUP_SUCCESS",
		data
	};
}

export function signUpFailed(error) {
	//console.log('asdas',error)
	return {
		type: "SIGNUP_FAILED",
		error
	};
}

export function signUpAction(params) {
	let url = mConstants.BASE_URL + "registration/"
		return dispatch => {
		APIRequest.APIRequestPOST(url,params, false,
			response => {
				if (response.data){
					dispatch(signUpSuccess(response))
				} else { 
					if (response.detail) {
						dispatch(signUpFailed(response.detail))
					}
					if (response.email) {
						dispatch(signUpFailed(response.email))
					}
					// dispatch(signUpSuccess(response));
				}
			},
			error => {
				dispatch(signUpFailed(error));
			}
		)
	};
}