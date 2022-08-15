import { SET_SHOW_SUCCESS, SET_SHOW_ERROR } from '../actions/toast';

export default function showToast(state = null, action) {
  switch (action.type) {
    case SET_SHOW_SUCCESS:
      return { isSuccess: true, isError: false, message: action.message };
    case SET_SHOW_ERROR:
      return { isSuccess: false, isError: true, message: action.message };
    default:
      return state;
  }
}
