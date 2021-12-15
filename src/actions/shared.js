import { showLoading, hideLoading } from 'react-redux-loading';
import { setAuthedUser } from '../actions/authedUser';
import UtilsService from '../services/UtilsService';

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData().then(({ authedUser }) => {
      if (authedUser) {
        dispatch(setAuthedUser(authedUser));
      }
      dispatch(hideLoading());
    });
  };
}

export function getInitialData() {
  // const user = UtilsService.getFromLocalStorage('ym@user');
  return new Promise((resolve, reject) => {
    UtilsService.getFromLocalStorage('ym@user').then((user) => {
      if (Object.keys(user).length !== 0) {
        resolve({ authedUser: JSON.parse(user['ym@user']) });
      } else {
        resolve({});
      }
    });
  });
}
