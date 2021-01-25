import {
  GET_PROFILE_FAIL, GET_PROFILE_SUCCESS,
  UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL,
  UPDATE_IMAGE_SUCCESS, UPDATE_IMAGE_FAIL
} from './constant';


export default function storeCases(state = {}, action) {

  switch (action.type) {
    case GET_PROFILE_FAIL:
      return { ...state, error_msg: action.data.message, }
    case GET_PROFILE_SUCCESS:
      return { ...state, error_msg: null, user_data: action.data.data }
    case UPDATE_PROFILE_SUCCESS:
      return { ...state, error_msg: null, success_msg: action.data.message, user_data: action.data.data }
    case UPDATE_PROFILE_FAIL:
      return { ...state, error_msg: action.data.message, }
    case UPDATE_IMAGE_SUCCESS:
      console.log(action.data.data.url)
      return { ...state, error_msg: null, success_msg: action.data.message, profilePic: action.data.data.url }
    case UPDATE_IMAGE_FAIL:
      return { ...state, error_msg: action.data.message, }
    default:
      return state
  }
}

