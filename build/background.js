import { fetchRepositories, saveToLocalStorage } from './lib/helpers';

// create alarm for watchdog and fresh on installed/updated, and start fetch data
chrome.runtime.onInstalled.addListener(() => {
  scheduleRequest();
  scheduleWatchdog();
  startRequest();
});

// fetch and save data when chrome restarted, alarm will continue running when chrome is restarted
chrome.runtime.onStartup.addListener(() => {
  startRequest();
});

// alarm listener
chrome.alarms.onAlarm.addListener((alarm) => {
  // if watchdog is triggered, check whether refresh alarm is there
  if (alarm && alarm.name === 'watchdog') {
    chrome.alarms.get('refresh', (alarm) => {
      if (!alarm) {
        // if it is not there, start a new request and reschedule refresh alarm
        startRequest();
        scheduleRequest();
      }
    });
  } else {
    // if refresh alarm triggered, start a new request
    startRequest();
  }
});

// schedule a new fetch every 30 minutes
function scheduleRequest() {
  chrome.alarms.create('refresh', { periodInMinutes: 3 });
}

// schedule a watchdog check every 5 minutes
function scheduleWatchdog() {
  chrome.alarms.create('watchdog', { periodInMinutes: 5 });
}

// fetch data and save to local storage
async function startRequest() {
  const data = await fetchRepositories();
  saveToLocalStorage(data);
}
