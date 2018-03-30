import { GET_HOTEL_FROM_SIM_FAILED, GET_HOTEL_FROM_SIM_SUCCESS} from '../actions/handlingUserInfo'

const initialState = {
    hotelInfo: {
        success: false,
        data: null,
        message: ''
    }
};

export default function handlingUserInfo(state = initialState, action) {
    // console.log('----> Reducer: ', action);
    state.actionType = action.type;
    if (action.type === GET_HOTEL_FROM_SIM_FAILED) {
        return {
            ...state,
            success: false,
            errorMessage: action.error
        };
    }
    if (action.type === GET_HOTEL_FROM_SIM_SUCCESS) {
        return {
            ...state,
            success: true,
            data: action.data
        };
    }
    return state;
}
