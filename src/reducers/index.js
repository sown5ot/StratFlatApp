import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import homeReducer from '../screens/Home/reducer';
import signUp from './signUp';
import { loginFetch } from '../screens/Login/reducer';
import handlingUserInfo from './handlingUserInfo';
import signUpReducer from './signUp';
import skipReducer from './skip';
import { getHotelServiceReducer } from '../screens/Story/reducer';

export default combineReducers({
  form: formReducer,
  homeReducer,
  loginFetch,
  signUpReducer,
  handlingUserInfo,
  skipReducer,
  getHotelServiceReducer
});
