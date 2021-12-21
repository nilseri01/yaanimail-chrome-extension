import { showLoading, hideLoading } from 'react-redux-loading';
import { setAuthedUser } from '../actions/authedUser';
import { setView } from '../actions/view';
import UtilsService from '../services/UtilsService';

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData().then((data) => {
      if (data.authedUser) {
        dispatch(setAuthedUser(data.authedUser));
      }
      dispatch(setView(data.selectedView));
      dispatch(hideLoading());
    });
  };
}

export function getInitialData() {
  // const user = UtilsService.getFromLocalStorage('ym@user');
  return new Promise((resolve, reject) => {
    UtilsService.getMultipleFromLocalStorage(['ym@user', 'ym@view']).then(
      (data) => {
        let view =
          (data['ym@view'] || '').length > 0 ? data['ym@view'] : 'inbox';
        if (Object.keys(data['ym@user']).length !== 0) {
          resolve({
            authedUser: JSON.parse(data['ym@user']),
            selectedView: view
          });
        } else {
          resolve({});
        }
      }
    );
  });
}
