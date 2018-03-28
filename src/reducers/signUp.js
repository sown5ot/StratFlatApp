export type State = {
  success: boolean,
  data: Object
};

const initialState = {
  success: false,
  data: {},
  errorMessage: ""
};

export default function signUpReducer(state: State = initialState, action) {
  if (action.type === "SIGNUP_FAILED") {
    return {
      success: false,
      errorMessage: action.error
    };
  }
  if (action.type === "SIGNUP_SUCCESS") {
    return {
      success: true,
      data: action.data
    };
  }
  return state;
}
