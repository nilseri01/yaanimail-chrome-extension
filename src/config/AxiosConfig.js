import axios from 'axios';
import i18n from 'i18next';
import UtilsService from '../services/UtilsService';

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
      UtilsService.saveToLocalStorage('ym@user', null)
        .then(() => {
          chrome.runtime.reload();
          return Promise.reject(error);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    } else {
      error.response.message = createErrorMessage(error.response);
      return Promise.reject(error);
    }
  }
);

export { API_CONFIG };
