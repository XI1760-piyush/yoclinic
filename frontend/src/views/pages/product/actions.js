import { GET_PRODUCT_START, ADD_FAV_PRODUCT_START, REMOVE_FAV_PRODUCT_START } from './constant';



export const getProduct = (pid) => ({
  type: GET_PRODUCT_START,
  payload: pid
})

export const addFav = (pid) => ({
  type: ADD_FAV_PRODUCT_START,
  payload: pid
})

export const removeFav = (pid) => ({
  type: REMOVE_FAV_PRODUCT_START,
  payload: pid
})

