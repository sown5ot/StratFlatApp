import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import homeReducer from "../screens/Home/reducer";
import {loginFetch} from "../screens/Login/reducer";
import signUpReducer from "./signUp"
import skipReducer from "./skip"

export default combineReducers({
  form: formReducer,
  homeReducer,
  loginFetch,
  signUpReducer,
  skipReducer
});