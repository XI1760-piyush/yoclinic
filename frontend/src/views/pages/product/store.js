import {
  GET_PRODUCT_FAILURE, GET_PRODUCT_SUCCESS,
  ADD_FAV_PRODUCT_SUCCESS, ADD_FAV_PRODUCT_FAIL,
  REMOVE_FAV_PRODUCT_SUCCESS, REMOVE_FAV_PRODUCT_FAIL
} from './constant';

export default function storeCases(state = {}, action) {
  switch (action.type) {
    case GET_PRODUCT_SUCCESS:
      return { ...state, success_msg: null, error_msg: null, product: action.data.data.product, user: action.data.data.user , reload:false, related: action.data.data.related }
    case GET_PRODUCT_FAILURE:
      return { ...state, error_msg: action.data.message, success_msg: null }
    case ADD_FAV_PRODUCT_SUCCESS:
      return { ...state, success_msg: null, error_msg: null, reload:true }
    case ADD_FAV_PRODUCT_FAIL:
        return { ...state, error_msg: action.data.message, success_msg: null }
    case REMOVE_FAV_PRODUCT_SUCCESS:
      return { ...state, success_msg: null, error_msg: null, reload:true }
    case REMOVE_FAV_PRODUCT_FAIL:
        return { ...state, error_msg: action.data.message, success_msg: null }
  
    default:
      return state
  }
}

