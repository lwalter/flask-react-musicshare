import * as types from '../constants/ActionTypes.jsx';

export function errors(state = '', action) {
  switch (action.type) {
    case types.ADD_ERROR:
      return action.errorMsg;
    
    case types.REMOVE_ERROR:
      return '';
    
    default:
      return state;
  }
}