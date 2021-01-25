import {
  REMOVE_PROFILE_FAIL, REMOVE_PROFILE_SUCCESS
} from './constant';

export default function storeCases(state = {}, action) {
 
  switch (action.type) {
    case REMOVE_PROFILE_SUCCESS:
      return { ...state, success_msg: action.data.message, error_msg: null }
    case REMOVE_PROFILE_FAIL:
      return { ...state, error_msg: action.data.message, success_msg: null }
    default:
      return state
  }
}

