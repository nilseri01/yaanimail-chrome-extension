import axios from 'axios';
import i18n from 'i18next';
import UtilsService from '../services/UtilsService';
import { logout } from '../actions/authedUser';
import { useDispatch } from 'react-redux';

const createErrorMessage = (error) => {
  let errorCode = error?.data?.message;
  if ((errorCode || '').trim().length > 0 && i18n.exists(errorCode)) {
    return i18n.t(errorCode);
  } else {
    return i18n.t('ERR_UNKNOWN_ERROR_HAS_OCCURED');
  }
};

const API_CONFIG = axios.create({
  baseURL: process.env.REACT_APP_GATEWAY_API_URL
});

API_CONFIG.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      return new Promise((resolve, reject) => {
        UtilsService.saveToLocalStorage('ym@user', null)
          .then((response) => {
            useDispatch(logout());
            resolve(response);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    } else {
      error.response.message = createErrorMessage(error.response);
      return Promise.reject(error);
    }
  }
);

export { API_CONFIG };
