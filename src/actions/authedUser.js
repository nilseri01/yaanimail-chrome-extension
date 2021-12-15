export const SET_AUTHED_USER = 'SET_AUTHED_USER';
export const LOGOUT = 'LOGOUT';

export function setAuthedUser(authedUser) {
  return {
    type: SET_AUTHED_USER,
    authedUser: authedUser
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}
