import { MAKE_DRAFT_START, SAVE_PHOTO_START, SAVE_PRODUCT_START, REMOVE_PHOTO_START } from './constant';



export const makeDraft = (data) => ({
  type: MAKE_DRAFT_START,
  payload: data
})

export const savePhoto = (data) => ({
  type: SAVE_PHOTO_START,
  payload: data
})

export const saveProduct = (data) => ({
  type: SAVE_PRODUCT_START,
  payload: data
})

export const removePhoto = (data) => ({
  type: REMOVE_PHOTO_START,
  payload: data
})