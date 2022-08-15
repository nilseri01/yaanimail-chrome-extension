export const SET_SHOW_SUCCESS = 'SET_SHOW_SUCCESS';
export const SET_SHOW_ERROR = 'SET_SHOW_ERROR';

export function showSuccessToast(message) {
  return {
    type: SET_SHOW_SUCCESS,
    message: message
  };
}

export function showErrorToast(message) {
  return {
    type: SET_SHOW_ERROR,
    message: message
  };
}
