class UtilsService {
  /*
  static saveToLocalStorage(key, value) {
    localStorage.setItem(key, value);
  }

  static getFromLocalStorage(key) {
    return localStorage.getItem(key);
  }

  static removeFromLocalStorage(key) {
    localStorage.removeItem(key);
  }
  */

  static saveToLocalStorage = (key, value) => {
    return new Promise((resolve, reject) => {
      var obj = {};
      obj[key] = value;
      chrome.storage.sync.set(obj, () => {
        resolve(value);
      });
    });
  };

  static getFromLocalStorage = (key) => {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(key, (data) => {
        if (data) {
          resolve(data);
        } else {
          reject();
        }
      });
    });
  };

  static getGatewayApiUrl = () => {
    return process.env.REACT_APP_GATEWAY_API_URL;
  };
}

export default UtilsService;
