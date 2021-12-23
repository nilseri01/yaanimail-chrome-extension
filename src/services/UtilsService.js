class UtilsService {
  static saveMultipleToLocalStorage = (data) => {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.set(data, () => {
        resolve(data);
      });
    });
  };

  static saveToLocalStorage = (key, value) => {
    return new Promise((resolve, reject) => {
      var obj = {};
      obj[key] = value;
      chrome.storage.sync.set(obj, () => {
        resolve(value);
      });
    });
  };

  static getMultipleFromLocalStorage = (keys) => {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(keys, (data) => {
        if (data) {
          resolve(data);
        } else {
          reject();
        }
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
