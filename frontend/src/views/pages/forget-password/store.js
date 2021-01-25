import {
  RECOVER_EMAIL_FAIL, RECOVER_EMAIL_SUCCESS,
  RECOVER_OTP_SUCCESS, RECOVER_OTP_FAIL,
  RECOVER_PASSWORD_SUCCESS, RECOVER_PASSWORD_FAIL
} from './constant';


export default function storeCases(state = {}, action) {

  switch (action.type) {
    case RECOVER_EMAIL_SUCCESS:
      return { ...state, error_msg: null, success_msg: action.data.message, showOtp: true }
    case RECOVER_EMAIL_FAIL:
      return { ...state, error_msg: action.data.message, success_msg: null }
    case RECOVER_OTP_SUCCESS:
      return { ...state, error_msg: null, success_msg: action.data.message, showPassword: true }
    case RECOVER_OTP_FAIL:
      return { ...state, error_msg: action.data.message, success_msg: null }
    case RECOVER_PASSWORD_SUCCESS:
      return { ...state, error_msg: null, success_msg: action.data.message, moveLogin: true }
    case RECOVER_PASSWORD_FAIL:
      return { ...state, error_msg: action.data.message, success_msg: null }

    default:
      return state
  }
}

