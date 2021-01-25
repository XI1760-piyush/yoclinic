import {
  GET_MEDICAL_FAIL, GET_MEDICAL_SUCCESS,
  UPDATE_MEDICAL_SUCCESS, UPDATE_MEDICAL_FAIL
} from './constant';


export default function storeCases(state = {}, action) {

  switch (action.type) {
    case GET_MEDICAL_FAIL:
      return { ...state, error_msg: action.data.message, }
    case GET_MEDICAL_SUCCESS:
      return { ...state, error_msg: null, medical_data: action.data.data }
    case UPDATE_MEDICAL_SUCCESS:
      return { ...state, error_msg: null, success_msg: action.data.message, medical_data: action.data.data }
    case UPDATE_MEDICAL_FAIL:
      return { ...state, error_msg: action.data.message, }
    default:
      return state
  }
}

