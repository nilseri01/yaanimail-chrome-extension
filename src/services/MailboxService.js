import { API_CONFIG } from '../config/AxiosConfig';
import HttpHeadersService from './HttpHeadersService';

class MailboxService {
  static getAllFolders = () => {
    return new Promise((resolve, reject) => {
      HttpHeadersService.getAuthHeaders()
        .then((headers) => {
          API_CONFIG.get('/emails/folders/all', {
            headers: headers
          })
            .then((response) => {
              if (response.data) {
                resolve(response);
              } else {
                reject(response.data.error);
              }
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

  static getMails = (data) => {
    let queryStrArr = Object.entries(data).map(
      ([key, value]) => `${key}=${value}`
    );
    let queryStr = queryStrArr.join('&');

    return new Promise((resolve, reject) => {
      HttpHeadersService.getAuthHeaders()
        .then((headers) => {
          API_CONFIG.get(`/emails/messages?${queryStr}`, {
            headers: headers
          })
            .then((response) => {
              if (response.data) {
                resolve(response);
              } else {
                reject(response.data.error);
              }
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

  static markAsRead = (data) => {
    return new Promise((resolve, reject) => {
      HttpHeadersService.getAuthHeaders()
        .then((headers) => {
          API_CONFIG.put('/emails/messages/read', data, {
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

  static sendToTrash = (data) => {
    return new Promise((resolve, reject) => {
      HttpHeadersService.getAuthHeaders()
        .then((headers) => {
          API_CONFIG.put('/emails/messages/trash', data, {
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

export default MailboxService;
