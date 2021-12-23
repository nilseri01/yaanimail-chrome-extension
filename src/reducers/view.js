import { SET_VIEW } from '../actions/view';

export default function view(state = 'inbox', action) {
  switch (action.type) {
    case SET_VIEW:
      return action.view;
    default:
      return state;
  }
}
