import {
  GET_FAV_PRODUCT_FAILURE, GET_FAV_PRODUCT_SUCCESS
} from './constant';

export default function storeCases(state = {}, action) {
  switch (action.type) {
    case GET_FAV_PRODUCT_SUCCESS:
      return { ...state, success_msg: null, error_msg: null, products: action.data.data }
    case GET_FAV_PRODUCT_FAILURE:
      return { ...state, error_msg: action.data.message, success_msg: null }
    default:
      return state
  }
}

