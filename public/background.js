chrome.runtime.onInstalled.addListener(() => {
  scheduleRequest();
  startRequest();
});

chrome.runtime.onStartup.addListener(() => {
  startRequest();
});

chrome.alarms.onAlarm.addListener((alarm) => {
  startRequest();
});

scheduleRequest = () => {
  chrome.alarms.create('refresh', { periodInMinutes: 1 });
};

startRequest = () => {
  getAuthHeaders()
    .then((headers) => {
      if (Object.keys(headers).length !== 0) {
        fetch('https://ymapi.turkcell.com.tr/gateway/v1/emails/folders/all', {
          method: 'GET',
          headers: headers
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            let inbox = data.filter((f) => f.id == 2);
            chrome.action.setBadgeText({ text: '' });
            if (inbox && inbox.length > 0 && inbox[0].unread !== 0) {
              chrome.action.setBadgeText({ text: `${inbox[0].unread}` });
            }
          })
          .catch((error) => {
            chrome.action.setBadgeText({ text: '' });
            console.log(error);
            // TODO: NilS error objesi?
            console.log(error.error.message);
          });
      }
    })
    .catch((error) => {
      chrome.action.setBadgeText({ text: '' });
      console.log(error);
    });
};

getAuthHeaders = () => {
  return Promise.all([getUserToken(), getDeviceId()])
    .then((values) => {
      if (values.length == 2) {
        // TODO: NilS
        let headers = {
          Authorization: 'Bearer ' + values[0],
          'App-Version': '1.0',
          'Device-Language': 'en-US',
          'Device-Name': 'WEB',
          'Device-ID': values[1]
        };
        return headers;
      } else {
        return {};
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

getUserToken = () => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get('ym@user', (user) => {
      if (Object.keys(user).length !== 0) {
        const userObj = JSON.parse(user['ym@user']);
        if (userObj) {
          resolve(userObj.access_token);
        }
        // TODO: NilS else
      } else {
        reject();
      }
    });
  });
};

getDeviceId = () => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get('y@uuid', (uuid) => {
      if (Object.keys(uuid).length !== 0) {
        resolve(uuid['y@uuid']);
      } else {
        reject();
      }
    });
  });
};
