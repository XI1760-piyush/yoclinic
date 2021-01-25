import { GET_PRODUCTS_START } from './constant';



export const getProducts = (data) => ({
  type: GET_PRODUCTS_START,
  payload: data
})

