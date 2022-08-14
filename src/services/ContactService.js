import { API_CONFIG } from '../config/AxiosConfig';
import HttpHeadersService from './HttpHeadersService';

class ContactService {
  static autoSuggest = (keyword) => {
    let url = `/emails/messages/autocomplete?search=${keyword}`;
    return new Promise((resolve, reject) => {
      HttpHeadersService.getV2AuthHeaders()
        .then((headers) => {
          API_CONFIG.post(
            url,
            {},
            {
              headers: headers
            }
          )
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
}

export default ContactService;
