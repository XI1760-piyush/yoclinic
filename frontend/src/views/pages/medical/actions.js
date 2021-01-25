import { UPDATE_MEDICAL_START, GET_MEDICAL_START } from './constant';



export const update_medical = (data) => ({
  type: UPDATE_MEDICAL_START,
  payload: data
})


export const get_medical = (data) => ({
  type: GET_MEDICAL_START,
  payload: data
})

