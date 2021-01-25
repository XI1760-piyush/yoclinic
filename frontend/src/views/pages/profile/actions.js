import { UPDATE_PROFILE_START, GET_PROFILE_START, UPDATE_IMAGE_START } from './constant';



export const update_profile = (data) => ({
  type: UPDATE_PROFILE_START,
  payload: data
})


export const get_profile = (data) => ({
  type: GET_PROFILE_START,
  payload: data
})


export const update_image = (data) => ({
  type: UPDATE_IMAGE_START,
  payload: data
})
