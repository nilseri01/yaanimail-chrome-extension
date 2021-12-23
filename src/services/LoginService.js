import { API_CONFIG } from '../config/AxiosConfig';
import HttpHeadersService from './HttpHeadersService';

class LoginService {
  static login = (data) => {
    return new Promise((resolve, reject) => {
      HttpHeadersService.getNonAuthHeaders()
        .then((headers) => {
          API_CONFIG.post('/accounts/login', data, {
            headers: headers
          })
            .then((response) => {
              resolve(response);
            })
            .catch((error) => {
              reject(error.response);
            });
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  };

  static logout = () => {
    return new Promise((resolve, reject) => {
      HttpHeadersService.getAuthHeaders()
        .then((headers) => {
          API_CONFIG.delete('/accounts/logout', {
            headers: headers
          })
            .then((response) => {
              resolve(response);
            })
            .catch((error) => {
              reject(error.response);
            });
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  };
}

export default LoginService;
