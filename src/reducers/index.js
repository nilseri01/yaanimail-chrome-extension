import { combineReducers } from 'redux';
import authedUser from './authedUser';
import view from './view';
import toast from './toast';
import { loadingBarReducer } from 'react-redux-loading';

export default combineReducers({
  authedUser,
  view,
  toast,
  loadingBar: loadingBarReducer
});
