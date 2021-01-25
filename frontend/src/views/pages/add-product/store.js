import {
  MAKE_DRAFT_SUCCESS, MAKE_DRAFT_FAILURE, SAVE_PHOTO_FAILURE, SAVE_PHOTO_SUCCESS, REMOVE_PHOTO_SUCCESS, REMOVE_PHOTO_FAILURE,
  SAVE_PRODUCT_SUCCESS, SAVE_PRODUCT_FAILURE
} from './constant';

export default function storeCases(state = {}, action) {
  switch (action.type) {
    case MAKE_DRAFT_SUCCESS:
      return { ...state, success_msg: action.data.message, did: action.data.data.did }
    case MAKE_DRAFT_FAILURE:
      return { ...state, error_msg: action.data.message, success_msg: null }
    case SAVE_PHOTO_SUCCESS:
      return { ...state, success_msg: action.data.message, imageArr: action.data.data }
    case SAVE_PHOTO_FAILURE:
      return { ...state, error_msg: action.data.message, success_msg: null }
    case REMOVE_PHOTO_SUCCESS:
      return { ...state, success_msg: action.data.message, imageArr: action.data.data }
    case REMOVE_PHOTO_FAILURE:
      return { ...state, error_msg: action.data.message, success_msg: null }
    case SAVE_PRODUCT_SUCCESS:
      return { ...state, success_msg: action.data.message, error_msg: null  }
    case SAVE_PRODUCT_FAILURE:
       return { ...state, error_msg: action.data.message, success_msg: null }
    default:
      return state
  }
}

