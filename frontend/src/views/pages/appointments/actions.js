import { GET_FAV_PRODUCT_START } from './constant';



export const getFavProducts = (data) => ({
  type: GET_FAV_PRODUCT_START,
  payload: data
})
