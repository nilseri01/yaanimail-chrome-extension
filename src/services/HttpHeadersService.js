import UtilsService from './UtilsService';
import { osName, browserName, browserVersion } from 'react-device-detect';

class HttpHeadersService {
  static prepareNoAuthHeaders = () => {
    let headers = {
      'App-Version': '1.0',
      'Device-Language': navigator.language.replace('-', '_'),
      'Device-Name': osName + '-' + browserName + '-' + browserVersion,
      'Device-OS': 'CHROME'
    };
    return headers;
  };

  static prepareAuthHeaders = (values) => {
    let headers = this.prepareNoAuthHeaders();
    headers = {
      ...headers,
      Authorization: 'Bearer ' + values[0],
      'Device-ID': values[1]
    };
    return headers;
  };

  static getAuthHeaders = () => {
    return Promise.all([this.getUserToken(), this.getDeviceId()])
      .then((values) => {
        if (values.length == 2) {
          return this.prepareAuthHeaders(values);
        } else {
          return {};
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  static getV2AuthHeaders = () => {
    return Promise.all([this.getUserToken(), this.getDeviceId()])
      .then((values) => {
        if (values.length == 2) {
          let headers = this.prepareAuthHeaders(values);
          headers = { ...headers, Accept: 'application/x.yaanimail.v2+json' };
          return headers;
        } else {
          return {};
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  static getNonAuthHeaders = () => {
    return new Promise((resolve, reject) => {
      this.getDeviceId().then((deviceId) => {
        let headers = this.prepareNoAuthHeaders();
        headers = { ...headers, 'Device-ID': deviceId };
        resolve(headers);
      });
    });
  };

  static getUserToken = () => {
    /*
    if (UtilsService.getFromLocalStorage('ym@user')) {
      let user = JSON.parse(UtilsService.getFromLocalStorage('ym@user'));
      return user.access_token;
    }
    */
    return new Promise((resolve, reject) => {
      UtilsService.getFromLocalStorage('ym@user').then((user) => {
        if (Object.keys(user).length !== 0) {
          const userObj = JSON.parse(user['ym@user']);
          resolve(userObj.access_token);
        } else {
          reject();
        }
      });
    });
  };

  static getDeviceId = () => {
    /* let localUuid = UtilsService.getFromLocalStorage('y@uuid');
    if (localUuid) {
      return localUuid;
    } */

    return new Promise((resolve, reject) => {
      UtilsService.getFromLocalStorage('y@uuid').then((uuid) => {
        if (Object.keys(uuid).length !== 0) {
          resolve(uuid['y@uuid']);
        } else {
          let uuid = this.generateUUID();
          // UtilsService.saveToLocalStorage('y@uuid', uuid);
          UtilsService.saveToLocalStorage('y@uuid', uuid).then(
            (generatedUuid) => {
              resolve(generatedUuid);
            }
          );
        }
      });
    });

    //return this.generateUUID();
  };

  static generateUUID = () => {
    const s = [];
    const hexDigits = '0123456789abcdef';
    for (let i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
    // tslint:disable-next-line:no-bitwise
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = '-';

    return s.join('');
  };
}

export default HttpHeadersService;
