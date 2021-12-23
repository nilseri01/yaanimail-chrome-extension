import { API_CONFIG } from '../config/AxiosConfig';
import HttpHeadersService from './HttpHeadersService';

class CalendarService {
  static getEvents = (data) => {
    let url = `/calendars/appointment/${data.calendarId}/list`;
    if (data.startTime && data.endTime) {
      url = url + '?start_time=' + data.startTime + '&end_time=' + data.endTime;
    }
    return new Promise((resolve, reject) => {
      HttpHeadersService.getAuthHeaders()
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

export default CalendarService;
