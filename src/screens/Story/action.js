import * as  APIRequest from '../../utils/Api'
import * as mConstants from '../../utils/Constants'
import {signOut} from '../../actions/signOut'
import {
	AsyncStorage
} from "react-native";
export function getHotelServiceSuccess(data) {
	return {
		type: "FETCH_SERVICE_SUCCESS",
		data
	};
}

export function getHotelServiceError(error) {
	return {
		type: "FETCH_SERVICE_ERROR",
		error
	};
}

export function getHotelServiceAction(id) {
	let url = mConstants.BASE_URL + 'hotels/' + id + '/';
	return dispatch => {
		APIRequest.APIRequestGET(url, true,
			response => {
				dispatch(getHotelServiceSuccess(response))
				console.log('gethotelserviceaaction', response)
			},
			error => {
				console.log(getHotelServiceError(error))
				dispatch(getHotelServiceError(error));
			},
		)
	};
}