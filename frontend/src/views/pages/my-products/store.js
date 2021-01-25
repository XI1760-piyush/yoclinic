import {
  GET_MY_PRODUCT_FAILURE, GET_MY_PRODUCT_SUCCESS,
  REMOVE_PRODUCT_FAILURE, REMOVE_PRODUCT_SUCCESS
} from './constant';

export default function storeCases(state = {}, action) {
  switch (action.type) {
    case GET_MY_PRODUCT_SUCCESS:
      return { ...state, success_msg: null, error_msg: null, products: action.data.data }
    case GET_MY_PRODUCT_FAILURE:
      return { ...state, error_msg: action.data.message, success_msg: null }
    case REMOVE_PRODUCT_SUCCESS:
      return { ...state, success_msg: action.data.message, products: action.data.data }
    case REMOVE_PRODUCT_FAILURE:
      return { ...state, error_msg: action.data.message, success_msg: null }
    default:
      return state
  }
}

