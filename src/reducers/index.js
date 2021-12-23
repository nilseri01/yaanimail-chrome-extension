import { combineReducers } from 'redux';
import authedUser from './authedUser';
import view from './view';
import { loadingBarReducer } from 'react-redux-loading';

export default combineReducers({
  authedUser,
  view,
  loadingBar: loadingBarReducer
});
