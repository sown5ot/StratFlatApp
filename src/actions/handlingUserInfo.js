import * as  APIRequest from '../utils/Api.js'
import * as mConstants from '../utils/Constants'

export const GET_HOTEL_FROM_SIM_SUCCESS = 'GET_HOTEL_FROM_SIM_SUCCESS';
export const GET_HOTEL_FROM_SIM_FAILED = 'GET_HOTEL_FROM_SIM_FAILED';

import
{
    AsyncStorage
}
from
"react-native";

export function getHotelFromSimSuccess(data) {
    return {
        type: GET_HOTEL_FROM_SIM_SUCCESS,
        data
    };
}

export function getHotelFromSimFailed(error) {
    return {
        type: GET_HOTEL_FROM_SIM_FAILED,
        error
    };
}

export function getHotelIdRequest(simId) {
    let url = mConstants.BASE_URL + "sims/get_by_simid?sim_id=" + simId;
    return dispatch => {
        APIRequest.APIRequestGET(url, true,
            response => {
                console.log('response', response);
                dispatch(getHotelFromSimSuccess(response));
            },
            error => {
                console.log('error', error);
                // dispatch(signUpFailed(error));
                dispatch(getHotelFromSimFailed(error));
            }
        )
    };
}