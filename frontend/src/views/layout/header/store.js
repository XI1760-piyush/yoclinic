
import {
  REG_SUCCESS, REG_FAIL, LOGIN_SUCCESS, LOGIN_FAIL
} from './constant';

export default function storeCases(state = {}, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, login_msg: 'success', user_data: action.data, login_error_msg: null }
    case LOGIN_FAIL:
      return { ...state, login_msg: 'fail', login_error_msg: action.data.message }
    case REG_SUCCESS:
      return { ...state, register_msg: 'success', user_data: action.data, reg_error_msg: null }
    case REG_FAIL:
      return { ...state, register_msg: 'fail', reg_error_msg: action.data.message }
    default:
      return state
  }
}

