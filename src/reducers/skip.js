export type State = {
    success: boolean,
    data: Object
  };
  
  const initialState = {
    success: false,
    data: {},
    errorMessage: ""
  };
  
  export default function skipReducer(state: State = initialState, action) {
    if (action.type === "SKIP_FAILED") {
      return {
        success: false,
        errorMessage: action.error
      };
    }
    if (action.type === "SKIP_SUCCESS") {
      return {
        success: true,
        data: action.data
      };
    }
    return state;
  }
  