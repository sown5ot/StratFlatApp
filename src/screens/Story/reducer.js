export type State = {
    success: boolean,
    data: Object
}

const initialState = {
    success: false,
    data: {},
    message:''
};


export function getHotelServiceReducer(state: State = initialState, action) {
    console.log('gethotelservicereducer', action.type, action.data)
    if (action.type === "FETCH_SERVICE_ERROR") {
        return {
            success: false,
            message: "fetch failed"
        };
    }
    if (action.type === "FETCH_SERVICE_SUCCESS") {
        return {
            success: true,
            data: action.data,
        };
    }
    return state;

}