export type State = {
    success: boolean,
    data: Object,
    errorMessage: String
}

const initialState = {
    success: false,
    data: {},
    errorMessage:''
};


export function loginFetch(state: State = initialState, action) {
    //console.log(action.type)
    if (action.type === 'LOGIN_DEMO_FAILED') {
        return {
            success: false,
            errorMessage:action.error.message,

        };
    }
    if (action.type === 'LOGIN_DEMO_SUCCESS') {
        console.log("fff",action.data)
        return {
            success: true,
            data: action.data,
        
        };
    }
    return state;

}


