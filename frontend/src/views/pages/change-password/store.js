import {
  CHANGE_PASSWORD_FAIL, CHANGE_PASSWORD_SUCCESS
} from './constant';

export default function storeCases(state = {}, action) {
 
  switch (action.type) {
    case CHANGE_PASSWORD_SUCCESS:
      return { ...state, success_msg: action.data.message, error_msg: null }
    case CHANGE_PASSWORD_FAIL:
      return { ...state, error_msg: action.data.message, success_msg: null }
    default:
      return state
  }
}

