import * as  APIRequest from '../utils/Api.js'
import * as mConstants from '../utils/Constants'

export function shouldSignOut(check) {
    return {
        type: "SIGN_OUT",
        check
    };
}

export function signOut(params) {
    console.log('signOut',params)
    return dispatch => {
        dispatch(shouldSignOut(params))
    }
}
