import { GET_MY_PRODUCT_START , REMOVE_PRODUCT_START} from './constant';



export const getProducts = (data) => ({
  type: GET_MY_PRODUCT_START,
  payload: data
})

export const removeProduct = (pid) => ({
  type: REMOVE_PRODUCT_START,
  payload: pid
})